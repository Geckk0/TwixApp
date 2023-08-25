import '../styles/Home.css';
import { Fragment, useContext, useState } from 'react';
import { Context } from '../App';

import pointer from '../images/cv-pointer.png'

function Intro() {
	const [context, updateContext] = useContext(Context)

  	return (
    	<div className="intro-overlay fadeOut">

        	<h1 className="welcome-text slide-1">Hello{context.user ? " "+context.user.username : ""},</h1>
        	<h1 className="welcome-text slide-2">My name is Jesper</h1>

			<p className="intro-text">I am a junior <a href={require("../files/CV.pdf")} download="CV_Jesper_Ljungdahl.pdf" rel="noopener noreferrer" className="box">system developer</a></p>
			<p className="intro-text">Welcome to my page!</p>

			<img className="cv-pointer" src={pointer} />

    	</div>
  	);
}

export default Intro;