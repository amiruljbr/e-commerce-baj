const { User, Order, Product } = require('../models');

class OrderController {
  static create(req,res,next){
    let newOrder = {
      qty: parseInt(req.body.qty),
      total: req.body.total,
      status: 'order',
      ProductId: req.body.ProductId,
      UserId: req.userData.id,
    }

    Order.findOne({
      where: {
        ProductId: newOrder.ProductId,
        status: 'order',
        UserId: req.userData.id
      }, include: [
        Product
      ]
    })
    .then(data=>{
      if(!data) {
        return Order.create(newOrder);
      } else {
        newOrder.qty = newOrder.qty + data.dataValues.qty;
        newOrder.total = newOrder.total + data.dataValues.total;
        if (newOrder.qty > data.dataValues.Product.stock){
          newOrder.qty = data.dataValues.Product.stock;
        }
        return Order.update({
          qty: newOrder.qty,
          total: newOrder.total
        }, {
          where : {
          id: data.dataValues.id
          }
        })
      }
    })
      .then(data4=>{
        res.status(201).json(newOrder);
      })
      .catch(err=>{
        res.status(500).json(err);
        console.log(err);
      })
  }

  static delete(req,res,next){
    Order.destroy({
      where: {
        id: req.params.id,
        status: 'order'
      }
    })
      .then(data=>{
        res.status(200).json({ message:'order has been deleted' })
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static getOrderUser(req,res,next) {
    Order.findAll({
      where: {
        UserId: req.userData.id,
        status: req.params.status
      }, include: [
        User, Product
      ], order: [['checkout_date', 'DESC']]
    })
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        console.log(err);
        next(err);
      })
  }

  static payOrder(req,res,next){
    Order.findAll({
      where: {
        UserId: req.userData.id,
        status: 'order'
      }, include: [
        User, Product
      ]
    })
      .then(data=>{
        for (let i=0; i<data.length; i++){
          let currentProductStock = data[i].dataValues.Product.stock - data[i].dataValues.qty;
          if(currentProductStock<0) {
            return res.status(403).json({message: 'Stock not Valid'})
          }
        }
        for (let i=0; i<data.length; i++){
          let currentProductStock = data[i].dataValues.Product.stock - data[i].dataValues.qty;
          let currentproductId = data[i].ProductId;
          Product.update({
            stock: currentProductStock
          }, {
            where: {
              id:currentproductId
            }
          })
        }
        return Order.update({status:'paid', checkout_date: new Date()},
        {
          where: {
            status: 'order',
            UserId: req.userData.id
          }
        })
      })
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        console.log(err);
        next(err);
      })
  }

}

module.exports = OrderController;