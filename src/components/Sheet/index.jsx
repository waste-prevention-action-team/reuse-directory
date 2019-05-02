import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import CONFIG from '../../config'
import Context from './Context'

class Sheet extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            dataStatus: 'pending'
        }

        this.data = {}
    }

    componentDidMount() {
        axios
            .get(`https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.google_sheet_id}/?key=${CONFIG.google_sheet_api_key}&includeGridData=1`)
            .then((response) => {
                this.data = response.data.sheets
                this.setState({ dataStatus: 'done' })
            })
            .catch(() => {
                this.setState({ dataStatus: 'error' })
            })
    }

    render() {
        const { dataStatus } = this.state
        if (dataStatus === 'done') {
            return (
                <Context.Provider value={this.data}>
                    {this.props.children}
                </Context.Provider>
            )
        }
        if (dataStatus === 'pending') {
            return 'Loading Data...'
        }
        return 'Error!'
    }
}

export default Sheet
