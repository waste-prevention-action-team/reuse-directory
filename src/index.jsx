import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Sentry from '@sentry/browser'

import CONFIG from './config'
import App from './components/App'

import './style/base.less'

if (CONFIG.google_analytics_key) {
    ReactGA.initialize(CONFIG.google_analytics_key)
    ReactGA.pageview(window.location.pathname + window.location.search)
}

if (CONFIG.sentry_key) {
    Sentry.init({ dsn: CONFIG.sentry_key })
}

ReactDOM.render(
    <App />,
    document.getElementById('App')
)
