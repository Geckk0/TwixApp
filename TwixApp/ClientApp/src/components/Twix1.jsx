import '../styles/Twix.css';

import Cute from '../images/carpet-cute1.jpeg'
import Angry from '../images/carpet-angry1.jpeg'
import Leaf from '../images/outside-leaf1.jpeg'

function Twix1() {
  return (
    <section id='twix-intro' className="twix1">
        <div className="image-text">
            <h3>Twix</h3>
        </div>
        
        <div className="images">
          
            <img className="img1" src={Cute} alt="Laying"/>
              
            <div className="img2">
              <img src={Leaf} alt="Running"/>
              <div className="overlay-hint"/>
              <div className="overlay"><p>Twix loves sleeping, running around, greeting potetial friends and playing. During playtime he gladly bites if he gets the chance.</p></div>
            </div>

            <img className="img3" src={Angry} alt="Biting!"/>

        </div>
    </section>
  );
}

export default Twix1;