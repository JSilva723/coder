## Uso de la API

 - **Productos**
    - [Listar los productos](#listar-los-productos)
    - [Agregar un nuevo Producto](#agregar-un-nuevo-producto)
    - [Modificar un Producto](#modificar-un-producto)
    - [Borrar un Producto](#borrar-un-producto)
 - **Carros**
    - [Crear un nuevo Carro](#crear-un-nuevo-carro)
    - [Listar los productos de un Carro](#listar-los-productos-de-un-carro)
    - [Agregar productos a un carro](#agregar-productos-a-un-carro)
    - [Eliminar el producto del carro](#eliminar-el-producto-del-carro)
    - [Actulizar los productos del carro](#actulizar-los-productos-del-carro)
    - [Actulizar cantidad de un producto](#actulizar-cantidad-de-un-producto)
    - [Eliminar todos los productos del carro](#eliminar-todos-los-productos-del-carro)
***
### Listar los productos
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Casos                   | Metodo | URL                                     |
|-------------------------|--------|-----------------------------------------|
| Pasando el parametro id | GET    | http://localhost:8080/api/products/:pid |
| Todos los items         | GET    | http://localhost:8080/api/products      |

| Paramas  | default  | value      | description                                                   |
|----------|----------|------------| ------------------------------------------------------------- |
| limit    | 10       |            | It will allow to return only the number of elements requested |
| page     | 1        | Number > 0 | Will allow us to return the page we want to search for        |
| category |          |            | Search products by category                                   |
| stock    |          |            | Search products by stock                                      |
| sort     |          | asc/desc   | Sort ascending or descending by price                         |

<pre>GET   http://localhost:8080/api/products</pre>

HTTP/1.1 200 OK
```json
{
    "status": "success",
    "payload": [ ...products ],
    "totalPages": 10,
    "prevPage": null,
    "nextPage": 2,
    "page": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevLink": "",
    "nextLink": "http://localhost:8080/?page=2"
}
```
HTTP/1.1 200 OK Page not valid
```json
{
    "status": "error",
    "payload": [],
    "totalPages": 10,
    "prevPage": null,
    "nextPage": null,
    "page": 12345,
    "hasPrevPage": null,
    "hasNextPage": null,
    "prevLink": "",
    "nextLink": ""
}
```
***
### Agregar un nuevo Producto
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                |
|--------|------------------------------------|
| POST   | http://localhost:8080/api/products |

| Fields      | Requerido | default | Tipo            |
|-------------|-----------|---------|-----------------|
| title       | SI        |         | String          |
| description | SI        |         | String          |
| code        | SI        |         | String          |
| price       | SI        |         | Number          |
| status      | NO        | true    | Boolean         |
| stock       | SI        |         | Number          |
| category    | SI        |         | String          |
| thumbnails  | NO        |         | Array de String |

<pre>POST   http://localhost:8080/api/products</pre>

```json
{
    "title": "Product 1", 
    "description": "Descripcion, producto 1", 
    "code": "code1", 
    "price":100, 
    "stock":100, 
    "category": "category1"
}
```
HTTP/1.1 200 OK
```json
{
    "product": {
        "_id": "64d09904aa689c98b8d0586j",
        "__v": 0,
        "title": "Product 1",
        "description": "Descripcion, producto 1",
        "code": "code1",
        "price": 100,
        "status": true,
        "stock": 100,
        "category": "category1",
        "thumbnails": []
    }
}
```
HTTP/1.1 400 Bad Request
```json
{
   "error": [
        "There's a product with code: code1"
   ]
}
```
HTTP/1.1 400 Bad Request
```json
{
   "error": [
        "The title is required"
   ]
}
```
***
### Modificar un Producto
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                     |
|--------|-----------------------------------------|
| PUT    | http://localhost:8080/api/products/:pid |

<pre>PUT   http://localhost:8080/api/products/64d09904aa689c98b8d0586j</pre>

```json
{
    "thumbnails": ["Sin imagen"]
}
```
HTTP/1.1 200 OK
```json
{
    "product": {
        "_id": "64d09904aa689c98b8d0586j",
        "title": "Product 1",
        "description": "Descripcion, producto 1",
        "code": "code1",
        "price": 100,
        "status": true,
        "stock": 100,
        "category": "category1",
        "thumbnails": [
            "Sin imagen"
        ],
        "__v": 0
    }
}
```
HTTP/1.1 400 Bad Request
```json
{
    "error":  [
        "The id cannot be modified"
    ]
}
```
***
### Borrar un Producto
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                     |
|--------|-----------------------------------------|
| DELETE | http://localhost:8080/api/products/:pid |

<pre>DELETE   http://localhost:8080/api/products/64d09904aa689c98b8d0586j</pre>

HTTP/1.1 204 No Content
```json
```
HTTP/1.1 404 Not Found
```json
{
    "error": [
        "Product Not found"
    ]
}
```
***
### Crear un nuevo Carro
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                             |
|--------|---------------------------------|
| POST   | http://localhost:8080/api/carts |

<pre>POST   http://localhost:8080/api/carts</pre>

HTTP/1.1 200 OK
```json
{
    "cid": "64dbfd81389185a790b1c916",
}
```
***
### Listar los productos de un Carro
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                  | 
|--------|--------------------------------------|
| GET    | http://localhost:8080/api/carts/:cid |

<pre>GET   http://localhost:8080/api/carts/64dbfd81389185a790b1c916</pre>

HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [
        {
            "product": {
                "_id": "64d9a9d24180305855e8b3aa",
                "title": "producto 1",
                "description": "Descripcion, producto 1",
                "code": "producto1",
                "price": 406,
                "status": true,
                "stock": 53,
                "category": "category0",
                "thumbnails": [],
                "__v": 0
            },
            "quantity": 2,
            "_id": "64dbfd81389185a790b1c91a"
        }
    ],
    "__v": 2
}
```
HTTP/1.1 404 Not Found
```json
{
    "error": [
        "Cart Not found"
    ]
}
```
***
### Agregar productos a un Carro 
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                               |
|--------|---------------------------------------------------|
| GET    | http://localhost:8080/api/carts/:cid/product/:pid |

<pre>GET   http://localhost:8080/api/carts/64dbfd81389185a790b1c916/product/64d9a9d24180305855e8b3aa</pre>

HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [
        {
            "product": "64d9a9d24180305855e8b3aa",
            "quantity": 3,
            "_id": "64dbfd81389185a790b1c91a"
        }
    ],
    "__v": 3
}
```
Agregar el mismo producto
<pre>GET   http://localhost:8080/api/carts/64dbfd81389185a790b1c916/product/64d9a9d24180305855e8b3aa</pre>

HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [
        {
            "product": "64d9a9d24180305855e8b3aa",
            "quantity": 3,
            "_id": "64dbfd81389185a790b1c91a"
        }
    ],
    "__v": 4
}
```
HTTP/1.1 404 Not Found
```json
{
    "error": [
        "Cart Not found"
    ]
}
```
HTTP/1.1 404 Not Found
```json
{
    "error": [
        "Product Not found"
    ]
}
```
***
### Eliminar el producto del carro 
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                                |
|--------|----------------------------------------------------|
| DELETE | http://localhost:8080/api/carts/:cid/products/:pid |

<pre>DELETE   http://localhost:8080/api/carts/64dbfd81389185a790b1c916/products/64d9a9d24180305855e8b3aa</pre>

HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [],
    "__v": 4
}
```
***
### Actulizar los productos del carro
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                  |
|--------|--------------------------------------|
| PUT    | http://localhost:8080/api/carts/:cid |

<pre>PUT   http://localhost:8080/api/carts/64dbfd81389185a790b1c916</pre>

```json
{
    "products": [
        {
            "product": "64d9a9d24180305855e8b3aa",
            "quantity": 20
        },
        {
            "product": "64d9a9d24180305855e8b3ab",
            "quantity": 15
        }
    ]
}
```
HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [
        {
            "product": "64d9a9d24180305855e8b3aa",
            "quantity": 20,
            "_id": "64dc007d389185a790b1c92d"
        },
        {
            "product": "64d9a9d24180305855e8b3ab",
            "quantity": 15,
            "_id": "64dc007d389185a790b1c92e"
        }
    ],
    "__v": 5
}
```
***
### Actulizar cantidad de un producto 
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                  |
|--------|--------------------------------------|
| PUT    | http://localhost:8080/api/carts/:cid/products/:pid |

<pre>PUT   http://localhost:8080/api/carts/64dbfd81389185a790b1c916/products/64d9a9d24180305855e8b3aa</pre>

```json
{
    "quantity": 7
}
```
HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [
        {
            "product": "64d9a9d24180305855e8b3aa",
            "quantity": 7,
            "_id": "64dc007d389185a790b1c92d"
        },
        {
            "product": "64d9a9d24180305855e8b3ab",
            "quantity": 15,
            "_id": "64dc007d389185a790b1c92e"
        }
    ],
    "__v": 6
}
```
### Eliminar todos los productos del carro 
<p align="right" >
  <a href="#uso-de-la-api">Indice</a>
</p>

| Metodo | URL                                  |
|--------|--------------------------------------|
| DELETE | http://localhost:8080/api/carts/:cid |

<pre>DELETE   http://localhost:8080/api/carts/64dbfd81389185a790b1c916</pre>

HTTP/1.1 200 OK
```json
{
    "_id": "64dbfd81389185a790b1c916",
    "products": [],
    "__v": 8
}
```
