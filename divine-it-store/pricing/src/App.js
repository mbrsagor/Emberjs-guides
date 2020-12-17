import React from 'react';

import CompositePricingEngine from './components/Engine/CompositePricingEngine'
import Alert from 'react-bootstrap/Alert';
import {connect} from "unistore/react";
import {actions} from "./core/store";

import './App.css';

function App(props) {
    const mainClasses = "App pricingApp " + (props.isFullScreen ? "fullscreen" : "");
  return (
      <div className={mainClasses}>
        <header className="App-header">

        </header>


        <div className="container">
          <CompositePricingEngine />
        </div>
      </div>
  );
}

export default connect(['isFullScreen'], actions)(App);
