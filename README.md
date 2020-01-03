Food Truck Tracker - Backend
https://lambda-food-truck.herokuapp.com/

Section Contents:

- [/api/auth/login POST](#apiauthlogin-post)
- [/api/auth/register POST](#apiauthregister-post)
- [/api/users/user GET](#apiusersuser-get)
- [/api/trucks GET](#apitrucks-get)
- [/api/trucks/:id GET](#apitrucksid-get)
- [/api/trucks POST](#apitrucks-post)
- [/api/trucks/:id PUT](#apitrucksid-put)
- [/api/trucks/:id DELETE](#apitrucksid-delete)
- [/api/trucks/:id/favorite POST](#apitrucksidfavorite-post)
- [/api/trucks/:id/favorite DELETE](#apitrucksidfavorite-delete)
- [/api/trucks/:id/menu POST](#apitrucksidmenu-post)
- [/api/trucks/:id/menu/:itemid DELETE](#apitrucksidmenuitemid-delete)
- [/api/trucks/:id/review POST](#apitrucksidreview-post)
- [/api/trucks/:id/review/:reviewid DELETE](#apitrucksidreview-delete)

### /api/auth/login POST

Expects an object with this format as the request body:

```
{
  "username": "user1",   //string (required)
  "password": "password", //string (required)
}
```

### /api/auth/register POST

Expects an object with this format as the request body:

```
{
  "username": "user1",   //string (required)
  "password": "password", //string (required)
  "role": 1, //integer 1=truck operator 2=diner (required)
  "latitude: 3.7, //float
  "longitude": 40.2 //float
}
```

All endpoints below this point require an `Authorization` header with a JWT.

### /api/users/user GET

Returns the information for the current logged in user. It will return an array of owned trucks (if truck operator) or an array of favorited trucks (if diner).

```
{
    "username": "diner1",
    "role": 2,
    "latitude": null,
    "longitude": null,
    "id": 3,
    "trucks": [
        {
            "id": 1,
            "operator_id": 1,
            "name": null,
            "imageUrl": null,
            "cuisine": "italian",
            "current_latitude": 35,
            "current_longitude": 40,
            "next_latitude": null,
            "next_longitude": null,
            "arrival_time": null,
            "departure_time": null
        }
    ]
}
```

### /api/trucks GET

Returns an array of all registered trucks and their basic information (not including menu or reviews).

```
[
    {
        "id": 1,
        "operator_id": 1,
        "name": null,
        "imageUrl": null,
        "cuisine": "italian",
        "current_latitude": 35,
        "current_longitude": 40,
        "next_latitude": null,
        "next_longitude": null,
        "arrival_time": null,
        "departure_time": null
    },
    {
        "id": 2,
        "operator_id": 1,
        "name": null,
        "imageUrl": null,
        "cuisine": "chinese",
        "current_latitude": 20,
        "current_longitude": 45,
        "next_latitude": null,
        "next_longitude": null,
        "arrival_time": null,
        "departure_time": null
    },
    {
        "id": 3,
        "operator_id": 2,
        "name": null,
        "imageUrl": null,
        "cuisine": "italian",
        "current_latitude": 25,
        "current_longitude": 50,
        "next_latitude": null,
        "next_longitude": null,
        "arrival_time": null,
        "departure_time": null
    }
]
```

### /api/trucks/:id GET

Returns an object with information for an individual truck, including menu and reviews.

```
{
    "id": 2,
    "operator_id": 1,
    "name": null,
    "imageUrl": null,
    "cuisine": "chinese",
    "current_latitude": 20,
    "current_longitude": 45,
    "next_latitude": null,
    "next_longitude": null,
    "arrival_time": null,
    "departure_time": null,
    "menu": [
        {
            "id": 3,
            "truck_id": 2,
            "name": "spaghetti supreme",
            "price": 34.99,
            "imageUrl": null
        }
    ],
    "reviews": [
        {
            "id": 5,
            "truck_id": 2,
            "user_id": 3,
            "review": "this truck is really bad and poisons everyone",
            "username": "diner1"
        }
    ]
}
```

### /api/trucks POST

Expects an object with this format as the request body:

```
{
    "name": truckname, //string
    "imageUrl": null, //string
    "cuisine": "chinese", //string (required)
    "current_latitude": 20, //float
    "current_longitude": 45, //float
    "next_latitude": null, //float
    "next_longitude": null, //float
    "arrival_time": null, //string
    "departure_time": null //string
}
```

### /api/trucks/:id PUT

Expects an object with this format as the request body:

```
{
    "name": truckname, //string
    "imageUrl": null, //string
    "cuisine": "chinese", //string
    "current_latitude": 20, //float
    "current_longitude": 45, //float
    "next_latitude": null, //float
    "next_longitude": null, //float
    "arrival_time": null, //string
    "departure_time": null //string
}
```

### /api/trucks/:id DELETE

Deletes the selected truck if it exists.

### /api/trucks/:id/favorite POST

Favorites a truck for logged in user.

### /api/trucks/:id/favorite DELETE

Unfavorites a truck for logged in user.

### /api/trucks/:id/menu POST

Adds a menu item for selected truck. Expects an object with this format as the request body:

```
{
    "name": "taco supreme", //string (required)
    "price": 5.99, //float (required)
    "imageUrl": null //string
}
```

### /api/trucks/:id/menu/:itemid DELETE

Deletes menu item by itemid on selected truck.

### /api/trucks/:id/review POST

Adds a review for selected truck. Expects an object with this format as the request body:

```
{
    "title": "stuff", //string
    "review": "this truck is great" //string (required)
}
```

### /api/trucks/:id/review/:reviewid DELETE

Deletes review by reviewid for selected truck.
