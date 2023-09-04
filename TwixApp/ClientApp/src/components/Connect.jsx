import { useState, useContext } from 'react'
import { Context } from '../App'
import { useHistory } from 'react-router-dom'
import '../styles/User.css'

function Login() {
  const [context, updateContext] = useContext(Context)
  const [stage, setStage] = useState(1) //1 = sign in, 2 = register
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [fail, setFail] = useState("The server can take 3-4 minutes to wake up. Please be patient.")
  const [success, setSuccess] = useState(false)

  const history = useHistory()

  async function handleSubmit(e){
    e.preventDefault()
    setFail(false)
    setSuccess(false)

    if(stage == 1){ //Sign in user
      await fetch("user/" + username + "/" + password)
      .then( response => !response.ok ? setFail("Username or password incorrect") : response.json() )
      .then( data => {
        if(data){
          updateContext({user: data})
          history.push('/')
        }
      })
    }
    else{ //Create user
      var freeUsername = true
      
      await fetch("user/" + username)//Check if username is taken
      .then( response => {
        if(!response.ok){
          setFail("Username taken")
          freeUsername = false;
        }
      })   

      if (freeUsername){//Create our user
        
        await fetch("user/" + username + "/" + email + "/" + password, {method:  'POST'})
        .then( response => {
          if( !response.ok ){ 
            if( response.status == 400 ) setFail("All fields requireds")
            else setFail("Email already used")
          }
          else {
            setSuccess("User created")
            setStage(1)
            
            setTimeout(() => {
              setEmail("")
              document.getElementById("email").value = ""
              setRepeatPassword("")
              document.getElementById("repeatPassword").value = ""
            }, 500)
          }
        })
      } 
    }
  }

  function submitButtonCheck(){
    if(stage == 1 ){
      if(username.length == 0) return true
      if(password.length == 0) return true
    }
    else{

      if(checkUsername()) return true
      if(checkEmail()) return true
      if(checkPassword()) return true
      if(checkRepeat()) return true
    }
    return false
  }

  function checkUsername(){
    if(username.length <= 4) return true
    return false
  }

  function checkEmail(){
    if(email.length <= 5 || !email.includes("@")) return true
    return false
  }

  function checkPassword(){
    var numbers = /[1234567890]/;
    if(password.length <= 6 || !numbers.test(password)) return true
    return false
  }

  function checkRepeat(){
    if(password.length <= 5 || repeatPassword !== password) return true
    return false
  }

  return (
    <div className='signin-container'>
      <h2>{stage == 1 ? "Sign in" : "Register"} to the Twix App</h2>

      {fail && <h5 className='status-msg failed'>{fail}</h5>}
      {success && <h5 className='status-msg passed'>User created</h5>}

      <section className={stage == 2 ? "list" : "hide-input list"}>
        <li>Username and password needs to be at least 5 characters</li>
        <li>Email requires an "@"</li>
        <li>Password needs at least 1 number (0-9)</li>
        <li>Passwords need to match</li>
      </section>

      <form onSubmit={e => handleSubmit(e)} autoComplete="off">
      
        <input onChange={e => setUsername(e.target.value)} type="text" id="username" 
        placeholder='Username' className={stage != 1 && !checkUsername() ? "passed" : undefined}/>
        
        <input onChange={e => setEmail(e.target.value)} type="text" id="email" disabled={stage == 1}
        placeholder='Email' className={stage != 2 ? "hide-input" : !checkEmail() ? "passed" : undefined}/>
        
        <input onChange={e => setPassword(e.target.value)} type="password" id="password" 
        placeholder='Password' className={stage == 2 && !checkPassword() ? "passed" : undefined}/>

        <input onChange={e => setRepeatPassword(e.target.value)} type="password" id="repeatPassword"  disabled={stage == 1}
        placeholder='Repeat Password' className={stage != 2 ? "hide-input" : !checkRepeat() ? "passed" : undefined}/>

        <div className="buttons">
          <button disabled={submitButtonCheck()} className={submitButtonCheck() ? "failed" : "passed"}>{stage == 1 ? "Sign in" : "Register"}</button> 
          <p>{stage == 1 ? "Don't have an account?" : "Already have an account?"}</p>
          <button type="button" onClick={() => setStage(stage == 1 ? 2 : 1)}>{stage == 1 ? "Register" : "Sign in"}</button>
        </div>

      </form>
    </div>
  );
}

export default Login;