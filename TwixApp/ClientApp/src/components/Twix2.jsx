import '../styles/Twix.css';
import { useState, useEffect } from 'react';

import Sleep1 from '../images/blanket-sleep1.jpeg'
import Sleep2 from '../images/backpack-sleep1.jpg'

function Twix2() {

  const [selectedImg, setSelectedImg] = useState(0)

  const [leftButton, setLeftButton] = useState(0)
  const [rightButton, setRightButton] = useState(0)

  useEffect(() => {
    setLeftButton(Math.floor(Math.random() * 5)+1)
    setRightButton(Math.floor(Math.random() * 5)+1)
  }, [selectedImg])

  function toggleImg(side) {
    if(side === "left" && selectedImg === 1) setSelectedImg(0)
    else if(side === "left" && selectedImg !== 1) setSelectedImg(1)
    else if(side === "right" && selectedImg === 2) setSelectedImg(0)
    else if(side === "right" && selectedImg !== 2) setSelectedImg(2)
  }

  return (
    <section id='twix-switch' className="twix2">

      <div className={selectedImg !== 1 ? "img-container-left zero" : "img-container-left twentyfive"}>
        <img src={Sleep1} alt="Twix sleeping on blanket"/>
      </div>
      
      <div className='twentyfive left-btn-container'>
        
        <button className='left-btn-1' onClick={() => leftButton === 2 ? toggleImg("left") : ""}>Or here?</button>
        <button className='left-btn-2' onClick={() => leftButton === 1 ? toggleImg("left") : ""}>Here!</button>
        <button className='left-btn-3' onClick={() => leftButton === 3 ? toggleImg("left") : ""}>Twix!</button>
        <button className='left-btn-4' onClick={() => leftButton === 4 ? toggleImg("left") : ""}>Maybe here?</button>
        <button className='left-btn-5' onClick={() => leftButton === 5 ? toggleImg("left") : ""}>There?</button>

      </div>
      
      <div className={selectedImg === 0 ? 'divider fifty' : 'divider twentyfive'}>
        <div className='where-there'><h3>{selectedImg === 0 ? "Where" : "There"}</h3></div>
        <div className='is-he'><h3>{selectedImg === 0 ? "Is" : "He"}</h3></div>
        <div className='twix-is'><h3>{selectedImg === 0 ? "Twix" : "Is"}</h3></div>
      </div>
      
      <div className='twentyfive right-btn-container'>
        
        <button className={selectedImg === 2 ? "right-btn-1 right-rotate" : "right-btn-1 left-rotate"} onClick={() => toggleImg("right")}></button>

      </div>
      
      <div className={selectedImg !== 2 ? "img-container-right zero" : "img-container-right twentyfive"}>
        <img src={Sleep2} alt="Twix sleeping in backpack"/>
      </div>

    </section>
  );
}

export default Twix2;