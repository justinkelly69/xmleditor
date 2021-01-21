import React, { Component } from 'react'
import './App.css'
import allXml from './data/allxml'
import Main from './lib/jsx/Main'

class App extends Component {
    render() {
        return (
                <Main xml={allXml['waffle']} />
        )
    }
}

export default App
