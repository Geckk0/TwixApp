import React, { createContext, useState } from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import Intro from './components/Intro';
import DevLog from './components/DevLog';
import Twix from './components/Twix';
import Pops from './components/Pops';
import Connect from './components/Connect';


import './custom.css'

export const Context = createContext()

function App() {
  
  const [contextVal, setContext] = useState({
    user: {
      id: 0,
      pops: []
    }
  })

  function updateContext(updates) {
    setContext({
      ...contextVal,
      ...updates
    })
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Layout>
        <Route path='/About' component={DevLog} />
        <Route path='/Twix' component={Twix} />
        <Route path='/Pops' component={Pops} />
        <Route path='/Connect' component={Connect} />
        <Route exact path='/' component={Intro} />
      </Layout>
    </Context.Provider>
  );
}
export default App