import { useContext, useEffect, useState } from "react"
import { Context } from '../App'
import { useHistory } from 'react-router-dom'
import AddPop from './AddPop'
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
    await fetch("pop/" + popId + "/" + context.user.id, {method: "PUT"})
    .then( response => {if(response.ok) 
      {
        let newUser = context.user
        newUser.pops.map(x => {
          if(x.id == popId && archive) x.deletedAt = new Date().toLocaleString
          else if(x.id == popId && !archive) x.deletedAt = null
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
      await fetch("pop/" + popId + "/" + context.user.id, {method: "DELETE"})
      .then( response => {if(response.status == 410)
        {
          let newUser = context.user
          newUser.pops = newUser.pops.filter( x => x.id != popId )
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
    if(searchQuery.length > 2){ //toUpperCase is not an ideal solution but localeCompare does not want to work
      if(showArchived) setShowList(fullList.filter( x => x.deletedAt != null && x.name.toUpperCase().includes(searchQuery.toUpperCase())))
      else setShowList(fullList.filter( x => x.deletedAt == null && x.name.toUpperCase().includes(searchQuery.toUpperCase())))
    }
    else{
      if(showArchived) setShowList(fullList.filter( x => x.deletedAt != null).sort(function(a, b){return a.number - b.number}))
      else setShowList(fullList.filter( x => x.deletedAt == null).sort(function(a, b){return a.number - b.number}))  
    }
  }
    

  return (
    <section className="showcase">
      <div className="pop-settings">
        <h3>{showArchived ? "Archived pops" : "Your collection"}</h3>
        <input onChange={(e) => searchPop(e.target.value)} type="text" placeholder="Search pops"/>
        {!showArchived && <button onClick={() => setShowAddSquare(!showAddSquare)}>Add new pops</button>}
        <button onClick={() => switchPopList()}>{showArchived ? "See your collection" : "See archived pops"}</button>
      </div>
      {!showArchived && showAddSquare && <AddPop />}

      {(showList.length > 0) ? showList.map((pop) => 
        <div key={pop.id} className="case">
          <img src={pop.imgUrl} />
          <div className="desc">
            {pop.number != 0 ? <p>{pop.number}</p> : <p> --</p>}
            <p>{pop.name}</p>
            <p>{pop.series}</p>
          </div>
          {pop.recent ? <div className="new-pop">New!</div> : undefined}
          {pop.deletedAt ? <>
              <button className="pop-buttons" onClick={() => updateArchiveState(pop.id, false)} 
              data-tooltip="Add the pop to your collection again">Add back</button>
              <button className="pop-buttons" onClick={() => deletePop(pop.id)}
              data-tooltip="Permanently remove the pop">Delete</button>
            </>
          : <>
              <button className="pop-buttons" onClick={() => updateArchiveState(pop.id, true)}
              data-tooltip="Remove the pop from your current collection and save it in your archives">Archive</button>
              <button className="pop-buttons" style={{textDecoration: "line-through"}}>Edit</button>
            </>}
        </div>)
      :
      <div className="case">
        <img src="https://m.media-amazon.com/images/I/61CE398OACL.__AC_SY300_SX300_QL70_ML2_.jpg" />
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