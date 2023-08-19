import React from "react";

// Component App
function App() {
  return (
    <div className="container">
      <Logo />

      <Form />

      <PackingList />

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
function Form() {
  // generate array numbers
  const qtys = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <React.Fragment>
      <div className="item form">
        <p>Add your list now:</p>
        <select>
          {qtys.map((qty) => (
            <option value={qty} key={qty}>
              {qty}
            </option>
          ))}
        </select>
        <input type="text" placeholder="Item..." />
        <button>ADD</button>
        <button>RESET</button>
      </div>
    </React.Fragment>
  );
}

// Component PackingList
function PackingList() {
  return (
    <React.Fragment>
      <div className="item packing">
        <li className="pack-item">
          <input type="checkbox" />
          <p>Books</p>
          <button>❌</button>
        </li>
      </div>
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
