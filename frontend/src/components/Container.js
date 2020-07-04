import React, { useState, useEffect } from "react";

import Badge from "./Badge";
import AddBadge from "./AddBadge";
import "./Container.css";

const Container = () => {
  const [count, setCount] = useState([]);
  const [leftDisable, setLeftDisable] = useState(false);
  let badgeContainer;

  var countLen = 1;

  useEffect(() => {
    badgeContainer = document.getElementById("badgeContainer");
  });

  const fetchData = async () => {
    try {
      const result = await fetch("http://localhost:5000/api/");
      const responseData = await result.json();
      setCount(responseData);
      //console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    countLen = count;
  }, [countLen]);

  const scrollLeft = () => {
    badgeContainer.scrollLeft += 75;
  };

  const scrollRight = () => {
    badgeContainer.scrollLeft -= 75;
  };

  const deleteBadge = (id) => {
    var temp = count;
    var index = temp.indexOf(id);
    temp.splice(index, 1);
    setCount(temp);
  };

  return (
    <div id="container">
      <div id="leftArrow" onClick={scrollRight}>
        <i className="fas fa-chevron-left fa-3x"></i>
      </div>
      <div id="badgeContainer">
        {count.map((val, index) => {
          return (
            <Badge
              key={index}
              onDelete={deleteBadge}
              id={val}
              description={val.description}
              title={val.title}
              id={val._id}
              count={count}
              setCount={setCount}
              fetchData={fetchData}
            />
          );
        })}
        <AddBadge setCount={setCount} count={count} />
      </div>
      <div id="rightArrow" onClick={scrollLeft}>
        <i className="fas fa-chevron-right fa-3x"></i>
      </div>
    </div>
  );
};

export default Container;
