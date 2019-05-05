import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import CONFIG from '../../config'
import FIXTURES from '../../fixtures'
import Context from './Context'

const SHEET_SCHEMA = CONFIG.google_sheet_schema

class Sheet extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            dataStatus: 'pending'
        }

        this.data = {
            locationCategories: []
        }
    }

    componentDidMount() {
        // this.processSheets(FIXTURES)
        const ranges = Object.values(SHEET_SCHEMA).reduce((rangeQuery, { sheetName, columns }) => `${rangeQuery}&ranges='${sheetName}'!${columns}`, '')
        axios
            .get(
                encodeURI(
                    `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.google_sheet_id}/?key=${CONFIG.google_sheet_api_key}&fields=sheets(data.rowData.values(effectiveValue.stringValue))${ranges}`
                )
            )
            .then(response => this.processSheets(response.data.sheets))
            .catch(console.error)
    }

    processSheets = (sheets) => {
        const locationCategories = sheets[SHEET_SCHEMA.locationCategories.sheetIndex].data[0].rowData
        for (let i = 1; i < locationCategories.length; i += 1) {
            this.data.locationCategories.push(
                locationCategories[i].values[0].effectiveValue.stringValue
            )
        }
        this.setState({ dataStatus: 'done' })
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
