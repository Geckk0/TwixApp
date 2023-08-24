import '../styles/Home.css';
import { Fragment, useContext, useState } from 'react';
import { Context } from '../App';

function Intro() {
	const [context, updateContext] = useContext(Context)

  	return (
    	<div className="intro-overlay fadeOut">

        	<h1 className="welcome-text slide-1">Hello{context.user ? " "+context.user.username : ""},</h1>
        	<h1 className="welcome-text slide-2">My name is Jesper</h1>

			<p className="intro-text">I am a junior <b className="box">system developer</b></p>
			<p className="intro-text">Welcome to my page!</p>

    	</div>
  	);
}

export default Intro;