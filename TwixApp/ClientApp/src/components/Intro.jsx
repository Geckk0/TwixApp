import '../styles/Home.css';
import { Fragment, useContext, useState } from 'react';
import { Context } from '../App';

import pointer from '../images/cv-pointer.png'

function Intro() {
	const [context, updateContext] = useContext(Context)

  	return (
    	<div className="intro-overlay fadeOut">

        	<h1 className="welcome-text slide-1">Hello{context.user.id > 0 ? " "+context.user.username : ""},</h1>
        	<h1 className="welcome-text slide-2">My name is Jesper</h1>

			<p className="intro-text">I am a junior <a href="https://www.canva.com/design/DAEwlajoLk4/nft8vm50aWodjLfQTw2fvA/view?utm_content=DAEwlajoLk4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank" className="box">system developer</a></p>
			<p className="intro-text">Welcome to my page!</p>

			<img className="cv-pointer" src={pointer} />

    	</div>
  	);
}

export default Intro;