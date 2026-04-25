import React, { useEffect, useState } from "react";

// Change this URL when your backend is deployed.
const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  // Load items when the page opens.
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setMessage("Could not load items. Check if backend is running.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        setMessage("Please fill all fields correctly.");
        return;
      }

      setFormData({
        name: "",
        quantity: "",
        description: ""
      });
      setMessage("Item added successfully.");
      getItems();
    } catch (error) {
      setMessage("Could not add item. Check if backend is running.");
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setMessage("Item deleted successfully.");
      getItems();
    } catch (error) {
      setMessage("Could not delete item.");
    }
  };

  return (
    <main className="container">
      <h1>MERN Item Manager</h1>
      <p className="subtitle">Simple CRUD project for lab test practice</p>

      <section className="form-section">
        <h2>Add Item</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Example: Notebook"
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Example: 10"
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Example: Used for lecture notes"
          ></textarea>

          <button type="submit">Add Item</button>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="list-section">
        <h2>Item List</h2>

        {items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="item-list">
            {items.map((item) => (
              <article className="item-card" key={item._id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>{item.description}</p>
                </div>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
