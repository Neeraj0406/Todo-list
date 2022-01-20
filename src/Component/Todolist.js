import React, { useState, useEffect } from "react";
import todolistimage from "../images/todolist.png";
import "./todolist.css";

const getLocalItems = () => {
  let list = localStorage.getItem("Items");
  if (list) {
    return JSON.parse(localStorage.getItem("Items"));
  } else {
    return [];
  }
};
const Todolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [updateToggle, setUpdateToggle] = useState(false);
  const [isEditItem, setIsEditItem] = useState();

  const showList = () => {
    if (!inputData) {
      alert("please enter data");
    } else if (inputData && updateToggle) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setUpdateToggle(false);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  var newList = [];
  const deleteItems = (id) => {
    newList = items.filter((elem) => {
      return elem.id != id;
    });
    setItems(newList);
  };

  const RemoveAll = () => {
    setItems([]);
  };

  const updateItems = (id) => {
    let newEditItem = items.find((elem) => {
      return id === elem.id;
    });
    console.log(newEditItem.name);
    setUpdateToggle(true);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  //  add data to local storage
  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main_container">
        <div className="child_container">
          <figure>
            <img src={todolistimage} alt="todolist image" />
            <figcaption className="fig_caption">
              {" "}
              Add your list here ✌{" "}
            </figcaption>
          </figure>

          <div className="item_input_div">
            <input
              type="text"
              className="item_input"
              placeholder="✍ Add items..."
              onChange={(e) => setInputData(e.target.value)}
              value={inputData}
            />
            {updateToggle ? (
              <i
                className="far fa-edit input_btn"
                title="Add Item"
                onClick={showList}
              />
            ) : (
              <i
                className="fas fa-plus input_btn"
                title="Add Item"
                onClick={showList}
              />
            )}
          </div>

          <div className="each_item_container">
            {items.map((elem) => {
              return (
                <div className="list_div" key={elem.id}>
                  <h3 className="each_item"> {elem.name} </h3>
                  <i
                    className="fas fa-times "
                    title="Delete Item"
                    onClick={() => deleteItems(elem.id)}
                  />
                  <i
                    className="far fa-edit"
                    title="Update Item"
                    onClick={() => updateItems(elem.id)}
                  />
                </div>
              );
            })}

            <button className="remove_btn" onClick={RemoveAll}>
              {" "}
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
