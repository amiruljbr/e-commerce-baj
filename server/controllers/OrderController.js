const { User, Order, Product } = require('../models');

class OrderController {
  static create(req,res,next){
    let newOrder = {
      qty: req.body.qty,
      status: 'order',
      ProductId: req.body.ProductId,
      UserId: req.userData.id,
    }

    Order.create(newOrder)
      .then(data=>{
        res.status(201).json(data);
      })
      .catch(err=>{
        res.status(200).json(err);
      })
  }

  static delete(req,res,next){
    Order.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data=>{
        req.status(200).json({ message:'data report has been deleted' })
      })
      .catch(err=>{
        req.status(500).json(err)
      })
  }

}

module.exports = OrderController;