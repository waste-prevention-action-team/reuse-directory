import React from 'react'
import { fromJS } from 'immutable'
import PropTypes from 'prop-types'

import CONFIG from '../config'
import { loadScript } from '../utils'

const SHEET_SCHEMA = CONFIG.google_sheet_schema

export const SheetContext = React.createContext({})

class Sheet extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    state = {
        dataStatus: 'pending'
    }

    constructor(props) {
        super(props)

        this.data = {
            raw: null,
            wpTypes: [
                'Reuse',
                'Recycle',
                'Repair',
                'Hazardous'
            ],
            itemTypes: [],
            itemCategories: [],
            items: [],
            locations: [],
            locationCategories: [],
            relations: []
        }
    }

    componentDidMount() {
        loadScript(
            'https://apis.google.com/js/api.js',
            () => {
                this.gapi = window.gapi
                this.gapi.load('client', () => {
                    this.gapi.client.init({
                        apiKey: CONFIG.google_api_key,
                        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
                    }).then(
                        () => {
                            this.gapi.client.sheets.spreadsheets.values.batchGet({
                                spreadsheetId: CONFIG.google_sheet_id,
                                ranges: Object.values(CONFIG.google_sheet_schema).map(
                                    (sheetConfig) => `${sheetConfig.sheetName}!${sheetConfig.columns}`
                                )
                            }).then((response) => {
                                this.data.raw = response.result.valueRanges
                                this.processSheets()
                            })
                        },
                        console.error
                    )
                })
            }
        )
    }

    processSheets = () => {
        const allCategories = this.data.raw.find(
            ({ range }) => range.indexOf(SHEET_SCHEMA.categories.sheetName) >= 0
        ).values
        const categoriesHeaders = ['itemCategories', 'locationCategories']

        // start from second row (idx === 1), first row only contains headers
        for (let i = 1; i < allCategories.length; i += 1) {
            categoriesHeaders.forEach((header, idx) => {
                const category = allCategories[i][idx]
                this.data[header].push(category)
            })
        }

        const sheetNames = ['items', 'locations', 'relations']
        sheetNames.forEach((sheetName) => {
            const sheetConfig = SHEET_SCHEMA[sheetName]
            const sheetData = this.data.raw.find(({ range }) => range.indexOf(sheetConfig.sheetName) >= 0).values
            const sheetColumns = sheetData[0]
            this.data[sheetName] = sheetData
                .slice(1)
                .map((values) => values.reduce(
                    (mappedColumns, value, idx) => {
                        mappedColumns[sheetColumns[idx]] = value
                        if (sheetConfig.searchableColumns.indexOf(idx) > -1 && value) {
                            mappedColumns.searchText += `${value.toString().toLowerCase()} `
                        }
                        return mappedColumns
                    },
                    {
                        searchText: ''
                    }
                ))
            const sortByColumn = sheetConfig.sortByColumn >= 0 && sheetColumns[sheetConfig.sortByColumn]
            if (sortByColumn) {
                this.data[sheetName].sort(
                    (v1, v2) => v1[sortByColumn] && v1[sortByColumn].localeCompare(v2[sortByColumn])
                )
            }
        })

        this.data.locations.forEach((location) => {
            const locationAllCategories = new Set()
            const relations = this.data.relations.filter(
                (relation) => relation.Location === location.Id
            )
            // eslint-disable-next-line no-restricted-syntax
            for (const relation of relations) {
                // eslint-disable-next-line no-restricted-syntax
                for (const category of this.data.wpTypes) {
                    if (relation[category] === 'y') {
                        locationAllCategories.add(category)
                    }
                }
                if (locationAllCategories.length === this.data.wpTypes.length) {
                    break
                }
            }
            location.allCategories = Array.from(locationAllCategories)
        })

        this.setState({ dataStatus: 'done' })
    }

    render() {
        const { dataStatus } = this.state
        if (dataStatus === 'done') {
            return (
                <SheetContext.Provider value={fromJS(this.data)}>
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
