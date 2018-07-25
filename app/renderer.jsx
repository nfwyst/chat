import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header.jsx";
import Copycat from "./components/Copycat.jsx";
import 'photonkit/dist/css/photon.css';

ReactDOM.render((
  <div>
    <Header />
    <Copycat>
      <li>Child node</li>
      <li>Child node</li>
    </Copycat>
  </div> 
), document.querySelector("#app"));
