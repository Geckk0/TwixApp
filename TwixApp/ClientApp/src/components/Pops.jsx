import { useEffect, useState } from "react";
import '../styles/Pop.css'

function Pops() {

  const userId = 1
  const [popList, setPopList] = useState([])

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch("pop/1")
      const data = await response.json()
      setPopList(data)
    } 

    fetchData().catch(console.error)
  })
    

  return (
    <section className="showcase">
      {(popList != null)?popList.map((pop) => <div key={pop.id} className="case">
        <img src={pop.imgUrl} />
        <div className="desc">
          {pop.number != 0 ? <p>{pop.number}</p> : <p> --</p>}
          <p>{pop.name}</p>
          <p>{pop.series}</p>
        </div>
      </div>)
      :<h2>Loading...</h2>}
    </section>
  );
}

export default Pops;