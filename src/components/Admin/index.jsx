import React from 'react'
import { List as ImmutableList } from 'immutable'

import CONFIG from '../../config'
import {
    Button,
    Segment,
    Tab,
    Table
} from '../../semantic'
import { SheetContext } from '../Sheet'
import RowForm from './RowForm'

const SHEET_SCHEMA = CONFIG.google_sheet_schema

class Admin extends React.Component {
    static contextType = SheetContext

    constructor(props, context) {
        super(props, context)

        this.state = {
            isAuthScriptReady: false,
            isSignedIn: false,
            signInError: null,
            data: context.get('raw')
        }
    }

    componentDidMount() {
        this.gapi = window.gapi
        this.gapi.load('client:auth2', () => {
            this.gapi.client.init({
                apiKey: CONFIG.google_api_key,
                clientId: CONFIG.google_oauth_client_id,
                discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
                scope: 'https://www.googleapis.com/auth/drive.file'
            }).then(
                () => { this.setState({ isAuthScriptReady: true }) },
                console.error
            )
        })
    }

    signIn = () => {
        this.gapi.auth2.getAuthInstance()
            .signIn()
            .then((response) => {
                if (CONFIG.admin_users.includes(response.getBasicProfile().getEmail())) {
                    this.setState({
                        isSignedIn: true
                    })
                } else {
                    this.setState(({ signInError: 'Not Permitted' }))
                }
            })
            .catch(() => this.setState({ signInError: 'Error!' }))
    }

    getRange = (columns, rowId) => columns.split(':').map(c => `${c}${rowId}`).join(':')

