import React, { useState } from "react";

import Modal from "./Modal";
import Tokyo from "../images/tokyo.jfif";
import "./Badge.css";

const Badge = (props) => {
  const [id, setId] = useState(props.id);
  const [showIcons, setShowIcons] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const openDescHandler = () => {
    setShowDesc(true);
  };

  const closeDescHandler = () => {
    setShowDesc(false);
  };

  const openEditHandler = () => {
    setShowEdit(true);
  };

  const closeEditHandler = () => {
    setShowEdit(false);
  };

  const openDeleteHandler = () => {
    setShowDelete(true);
  };

  const closeDeleteHandler = () => {
    setShowDelete(false);
  };

  const makeIconsVisible = () => {
    setShowIcons(true);
  };

  const makeIconsInvisible = () => {
    setShowIcons(false);
  };

  const deleteBadge = async () => {
    var temp = [];
    try {
      const result = await fetch(`http://localhost:5000/api/delete/${id}`, {
        method: "DELETE",
      });

      temp = props.count.filter((prod) => prod._id !== id);
      //console.log(temp);
      props.setCount(temp);
    } catch (err) {
      console.log(err);
    }
    closeDeleteHandler();
  };

  const editBadge = async () => {
    try {
      const result = await fetch(`http://localhost:5000/api/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      // const responseData = await result.json();
      var temp = props.count;
      var i;
      for (i = 0; i < temp.length; i++) {
        if (temp[i]._id === id) {
          temp[i].title = title;
          temp[i].description = description;
          break;
        }
      }
      props.setCount(temp);
      props.fetchData();
    } catch (err) {
      console.log(err);
    }
    closeEditHandler();
  };

  return (
    <React.Fragment>
      <Modal
        show={showDesc}
        onCancel={closeDescHandler}
        header={props.title}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeDescHandler}>CLOSE</button>}
      >
        <p className="desc">{props.description}</p>
      </Modal>
      <Modal
        show={showEdit}
        onCancel={closeEditHandler}
        header="Edit Product"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeEditHandler}>CLOSE</button>}
      >
        <form onSubmit={editBadge}>
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
      <Modal
        show={showDelete}
        onCancel={closeDeleteHandler}
        header="Confirm Delete"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeDeleteHandler}>CLOSE</button>}
      >
        <form onSubmit={deleteBadge}>
          <input type="submit" value="DELETE"></input>
        </form>
      </Modal>
      <div
        id="badge"
        onMouseEnter={makeIconsVisible}
        onMouseLeave={makeIconsInvisible}
        style={{ backgroundImage: `url(${Tokyo})` }}
      >
        <div id="icons">
          {showIcons && (
            <React.Fragment>
              <i
                className="fas fa-info-circle fa-3x"
                id="info"
                onClick={openDescHandler}
              ></i>
              <i
                className="fas fa-edit fa-3x"
                id="edit"
                onClick={openEditHandler}
              ></i>
              <i
                className="fas fa-trash-alt fa-3x"
                id="delete"
                onClick={openDeleteHandler}
              ></i>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Badge;
