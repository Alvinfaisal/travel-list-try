import React, { useState } from "react";

// Component App
function App() {
  // State for store and set Item
  const [items, setItems] = useState([]);

  // add item
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  // update item
  function handleUpdateItem(id) {
    const updateItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }

      return item;
    });
    setItems(updateItems);
  }

  // delet item
  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="container">
      <Logo />

      <Form items={items} onAddItem={handleAddItem} />

      <PackingList
        items={items}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleRemoveItem}
      />

      <Stats />
    </div>
  );
}

// Component Logo
function Logo() {
  return (
    <React.Fragment>
      <h1 className="item logo">🎒 Far Away 📦 </h1>
    </React.Fragment>
  );
}

// Component Form
function Form({ items, onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  // generate array numbers
  const qtys = Array.from({ length: 10 }, (_, i) => i + 1);

  function handleNameInput(event) {
    setName(event.target.value);
  }

  function handleQuantityInput(event) {
    setQuantity(event.target.value);
  }

  function handleSUbmit(event) {
    event.preventDefault();

    let newItems = {
      id: new Date().getTime().toString(36),
      quantity: quantity,
      name: name,
      packed: false,
    };

    if (items.length >= 3) {
      setQuantity(1);
      setName("");
      window.confirm("Telah mencapai batas");
    } else {
      onAddItem(newItems);
    }

    setQuantity(1);
    setName("");
  }

  return (
    <React.Fragment>
      <form className="item form" onSubmit={handleSUbmit}>
        <p>Add your list now:</p>
        <select value={quantity} onChange={handleQuantityInput}>
          {qtys.map((qty) => (
            <option value={qty} key={qty}>
              {qty}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={name}
          onChange={handleNameInput}
        />
        <button>ADD</button>
      </form>
    </React.Fragment>
  );
}

// Component PackingList
function PackingList({ items, onUpdateItem, onDeleteItem }) {
  return (
    <React.Fragment>
      <div className="item packing">
        <div className="packing-list">
          {items.map((item) => (
            <Item
              items={item}
              key={item.id}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>

        <select className="select-sort">
          <option>Sort by Input</option>
          <option>Sort by Title</option>
          <option>Sort by Packed</option>
        </select>
        <button className="btn-reset">RESET</button>
      </div>
    </React.Fragment>
  );
}

function Item({ items, onUpdateItem, onDeleteItem }) {
  return (
    <React.Fragment>
      <li className="pack-item">
        <input
          type="checkbox"
          checked={items.packed}
          onChange={() => onUpdateItem(items.id)}
        />
        <span
          style={
            items.packed ? { color: "red", textDecoration: "line-through" } : {}
          }
        >
          {items.quantity} {items.name}
        </span>
        <button onClick={() => onDeleteItem(items.id)}>❌</button>
      </li>
    </React.Fragment>
  );
}

// Component Stats
function Stats() {
  return (
    <React.Fragment>
      <div className="item stats">
        You have X on your list, and you already packed X (X%)
      </div>
    </React.Fragment>
  );
}

export default App;
