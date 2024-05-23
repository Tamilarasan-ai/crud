import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('https://crud-backend-iota.vercel.app/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error(error));
  }, []);

  const addItem = () => {
    fetch('https://crud-backend-iota.vercel.app/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => setItems([...items, data]))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    fetch(`https://crud-backend-iota.vercel.app/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Item List</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
