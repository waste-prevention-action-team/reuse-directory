import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import CONFIG from './config'
import App from './components/App'

import './style/base.less'

if (CONFIG.google_analytics_key) {
    ReactGA.initialize(CONFIG.google_analytics_key)
}

ReactDOM.render(
    <App />,
    document.getElementById('App')
)
