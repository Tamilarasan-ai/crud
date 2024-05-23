import  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5000/items', { name })
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error(error));
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
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
