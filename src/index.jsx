import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'

import CONFIG from './config'
import App from './components/App'

import './style/base.less'

if (process.env.NODE_ENV === '"production"' && CONFIG.sentry_key) {
    Sentry.init({ dsn: CONFIG.sentry_key })
}

ReactDOM.render(
    <App />,
    document.getElementById('App')
)
