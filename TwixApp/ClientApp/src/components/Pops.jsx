import { useContext, useEffect } from "react"
import { Context } from '../App'
import { useHistory } from 'react-router-dom'
import AddPop from './AddPop'
import '../styles/Pop.css'

function Pops() {
  const [context, updateContext] = useContext(Context)

  const history = useHistory()

  useEffect(() => {
    if(!context.user) {history.push('/')}
  })
    

  return (
    <section className="showcase">
      <AddPop />

      {(context.user && context.user.pops.length != 0)?context.user.pops.map((pop) => 
        <div key={pop.id} className="case">
          <img src={pop.imgUrl} />
          <div className="desc">
            {pop.number != 0 ? <p>{pop.number}</p> : <p> --</p>}
            <p>{pop.name}</p>
            <p>{pop.series}</p>
          </div>
        </div>)
      :
      <div className="case">
        <img src="https://m.media-amazon.com/images/I/61CE398OACL.__AC_SY300_SX300_QL70_ML2_.jpg" />
        <div className="desc">
          <p>01</p>
          <p>Mickey Mouse</p>
          <p>This is an example pop</p>
        </div>
      </div>
      }
    </section>
  );
}

export default Pops;