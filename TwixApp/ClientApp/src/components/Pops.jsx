import { useContext, useEffect, useState } from "react"
import { Context } from '../App'
import { useHistory } from 'react-router-dom'
import AddPop from './AddPop'
import AddDisplay from './PopsDisplay'
import '../styles/Pop.css'

function Pops() {
  const [context, updateContext] = useContext(Context)
  const [fullList, setFullList] = useState(context.user.pops)
  const [showList, setShowList] = useState(context.user.pops.filter(function (x) {return x.deletedAt == null}))
  const [showArchived, setShowArchived] = useState(false)
  const [showAddSquare, setShowAddSquare] = useState(false)

  const history = useHistory()

  useEffect(() => {
    if(!context.user.id > 0) {history.push('/')}
  })

  async function updateArchiveState(popId, archive){
    //Update the deleted value for pop
    await fetch("pop/" + popId + "/" + context.user.id + "/" + context.user.password, {method: "PUT"})
    .then( response => {if(response.ok) 
      {
        let newUser = context.user
        newUser.pops.map(x => {
          if(x.id === popId && archive) x.deletedAt = new Date().toLocaleString
          else if(x.id === popId && !archive) x.deletedAt = null
        })
        newUser.pops.sort(function(a, b){return a.number - b.number})
        updateContext({user: newUser})
        setFullList(newUser.pops)
        if(showArchived) setShowList(newUser.pops.filter(function (x) {return x.deletedAt != null}))
        else setShowList(newUser.pops.filter(function (x) {return x.deletedAt == null}))
      }
    })
  }

  async function deletePop(popId){
    if(window.confirm("This will permanently remove the pop")){
      //Permanently delete pop
      await fetch("pop/" + popId + "/" + context.user.id + "/" + context.user.password, {method: "DELETE"})
      .then( response => {if(response.status === 410)
        {
          let newUser = context.user
          newUser.pops = newUser.pops.filter( x => x.id !== popId )
          updateContext({user: newUser})
          setFullList(newUser.pops)
          if(showArchived) setShowList(newUser.pops.filter( x => x.deletedAt != null))
          else setShowList(newUser.pops.filter( x => x.deletedAt == null))
        }
      })
    }
  }

  function switchPopList(){
    setShowArchived(!showArchived)

    //Slow state updates makes me need to reverse value to get desired result
    if(!showArchived) setShowList(fullList.filter( x => x.deletedAt != null).sort(function(a, b){return a.number - b.number}))
    else setShowList(fullList.filter( x => x.deletedAt == null).sort(function(a, b){return a.number - b.number}))
  }

  function searchPop(searchQuery){
    let newShowList = [...fullList] //Re-create list without refrence to original

    if(showArchived) newShowList = newShowList.filter( x => x.deletedAt != null)
    else newShowList = newShowList.filter( x => x.deletedAt == null)

    if(searchQuery.length > 2){ //toUpperCase is not an ideal solution but localeCompare does not want to work
      newShowList = newShowList.filter( x => 
        x.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
        x.series.toUpperCase().includes(searchQuery.toUpperCase())
      )
    }
    else if(!isNaN(searchQuery)){
      newShowList = newShowList.filter( x => +x.number.toString().includes(searchQuery))
    }

    setShowList(newShowList)
  }
    

  return (
    <section className="showcase">
      <div className="pop-settings">
        <h3>{showArchived ? "Archived pops" : "Your collection"}</h3>
        <input onChange={(e) => searchPop(e.target.value)} type="text" placeholder="Search pops"/>
        {!showArchived && <button onClick={() => setShowAddSquare(!showAddSquare)}>Add new pops</button>}
        <button onClick={() => switchPopList()}>{showArchived ? "See your collection" : "See archived pops"}</button>
      </div>
      {!showArchived && showAddSquare && <AddPop updateList={searchPop}/>}

      {(showList.length > 0) ? showList.map((pop) => 
      <AddDisplay 
        id={pop.id}
        imgUrl={pop.imgUrl}
        number={pop.number}
        name={pop.name}
        series={pop.series}
        rating={pop.rating}
        recent={pop.recent}
        deletedAt={pop.deletedAt}
        updateArchiveState={updateArchiveState}
        deletePop={deletePop}
      />)
      :
      <div className="case">
        <img src="https://m.media-amazon.com/images/I/61CE398OACL.__AC_SY300_SX300_QL70_ML2_.jpg" alt="Pop display"/>
        <div className="desc">
          <p>01</p>
          <p>Example pop</p>
          <p>Try adding your own</p>
        </div>
      </div>
      }
    </section>
  );
}

export default Pops;