# SABA-COMPUTER
`Simple web application of E-Commerce(product Laptop). This app has :`
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
---
# RESTful endpoints
## Global Responses
_Response (500 - Unknown error)_

> This endpoint should always return response below,
```
{ "message": "Internal Server Error" }
```
---
## POST /register
> Create a new user account

_Request Header_
```
  no need
```
_Request Body_
```
{ 
  email: <email input>,
  password: <password input>
}
```
_Response (201)_
```
{
    "id": 3,
    "email": "customer@gmail.com",
    "password": "$2b$10$qNG.WPGwg5B3csMMAmhkJuHIFp0YsCB3YyZtK3Jr2MFSKULkdya4m",
    "role": "customer",
    "updatedAt": "2020-06-27T09:45:14.756Z",
    "createdAt": "2020-06-27T09:45:14.756Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": "email already exist, email cannot be empty, password cannot be empty"
}
```
---
## POST /login
> Login for User exist

_Request Header_
```
  no need
```
_Request Body_
```
{ 
  email: email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{
    "id": 1,
    "email": "admin@gmail.com",
    "role": "admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTMyMjk0MDB9.2M6BRlnM58RKB6yFoJOsmF_3ytOEp9jZB6ZTxmcE6EQ"
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "email/username not found, Invalid, check email or password"
}
```
---
## GET /customer-products
> Show All Product

_Request Header_
```
no need
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
    {
        "id": 8,
        "name": "Baju",
        "image_url": "https://i.imgur.com/FC2SJnI.jpg",
        "price": 10000,
        "stock": 5,
        "category": "",
        "createdAt": "2020-06-27T05:53:37.004Z",
        "updatedAt": "2020-06-27T05:53:37.004Z"
    },
    ...
]
```
---
## GET /customer-products/:id
> Get data product from selected id

_Request Header_
```
no need
```
_Request Params_
```
id: <id product>
```
_Response (200)_
```
{
  "id": 6,
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## GET /products
> Show All Product

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
    {
        "id": 8,
        "name": "Baju",
        "image_url": "https://i.imgur.com/FC2SJnI.jpg",
        "price": 10000,
        "stock": 5,
        "category": "",
        "createdAt": "2020-06-27T05:53:37.004Z",
        "updatedAt": "2020-06-27T05:53:37.004Z"
    },
    ...
]
```
---
## GET /products/:id
> Get data product from selected id

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Response (200)_
```
{
  "id": 6,
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## POST /products
> Create Product

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
{
    "name": <input name>,
    "image_url": <input image_url>,
    "price": <input price>
    "stock": <input stock>
}
```
_Response (201)_
```
{
  "id": 6,
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## DELETE /products/:id
> Delete product
---

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Response (200)_
```
{
  message: "id 6 has been deleted"
}

```
_Response (400 - Bad request)_
```
{
  "message": "you're not authorize"
}

```
---
## PUT /products/:id
> To submit Form Edit product


_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id product>
```
_Request Body_
```
{
    "name": <input name>,
    "image_url": <input image_url>,
    "price": <input price>
    "stock": <input stock>
}
```
_Response (200)_
```
{
  "name": <input name>,
  "image_url": <input image_url>,
  "price": <input price>
  "stock": <input stock>
}

```
_Response (400 - Bad request)_
```
  {
    "message": "you're not authorize"
  }

```
---
## POST /orders
> To create data order from current user login

_Request Header_
```
{
  "access_token": <token>
}
```
_Request Params_
```
no need
```
_Request Body_
```
{
    "qty": <input qty>,
    "total": <input total>,
    "ProductId": <input ProductId>,
    
}
```
_Response (201)_
```
{   
    "id": <created id>,
    "qty": <input qty>,
    "total": <input total>,
    "status": <created status>,
    "ProductId": <input ProductId>,
    "UserId": <current User>,    
}

```
---
## DELETE /orders/:id
> To delete order from selected id

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
id: <id order>
```
_Request Body_
```
no need
```
_Response (200)_
```
{
  message: "order has been deleted"
}

```
---
## GET /orders/:status
> Get data orders from selected status and current user login

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
status: <status product>
```
_Response (200)_
```
[
  {
    "id": 1,
    "qty": 2,
    "total": 10000000,
    "checkout_date": "2020-07-02T04:16:06.870Z",
    "status": "paid",
    "ProductId": 1,
    "UserId": 1,
    "createdAt": "2020-07-02T04:15:53.752Z",
    "updatedAt": "2020-07-02T04:16:06.870Z",
    "User": {
        "id": 1,
        "email": "amiruljbr@gmail.com",
    },
    "Product": {
        "id": 1,
        "name": "Asus Zenbook UX410U Rose Golda",
        "image_url": "https://eksekutifcomputer.com/wp-content/uploads/2019/01/Laptop-Asus-Zenbook-UX410U-Rose-Golda.jpg",
        "price": 5000000,
        "stock": 98,
        "category": "Laptop",
        "createdAt": "2020-07-02T04:08:31.526Z",
        "updatedAt": "2020-07-02T04:16:06.870Z"
    }
  },
  ...
]

```
---
## PUT /orders/check-out
> To change status orders from 'order' to 'paid' on selected orders data

_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
no need
```
_Response (200)_
```
{
  message: 'orders has been updated to paid'
}
```
_Response (403)_
```
{
  message: 'Stock not Valid'
}
```
