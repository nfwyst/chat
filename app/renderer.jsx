import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header.jsx";
import Copycat from "./components/Copycat.jsx";

ReactDOM.render((
  <div>
    <Header />
    <Copycat>
      <li>Child node</li>
      <li>Child node</li>
    </Copycat>
  </div> 
), document.querySelector("#app"));
