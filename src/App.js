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

  function handleResetItems() {
    window.confirm("Remove all items?");
    setItems([]);
  }

  return (
    <div className="container">
      <Logo />

      <Form items={items} onAddItem={handleAddItem} />

      <PackingList
        items={items}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleRemoveItem}
        onResetItem={handleResetItems}
      />

      <Stats items={items} />
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

    if (items.length >= 16) {
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
          maxLength={20}
          onChange={handleNameInput}
        />
        <button>ADD</button>
      </form>
    </React.Fragment>
  );
}

// Component PackingList
function PackingList({ items, onUpdateItem, onDeleteItem, onResetItem }) {
  const [sortBy, setSortby] = useState("sort-input");

  function handleSelectsort(event) {
    setSortby(event.target.value);
  }

  let sortItems;

  if (sortBy === "sort-input") {
    sortItems = items;
  } else if (sortBy === "sort-title") {
    sortItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "sort-packed") {
    sortItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  } else if (sortBy === "sort-quantity") {
    sortItems = items.slice().sort((a, b) => a.quantity - b.quantity);
  }
  return (
    <React.Fragment>
      <div className="item packing">
        <div className="packing-list">
          {sortItems.map((item) => (
            <Item
              items={item}
              key={item.id}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>

        <select
          className="select-sort"
          value={sortBy}
          onChange={handleSelectsort}
        >
          <option value="sort-input">Sort by Input</option>
          <option value="sort-title">Sort by Title</option>
          <option value="sort-packed">Sort by Packed</option>
          <option value="sort-quantity">Sort by Quantity</option>
        </select>
        <button className="btn-reset" onClick={onResetItem}>
          RESET
        </button>
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
          {items.quantity} - {items.name}
        </span>
        <button onClick={() => onDeleteItem(items.id)}>❌</button>
      </li>
    </React.Fragment>
  );
}

// Component Stats
function Stats({ items }) {
  const numItems = items.length;
  const numItemsPacked = items.filter((item) => item.packed === true).length;
  const numPercentage = +((numItemsPacked / numItems) * 100).toFixed();
  // console.log(typeof numPercentage);

  return (
    <React.Fragment>
      <div className="item stats">
        {numPercentage === 100 && (
          <em>You got everything! Ready to your happiness 🐧</em>
        )}

        {numPercentage !== 100 && numPercentage !== 0 && (
          <em>
            You have {numItems} on your list, and you already packed{" "}
            {numItemsPacked} ( {numItems === 0 ? 0 : numPercentage} %){" "}
          </em>
        )}

        {numPercentage === 0 && <em>Pack your items right now please 😢!!</em>}
      </div>
    </React.Fragment>
  );
}

export default App;
