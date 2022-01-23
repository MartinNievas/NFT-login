import React, { Component, useState, useCallback, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Navbar from './Components/Navbar'
import Metaverse from './Components/Metaverse'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route 
        {...props} 
        render={props => (
		// This should be auth with the NFT
          true ?
            <Component {...props} /> :
            <Redirect to='/' />
        )} 
      />
    )
  }
}


const App = () => {
  return (
    <>
		<Navbar />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<ProtectedRoute exact path="/metaverse" component={Metaverse} />
			<Redirect to="/" />
		</Switch>
    </>
  )
}

export default App
