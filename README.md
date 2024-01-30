# Pizza Restaurants API and React Frontend

## Overview
This project is a web application for managing pizza restaurants. It includes a backend API developed using Flask and a frontend interface built with React. The application allows for managing restaurants, pizzas, and their associations.

## Models and Relationships
### Models
- **Restaurant**: Represents a pizza restaurant.
- **Pizza**: Represents a type of pizza.
- **RestaurantPizza**: Association between a `Restaurant` and a `Pizza`, with additional attributes.

### Relationships
- A `Restaurant` has many `Pizza`s through `RestaurantPizza`.
- A `Pizza` has many `Restaurant`s through `RestaurantPizza`.
- A `RestaurantPizza` belongs to a `Restaurant` and belongs to a `Pizza`.

## Validations
- `RestaurantPizza` model:
  - `price`: Must be between 1 and 30.

## Routes
### GET /restaurants
- Returns a list of restaurants.
- JSON Format:
  ```json
  [
    {
      "id": 1,
      "name": "Sottocasa NYC",
      "address": "298 Atlantic Ave, Brooklyn, NY 11201"
    },
    {
      "id": 2,
      "name": "PizzArte",
      "address": "69 W 55th St, New York, NY 10019"
    }
  ]

### GET /restaurants/:id
- Returns details of a specific restaurant, including associated pizzas.
- JSON Format if exists:
  ```json
  {
    "id": 1,
    "name": "Sottocasa NYC",
    "address": "298 Atlantic Ave, Brooklyn, NY 11201",
    "pizzas": [...]
  }
  ```

### If the restaurant does not exist:
- JSON Format:
  ```json
  { "error": "Restaurant not found" }
  ```

### DELETE /restaurants/:id
- Deletes a specific restaurant and associated RestaurantPizzas.
- Returns an empty response body with appropriate HTTP status code.
- If the restaurant does not exist:
  - JSON Format:
    ```json
    { "error": "Restaurant not found" }
    ```

### GET /pizzas
- Returns a list of pizzas.
- JSON Format:
  ```json
  [
    {
      "id": 1,
      "name": "Cheese",
      "ingredients": "Dough, Tomato Sauce, Cheese"
    },
    {
      "id": 2,
      "name": "Pepperoni",
      "ingredients": "Dough, Tomato Sauce, Cheese, Pepperoni"
    }
  ]
  ```

### POST /restaurant_pizzas
- Creates a new RestaurantPizza association.
- Request Body Format:
  ```json
  {
    "price": 5,
    "pizza_id": 1,
    "restaurant_id": 3
  }
  ```
- Successful Response Format:
  ```json
  {
    "id": 1,
    "name": "Cheese",
    "ingredients": "Dough, Tomato Sauce, Cheese"
  }
  ```
- If creation fails:
  - JSON Format:
    ```json
    { "errors": ["validation errors"] }
    ```

### React Frontend
- A fully functional frontend application to interact with the API.
- Features:
  - View all restaurants and pizzas.
  - View details of a specific restaurant.
  - Create new associations between restaurants and pizzas.
  - Delete restaurants.
