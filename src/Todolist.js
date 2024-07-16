import React, { useState, useEffect } from 'react';

// Individual item component
function Item({ item, onDelete, onEdit }) {
  return (
    <li className={`item ${item.priority.toLowerCase()}-priority`}>
      {item.name} - {item.priority}
      <button onClick={() => onDelete(item.id)}>Delete</button>
      <button onClick={() => onEdit(item.id)}>Edit</button>
    </li>
  );
}

// Todolist component
export default function Todolist() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('todolist');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newItem, setNewItem] = useState({ name: '', priority: 'Medium' });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(items));
  }, [items]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = () => {
    if (isEditing) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editItemId ? { ...item, ...newItem } : item
        )
      );
      setIsEditing(false);
      setEditItemId(null);
    } else {
      setItems((prevItems) => [
        { id: Date.now(), ...newItem },
        ...prevItems, // Add new item at the beginning
      ]);
    }
    setNewItem({ name: '', priority: 'Medium' });
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setNewItem(itemToEdit);
    setIsEditing(true);
    setEditItemId(id);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Sort items based on priority (High -> Medium -> Low)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.priority === 'High') return -1;
    if (b.priority === 'High') return 1;
    if (a.priority === 'Medium') return -1;
    if (b.priority === 'Medium') return 1;
    return 0;
  });

  return (
    <div className="container" style={{ marginTop: '10vh' }}>
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Task Description"
          value={newItem.name}
          onChange={handleNewItemChange}
        />
        <select
          name="priority"
          value={newItem.priority}
          onChange={handleNewItemChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleAddItem}>
          {isEditing ? 'Update Item' : 'Add Item'}
        </button>
      </div>

      <section>
        <h2>List of Tasks</h2>
        <ul>
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