    handleAdd = (sheetConfig, data, successCallback) => {
        const newEntryWithId = data.set(   // assign an id to the new row
            0,
            (parseInt(
                this.state.data
                    .find(
                        d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
                    )
                    .get('values')
                    .skip(1)
                    .filter(v => parseInt(v.get(0), 10))
                    .maxBy(v => parseInt(v.get(0), 10))
                    .get(0),
                10
            ) + 1).toString()
        )
        this.gapi.client.sheets.spreadsheets.values
            .append(
                {
                    spreadsheetId: CONFIG.google_sheet_id,
                    range: sheetConfig.sheetName,
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        values: [newEntryWithId.toJS()]
                    }
                }
            )
            .then(() => {
                this.setState(
                    (state) => {
                        state.data = state.data.updateIn(
                            [
                                state.data.findIndex(
                                    d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
                                ),
                                'values'
                            ],
                            values => values.push(newEntryWithId)
                        )
                        return state
                    },
                    successCallback
                )
            })
            .catch(console.error)
    }

    handleUpdate = (sheetConfig, data) => {
        const rowId = this.state.data
            .find(
                d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
            )
            .get('values')
            .findIndex(value => value.get(0) === data.get(0))
        this.gapi.client.sheets.spreadsheets.values
            .update(
                {
                    spreadsheetId: CONFIG.google_sheet_id,
                    range: `${sheetConfig.sheetName}!${this.getRange(sheetConfig.columns, rowId + 1)}`,
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        values: [data.toJS()]
                    }
                }
            )
            .then(() => {
                this.setState((state) => {
                    state.data = state.data.setIn(
                        [
                            state.data.findIndex(
                                d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
                            ),
                            'values',
                            rowId
                        ],
                        data
                    )
                    return state
                })
            })
            .catch(console.error)
    }

    handleDelete = (sheetConfig, entryId) => {
        const rowIdx = this.state.data
            .find(
                d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
            )
            .get('values')
            .findIndex(value => value.get(0) === entryId)

        const ranges = [`${sheetConfig.sheetName}!${this.getRange(sheetConfig.columns, rowIdx + 1)}`]

        const relationsSchema = CONFIG.google_sheet_schema.relations
        const removedRelationsIndices = []
        this.state.data
            .find(
                d => d.get('range').indexOf(relationsSchema.sheetName) >= 0
            )
            .get('values')
            .valueSeq()
            .forEach((v, idx) => {
                if (v.get(relationsSchema.fk_maps[sheetConfig.sheetName]) === entryId) {
                    ranges.push(`${relationsSchema.sheetName}!${this.getRange(relationsSchema.columns, idx + 1)}`)
                    removedRelationsIndices.push(idx)
                }
            })

        this.gapi.client.sheets.spreadsheets.values
            .batchClear(
                {
                    spreadsheetId: CONFIG.google_sheet_id,
                    ranges
                }
            )
            .then(() => {
                this.setState((state) => {
                    const sheetIdx = state.data.findIndex(
                        d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
                    )
                    state.data = removedRelationsIndices
                        .reduce(
                            (updatedData, idx) => (
                                updatedData.setIn(
                                    [relationsSchema.sheetIndex, 'values', idx],
                                    ImmutableList().setSize(state.data.getIn([relationsSchema.sheetIndex, 'values', 0]).count())
                                )
                            ),
                            state.data
                                .setIn(
                                    [
                                        sheetIdx,
                                        'values',
                                        rowIdx
                                    ],
                                    ImmutableList().setSize(state.data.getIn([sheetIdx, 'values', 0]).count())
                                )
                                .updateIn(
                                    [sheetIdx, 'values'],
                                    values => values.slice(0, values.findLastIndex(v => v.get(0)) + 1)
                                )
                        )
                        .updateIn(
                            [relationsSchema.sheetIndex, 'values'],
                            values => values.slice(0, values.findLastIndex(v => v.get(0)) + 1)
                        )
                    return state
                })
            })
            .catch(console.error)
    }

    renderItems = () => {
        const itemCategories = this.context.get('itemCategories').toJS()

        const categoryOptions = itemCategories.map(category => ({
            key: category,
            value: category,
            text: category
        }))

        const sheetConfig = SHEET_SCHEMA.items

        const items = this.state.data
            .find(
                d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
            )
            .get('values')
            .filter(row => row.get(0))
        const columns = items.get(0)
        const columnsLength = columns.count()

        const now = new Date()
        const columnsInputTypes = {
            Category: {
                type: 'select',
                extraProps: { options: categoryOptions }
            },
            Description: { type: 'textarea' },
            Updated: { type: 'hidden', formula: `=DATE(${now.getFullYear()}, ${now.getMonth() + 1}, ${now.getDate()})` }
        }

        return (
            <Table basic compact size="small">
                <Table.Header>
                    <Table.Row>
                        {columns.map(header => (
                            <Table.HeaderCell
                                key={header}
                                style={{
                                    display: columnsInputTypes[header] && columnsInputTypes[header].type === 'hidden' ?
                                        'none' : ''
                                }}
                            >
                                {header}
                            </Table.HeaderCell>
                        ))}
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items
                        .skip(1)
                        .push(ImmutableList().setSize(columnsLength))
                        .map(item => (
                            <RowForm
                                key={`items_${item.get(0) || 'new'}`}
                                columns={columns}
                                initialData={item.setSize(columnsLength)}
                                columnsInputTypes={columnsInputTypes}
                                handleAdd={
                                    (data, successCallback) => this.handleAdd(sheetConfig, data, successCallback)
                                }
                                handleUpdate={data => this.handleUpdate(sheetConfig, data)}
                                handleDelete={itemId => this.handleDelete(sheetConfig, itemId)}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        )
    }

    renderLocations = () => {
        const sheetConfig = SHEET_SCHEMA.locations

        const locations = this.state.data
            .find(
                d => d.get('range').indexOf(sheetConfig.sheetName) >= 0
            )
            .get('values')
            .filter(row => row.get(0))
        const columns = locations.get(0)
        const columnsLength = columns.count()

        const now = new Date()
        const columnsInputTypes = {
            Address: { type: 'textarea' },
            Notes: { type: 'textarea' },
            LatLng: { type: 'hidden', formula: '=IFERROR(GEOCODE_GOOGLE(INDIRECT(CONCAT("C", ROW()))))' },
            Updated: { type: 'hidden', formula: `=DATE(${now.getFullYear()}, ${now.getMonth() + 1}, ${now.getDate()})` }
        }

        return (
            <Table basic compact size="small">
                <Table.Header>
                    <Table.Row>
                        {columns.map(header => (
                            <Table.HeaderCell
                                key={header}
                                style={{
                                    display: columnsInputTypes[header] && columnsInputTypes[header].type === 'hidden' ?
                                        'none' : ''
                                }}
                            >
                                {header}
                            </Table.HeaderCell>
                        ))}
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {locations
                        .skip(1)
                        .push(ImmutableList().setSize(columnsLength))
                        .map(location => (
                            <RowForm
                                key={`locations_${location.get(0) || 'new'}`}
                                columns={columns}
                                initialData={location.setSize(columnsLength)}
                                columnsInputTypes={columnsInputTypes}
                                handleAdd={
                                    (data, successCallback) => this.handleAdd(sheetConfig, data, successCallback)
                                }
                                handleUpdate={data => this.handleUpdate(sheetConfig, data)}
                                handleDelete={itemId => this.handleDelete(sheetConfig, itemId)}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        )
    }

    render() {
        const { isAuthScriptReady, isSignedIn, signInError } = this.state
        return (
            <div>
                <Button content="Close" onClick={() => window.location.reload()} />
                {
                    isSignedIn ?
                        <Segment basic>
                            <Tab
                                panes={[
                                    {
                                        menuItem: 'Items',
                                        render: () => <Tab.Pane>{this.renderItems()}</Tab.Pane>
                                    },
                                    {
                                        menuItem: 'Locations',
                                        render: () => <Tab.Pane>{this.renderLocations()}</Tab.Pane>
                                    }
                                ]}
                            />
                        </Segment> :
                        (
                            signInError ?
                                'Error signing in. Make sure you have the right permissions.' :
                                <Button
                                    primary
                                    disabled={!isAuthScriptReady}
                                    content="Sign In"
                                    icon="google"
                                    onClick={this.signIn}
                                />
                        )
                }
            </div>
        )
    }
}

export default Admin
