import React from "react";
import { render } from "react-dom";
import Main from "./Main";

const initialise = () => {
	let parent = document.createElement( "div" );
	parent.setAttribute( "id", "app" );
	document.body.appendChild( parent );
	render( <Main />, parent );
};

initialise();