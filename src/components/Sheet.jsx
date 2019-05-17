import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import CONFIG from '../config'

const SHEET_SCHEMA = CONFIG.google_sheet_schema

export const SheetContext = React.createContext({})

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
            wpTypes: [],
            itemTypes: [],
            itemCategories: [],
            items: [],
            locations: [],
            relations: []
        }
    }

    componentDidMount() {
        const ranges = Object
            .values(SHEET_SCHEMA)
            .reduce((rangeQuery, { sheetName, columns }) => `${rangeQuery}&ranges='${sheetName}'!${columns}`, '')
        axios
            .get(
                encodeURI(
                    `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.google_sheet_id}/?key=${CONFIG.google_sheet_api_key}&fields=sheets(data.rowData.values(effectiveValue))${ranges}`
                )
            )
            .then(response => this.processSheets(response.data.sheets))
            .catch((error) => {
                console.error(error)
                this.setState({ dataStatus: 'error' })
            })
    }

    processSheets = (sheets) => {
        const allCategories = sheets[SHEET_SCHEMA.categories.sheetIndex].data[0].rowData
        const categoriesHeaders = ['wpTypes', 'itemTypes', 'itemCategories']
        for (let i = 1; i < allCategories.length; i += 1) {
            categoriesHeaders.forEach((header, idx) => {
                const a = allCategories[i].values[idx].effectiveValue
                if (a) {
                    this.data[header].push(a.stringValue)
                }
            })
        }

        const sheetNames = ['items', 'locations', 'relations']
        sheetNames.forEach((sheetName) => {
            const sheetConfig = SHEET_SCHEMA[sheetName]
            const sheetData = sheets[sheetConfig.sheetIndex].data[0].rowData
            const sheetAttrs = sheetData
                .shift()
                .values
                .map(attr => attr.effectiveValue.stringValue)
            this.data[sheetName] = sheetData
                .filter(({ values }) => values)
                .map(({ values }) => values.reduce(
                    (mappedAttrs, value, idx) => {
                        const attrName = sheetAttrs[idx]
                        const attrValue = value.effectiveValue ?
                            value.effectiveValue.stringValue || value.effectiveValue.numberValue :
                            null
                        mappedAttrs[attrName] = attrValue
                        if (sheetConfig.searchableColumns.indexOf(idx) > -1 && attrValue) {
                            mappedAttrs.searchText += `${attrValue.toString().toLowerCase()} `
                        }
                        return mappedAttrs
                    },
                    {
                        searchText: ''
                    }
                ))
        })

        this.setState({ dataStatus: 'done' })
    }

    render() {
        const { dataStatus } = this.state
        if (dataStatus === 'done') {
            return (
                <SheetContext.Provider value={this.data}>
                    {this.props.children}
                </SheetContext.Provider>
            )
        }
        if (dataStatus === 'pending') {
            return 'Loading Data...'
        }
        return 'Error!'
    }
}

export default Sheet
