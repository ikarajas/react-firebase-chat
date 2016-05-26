import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import routes from "./config/routes"; 

var config = {
	apiKey: "AIzaSyCelnfU4KrFnEDVEwVY-qR_2uot_Xmk-EQ",
    authDomain: "ivans-pollenizer-demo.firebaseapp.com",
    databaseURL: "https://ivans-pollenizer-demo.firebaseio.com",
    storageBucket: "",
  };

firebase.initializeApp(config);


ReactDOM.render(
	routes,
	document.getElementById("app"));

//	<ChatContainer chatName="demoChat" />,

