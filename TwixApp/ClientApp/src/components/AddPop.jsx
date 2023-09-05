import { useState, useContext } from 'react'
import { Context } from '../App'
import star from '../images/star-outline-svgrepo-com.svg'
import goldStar from '../images/star-svgrepo-com.svg'
import '../styles/Pop.css'

function AddPop({ updateList }) {
  const [popName, setPopName] = useState("")
  const [number, setNumber] = useState(0)
  const [rating, setRating] = useState(1)
  const [series, setSeries] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(false)
  const [context, updateContext] = useContext(Context)

  async function handleSubmit(e){
    e.preventDefault()
    setFail(false)
    setSuccess(false)
    setCooldown(true)

    //Add pop
    await fetch("pop/" + popName + "/" + number + "/" + series + "/" + rating + "/" + encodeURIComponent(imgUrl) + "/" + context.user.id, {method: "POST"})
    .then( response => !response.ok ? setFail("Pop could not be added") : response.json() )
    .then( data => {
      if(data){
        let newUser = context.user
        newUser.pops.push({...data, recent: true})
        newUser.pops.sort(function(a, b){return a.number - b.number})
        updateContext({user: newUser})
        setSuccess("Pop added")
        updateList("")
      }
    })
    setCooldown(false)
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

      <div className='star-container'>
        {[...Array(rating-0)].map((x, i) => <img src={goldStar} key={i}/>)}
        {[...Array(5-rating)].map((x, i) => <img src={star} key={i}/>)}

        <input onChange={e => setRating(e.target.value)} type="range" id="rating" 
        min={0} max={5} step={1} defaultValue={rating}/>
      </div>

      <div className="buttons">
        <button disabled={(submitButtonCheck() || cooldown)} className={submitButtonCheck() ? "failed" : "passed"}>Add</button> 
      </div>
        
      {fail && <h5 className='status-msg failed'>{fail}</h5>}
      {success && <h5 className='status-msg passed'>{success}</h5>}
    </form>
  );
}

export default AddPop;