import { useState, useContext } from 'react'
import { Context } from '../App'
import '../styles/Pop.css'

function AddPop() {
  const [popName, setPopName] = useState("")
  const [number, setNumber] = useState(0)
  const [series, setSeries] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false)
  const [context, updateContext] = useContext(Context)

  async function handleSubmit(e){
    e.preventDefault()
    setFail(false)
    setSuccess(false)

    //Add pop
    await fetch("pop/" + popName + "/" + number + "/" + series + "/" + encodeURIComponent(imgUrl) + "/" + context.user.id, {method: "POST"})
    .then( response => !response.ok ? setFail("Pop could not be added") : response.json() )
    .then( data => {
      if(data){
        console.log(data)
        setSuccess("Pop added")
      }
    })
  }

  function submitButtonCheck(){
    if(popName.length <= 0) return true
    if(series.length <= 0) return true
    if(imgUrl.length <= 0) return true

    return false
  }

  return (
    <form onSubmit={e => handleSubmit(e)} autoComplete="off">
        
      <input onChange={e => setPopName(e.target.value)} type="text" id="popname" 
      placeholder='Name of pop'/>
      
      <input onChange={e => setNumber(e.target.value)} type="number" id="number" 
      placeholder='Number'/>

      <input onChange={e => setSeries(e.target.value)} type="text" id="series" 
      placeholder='Pop series'/>

      <input onChange={e => setImgUrl(e.target.value)} type="text" id="imgUrl" 
      placeholder='Image link'/>

      <div className="buttons">
        <button disabled={submitButtonCheck()} className={submitButtonCheck() ? "failed" : "passed"}>Add</button> 
      </div>

    </form>
  );
}

export default AddPop;