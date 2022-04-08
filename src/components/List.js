import React from "react";

function List({ items, removeItem, editItem }) {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="todo-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
