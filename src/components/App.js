import React, { useEffect, useRef, useState } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorgae = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(getLocalStorgae());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const todoinput = useRef();

  const submitHandle = (e) => {
    e.preventDefault();
    if (!input) {
      showAlert(true, "danger", "Please enter todo");
    } else if (input && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: input };
          }
          return item;
        })
      );

      setInput("");
      showAlert(true, "success", "Item Edited");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newItem = { id: new Date().getTime().toString(), title: input };

      setList([...list, newItem]);

      setInput("");

      showAlert(true, "success", "Todo Added");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({
      show,
      type,
      msg,
    });
  };

  const clearItems = () => {
    showAlert(true, "danger", "Removing all items");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item Removed");
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => {
      return item.id === id;
    });
    setIsEditing(true);
    setEditId(id);
    setInput(specificItem.title);
    todoinput.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={submitHandle}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3>Todo App</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add your todo here..."
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={todoinput}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 ? (
        <div className="todo-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear All Todos
          </button>
        </div>
      ) : (
        <h2 className="no-todo">No todo items here...</h2>
      )}
    </section>
  );
}

export default App;
