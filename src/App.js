import React, { useState , useEffect } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  //first fetch the data from the local storage
  let storedItems = JSON.parse(localStorage.getItem('itemsKey'));
  if(storedItems === null)
    storedItems = [];
  //use this as default value of items in the list
  const [items, setItems] = useState(storedItems);
  
  //this useEffect updates the data stored in the local storage the state of items are changed
  useEffect(() => {
    localStorage.setItem('itemsKey', JSON.stringify(items));
  }, [items]);

  //a function which adds the new item typed in the input area
  function addItem(inputText) {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
  }

  //a function which is envoked on clicking an item and it deletes the item that was clicked by use of filter function
  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {/* map through every element in the items array */}
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
