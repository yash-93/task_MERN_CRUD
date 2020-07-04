import React, { useState } from "react";

import Modal from "./Modal";
import "./AddBadge.css";

const AddBadge = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const openAddHandler = () => {
    setShowAdd(true);
  };

  const closeAddHandler = () => {
    setShowAdd(false);
  };

  const addBadge = async () => {
    try {
      const result = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      const responseData = await result.json();
      //console.log(responseData);
      props.setCount([...props.count, responseData]);
      closeAddHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showAdd}
        onCancel={closeAddHandler}
        header="Add Product"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeAddHandler}>CLOSE</button>}
      >
        <form onSubmit={addBadge} method="POST">
          <input
            type="text"
            placeholder="title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
          <textarea
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          <input type="submit"></input>
        </form>
      </Modal>
      <div id="addbadge">
        <i className="fas fa-plus fa-5x" onClick={openAddHandler}></i>
      </div>
    </React.Fragment>
  );
};

export default AddBadge;
