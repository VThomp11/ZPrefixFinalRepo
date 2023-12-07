import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import './App.css';
import { getItems, addItem, loginUser, registerUser } from './apiService';
import Login from './Login';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCount, setNewItemCount] = useState('');
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDesc, setUpdatedDesc] = useState('');
  const [updatedCount, setUpdatedCount] = useState('');
  const [selectedNameItemId, setSelectedNameItemId] = useState('');
  const [selectedPriceItemId, setSelectedPriceItemId] = useState('');
  const [selectedDescItemId, setSelectedDescItemId] = useState('');
  const [selectedCountItemId, setSelectedCountItemId] = useState('');
  const [username, setUsername] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
      getItems()
        .then((data) => {
          console.log('Inventory Data:', data);
          setItems(data);
        })
        .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleLogin = () => {
    loginUser(loginData)
      .then((response) => {
        console.log('Login successful', response);
        setIsLoggedIn(true);
        setAuthenticated(true); 
        setUsername(loginData.username);
        toast.success('You are now logged in', loginData.username);
      })
      .catch((error) => {
        console.error('Login failed', error);
      });
  };

  const handleRegistration = () => {
  
    registerUser(registrationData)
      .then((response) => {
      
        console.log('Registration successful', response);
      })
      .catch((error) => {
      
        console.error('Registration failed', error);
      });
  };

  const handleDelete = (id) => {
    if (!authenticated) {
      console.error('Not authenticated');
      return;
    }

    fetch(`http://localhost:8080/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(() => {
        getItems().then((data) => setItems(data));
      })
      .catch((error) => console.error('Error deleting Items:', error));
  };
  const handleAddItems = () => {
    if (!authenticated) {  console.error('Not authenticated. Please log in first.');
    return;
  }
    const generatedId = Math.max(...items.map((item) => item.id), 0) + 1;
  
    addItem(
      {
        name: newItemName,
        price: newItemPrice,
        desc: newItemDesc,
        count: newItemCount,
      },
      authToken // Assuming authToken is available
    )
      .then(() => {
        getItems().then((data) => setItems(data));
  
        setNewItemName('');
        setNewItemPrice('');
        setNewItemDesc('');
        setNewItemCount('');
      })
      .catch((error) => console.error('Error adding Item:', error));
  };

  const handleUpdateName = () => {
    if (!authenticated || !selectedNameItemId) {
      console.error('Not authenticated or no item selected');
      return;
    }

    fetch(`http://localhost:8080/items/${selectedNameItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(() => {
        getItems().then((data) => setItems(data));
        setUpdatedName('');
        setSelectedNameItemId(null);
      })
      .catch((error) => console.error('Error updating Item Name:', error));
  };


  const handleUpdatePrice = () => 
  {if (!authenticated || !selectedPriceItemId) {
    console.error('Not authenticated or no item selected');
    return;
  }
      fetch(`http://localhost:8080/items/${selectedPriceItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: updatedPrice }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response not ok');
          }
          return response.json();
        })
        .then(() => {
          getItems().then((data) => setItems(data));
          setUpdatedPrice('');
          setSelectedPriceItemId(null);
        })
        .catch((error) => console.error('Error updating Item Price:', error));
    }
  

  const handleUpdateDesc = () => {
    if (!authenticated || !selectedDescItemId) {
      console.error('Not authenticated or no item selected');
      return;
    }
      fetch(`http://localhost:8080/items/${selectedDescItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc: updatedDesc }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response not ok');
          }
          return response.json();
        })
        .then(() => {
          getItems().then((data) => setItems(data));
          setUpdatedDesc('');
          setSelectedDescItemId(null);
        })
        .catch((error) => console.error('Error updating Item Description:', error));
    }
  ;

  const handleUpdateCount = () => {
    if (!authenticated || !selectedCountItemId) {
      console.error('Not authenticated or no item selected');
      return;
    }
  
    fetch(`http://localhost:8080/items/${selectedCountItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count: updatedCount }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(() => {
        getItems().then((data) => setItems(data));
        setUpdatedCount('');
        setSelectedCountItemId(null);
      })
      .catch((error) => console.error('Error updating Item Count:', error));
  };
  
  return (
    <div className="App">
      {isLoggedIn && <h2>You are now logged in</h2>}
      <div className="login-section">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      <div className="register-section">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registrationData.username}
          onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={registrationData.password}
          onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
        />
        <button onClick={handleRegistration}>Register</button>
      </div>
      <div className="Item-list">
        <h1>Inventory</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.id}</span>
              <span>{item.name}</span>
              <span className="price">{item.price}</span>
              <span className="desc">{item.desc}</span>
              <span className="count">Item Quantity:{item.count}</span>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-Item-section">
        <h2>Add Item</h2>

        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New Item Name"
        />
        <input
          type="text"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="New Item Price"
        />
        <input
          type="text"
          value={newItemDesc}
          onChange={(e) => setNewItemDesc(e.target.value)}
          placeholder="New Item Description"
        />
        <input
          type="text"
          value={newItemCount}
          onChange={(e) => setNewItemCount(e.target.value)}
          placeholder="New Item Quantity"
        />
        <button onClick={handleAddItems}>Add Items</button>
      </div>
      <div className="update-section-name">
        <h2>Update Item Name</h2>
        <select
          value={selectedNameItemId || ''}
          onChange={(e) => setSelectedNameItemId(e.target.value)}
        >
          <option value="" disabled>Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          placeholder="New Name"
        />
        <button onClick={handleUpdateName}>Update Name</button>
      </div>

      <div className="update-section-price">
        <h2>Update Item Price</h2>
        <select
          value={selectedPriceItemId || ''}
          onChange={(e) => setSelectedPriceItemId(e.target.value)}
        >
          <option value="" disabled>Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          placeholder="New Price"
        />
        <button onClick={handleUpdatePrice}>Update Price</button>
      </div>
      <div className="update-section-desc">
        <h2>Update Item Description</h2>
        <select
          value={selectedDescItemId || ''}
          onChange={(e) => setSelectedDescItemId(e.target.value)}
        >
          <option value="" disabled>Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedDesc}
          onChange={(e) => setUpdatedDesc(e.target.value)}
          placeholder="New Description"
        />
        <button onClick={handleUpdateDesc}>Update Description</button>
      </div>
      <div className="update-section-count">
        <h2>Update Item Quantity count</h2>
        <select
          value={selectedCountItemId || ''}
          onChange={(e) => setSelectedCountItemId(e.target.value)}
        >
          <option value="" disabled>Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={updatedCount}
          onChange={(e) => setUpdatedCount(e.target.value)}
          placeholder="New Quantity Count"
        />
        <button onClick={handleUpdateCount}>Update Quantity Count</button>
      </div>
    </div>
  );
};

export default App;
