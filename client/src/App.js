import React, { useState, useEffect } from 'react';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({ price: '', pizza_id: '', restaurant_id: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => setErrorMessage('Error fetching restaurants: ' + error.message));

    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => setErrorMessage('Error fetching pizzas: ' + error.message));
  }, []);

  const handleDelete = (restaurantId) => {
    fetch(`/restaurants/${restaurantId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete');
        return response.json();
      })
      .then(() => setRestaurants(prev => prev.filter(r => r.id !== restaurantId)))
      .catch(error => setErrorMessage('Error deleting restaurant: ' + error.message));
  };

  const validatePizzaInput = () => {
    const { price, pizza_id, restaurant_id } = newPizza;
    if (price < 1 || price > 30) {
      setErrorMessage('Price must be between 1 and 30');
      return false;
    }
    if (pizza_id <= 0 || restaurant_id <= 0) {
      setErrorMessage('Pizza ID and Restaurant ID must be positive numbers');
      return false;
    }
    return true;
  };

  const handleCreatePizza = () => {
    if (!validatePizzaInput()) {
      return;
    }
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPizza),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to create pizza');
        return response.json();
      })
      .then(data => {
        console.log('Pizza created successfully:', data);
        setNewPizza({ price: '', pizza_id: '', restaurant_id: '' });
        setErrorMessage('');
      })
      .catch(error => setErrorMessage('Error creating pizza: ' + error.message));
  };

  return (
    <div>
      <h1>Pizza Restaurants</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.address}
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - {pizza.ingredients}
          </li>
        ))}
      </ul>

      <h2>Create Pizza</h2>
      <label>
        Price:
        <input
          type="number"
          value={newPizza.price}
          onChange={(e) => setNewPizza({ ...newPizza, price: parseInt(e.target.value, 10) || '' })}
        />
      </label>
      <label>
        Pizza ID:
        <input
          type="number"
          value={newPizza.pizza_id}
          onChange={(e) => setNewPizza({ ...newPizza, pizza_id: parseInt(e.target.value, 10) || '' })}
        />
      </label>
      <label>
        Restaurant ID:
        <input
          type="number"
          value={newPizza.restaurant_id}
          onChange={(e) => setNewPizza({ ...newPizza, restaurant_id: parseInt(e.target.value, 10) || '' })}
        />
      </label>
      <button onClick={handleCreatePizza}>Create Pizza</button>
    </div>
  );
};

export default App;
