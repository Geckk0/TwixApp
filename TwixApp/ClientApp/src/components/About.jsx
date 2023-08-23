import '../styles/Home.css';
import { useState } from 'react';

function About() {
  const [show, setShow] = useState(false)

  return (
    <article className={show ? "show-about about-popup slide-3" : "about-popup slide-3"}>

      <section onClick={() => setShow(!show)} className='about-head'>
        <h3>About</h3>
      </section>
    
      <section>
        <h3>About me</h3>
        <p>My name is Jesper and I am a junior system developer.(you know this already)</p>
        <p>I spend most of my time playing with my dog or go out golfing when the weather is good.</p>
        <p>Here is my CV: <a href={require("../files/CV.pdf")} download="CV_Jesper_Ljungdahl.pdf" rel="noopener noreferrer">CV.pdf</a></p>
      </section>

      <section>
        <h3>About this site</h3>
        <p>Work on this site is irregular and mostly when I feel inspiration.</p>
        <p>It is a React web app using functional components. And the backend is written in C#.</p>
      </section>

      <section>
        <h3>Aditional info</h3>
        <p>Originally it was a private site for me to collect pictures of my dog and my pops.</p>
        <p>I reccomend making up fake user details for safety if you want to try adding your own pops.</p>
        <p>Passwords are hashed but I did not implement any authentication token yet.</p>
      </section>

    </article>
  );
}

export default About;