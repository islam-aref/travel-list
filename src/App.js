import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Flashcards from "./Flashcards";

function App() {
  const [items, setItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearAll() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        clearAll={clearAll}
      />
      <Stats items={items} />
      <Routes>
        <Route path="/Flashcards" element={<Flashcards />} />
      </Routes>
    </div>
  );
}

function Logo() {
  return <h1>🧳 Far Away 🌴</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, clearAll }) {
  const navigate = useNavigate();
  function handleOrderNowClick() {
    navigate("/flashcards");
  }
  const [sort_by, setSortBy] = useState("input");
  let sorted_items;
  if (sort_by === "input") sorted_items = items;

  if (sort_by === "description")
    sorted_items = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sort_by === "packed")
    sorted_items = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  const [showConfirmation, setShowConfirmation] = useState(false);
  function handleClearAll() {
    setShowConfirmation(true);
  }

  function handleConfirmClear() {
    setShowConfirmation(false);
    clearAll();
  }

  function handleCancelClear() {
    setShowConfirmation(false);
  }
  return (
    <div className="list">
      <ul>
        {sorted_items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="Actions">
        <select value={sort_by} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort Chronologically</option>
          <option value="description">Sort by Name</option>
          <option value="packed">Sort by Packed State</option>
        </select>
        <button onClick={handleClearAll}>Clear list</button>
        {showConfirmation && (
          <div className="confirmationBox">
            <p>Are you sure you want to clear the list?</p>
            <button onClick={handleConfirmClear}>Yes, Clear</button>
            <button onClick={handleCancelClear}>Cancel</button>
          </div>
        )}
      </div>

      <button className="cards" onClick={handleOrderNowClick}>
        Go to Flash Cards
      </button>
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <div>
        <input type="checkbox" onClick={() => onToggleItem(item.id)} />
        <span
          style={
            item.packed
              ? {
                  textDecoration: "line-through",
                  textDecorationStyle: "",
                  color: "Gray",
                }
              : {}
          }
        >
          {item.quantity} {item.description}
        </span>
      </div>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>You do not have any items, please add some</em>
      </p>
    );

  const num_items = items.length;
  const num_packed = items.filter((item) => item.packed).length;

  return (
    <footer>
      <em>
        {Math.round((num_packed / num_items) * 100) === 100
          ? `Ready to gooooooooo, يارب عقبالي`
          : `You have ${" "}
          ${num_items} items on your list, and you already packed ${num_packed} (${" "}
          ${Math.round((num_packed / num_items) * 100)} % )`}
      </em>
    </footer>
  );
}

export default App;
