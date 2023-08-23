import { useContext } from "react"
import { Context } from '../App'
import AddPop from './AddPop'
import '../styles/Pop.css'

function Pops() {

  const [context, updateContext] = useContext(Context)

  // const userId = 1
  // const [popList, setPopList] = useState([])

  // useEffect(() =>{
  //   const fetchData = async () => {
  //     const response = await fetch("pop/1")
  //     const data = await response.json()
  //     setPopList(data)
  //   } 

  //   fetchData().catch(console.error)
  // })
    

  return (<>
      <AddPop />

      <section className="showcase">
        {(context.user.pops != null)?context.user.pops.map((pop) => <div key={pop.id} className="case">
          <img src={pop.imgUrl} />
          <div className="desc">
            {pop.number != 0 ? <p>{pop.number}</p> : <p> --</p>}
            <p>{pop.name}</p>
            <p>{pop.series}</p>
          </div>
        </div>)
        :<h2>No pops to show</h2>}
      </section>
    </>
  );
}

export default Pops;