import React from 'react'

import { Grid, Responsive, Tab } from '../semantic'
import Map, { MapContext } from './Map'
import Items from './Items'
import { SheetContext } from './Sheet'

const MOBILE_WIDTH = 1350

class Content extends React.Component {
    state = {
        hasMap: false,
        screenWidth: null
    }

    componentDidMount() {
        if (!this.state.hasMap) {
            this.map = new Map()
            this.setState({ hasMap: true })
        }
    }

    handleWidthUpdate = (e, { width }) => {
        if (this.state.screenWidth) {
            if (
                (width > MOBILE_WIDTH && this.state.screenWidth <= MOBILE_WIDTH) ||
                (width <= MOBILE_WIDTH && this.state.screenWidth > MOBILE_WIDTH)
            ) {
                this.setState(
                    {
                        screenWidth: width,
                        hasMap: false
                    },
                    () => {
                        if (this.map) {
                            this.map.destroy()
                            delete this.map
                        }
                        this.map = new Map()
                        this.setState({ hasMap: true })
                    }
                )
            }
        } else {
            this.setState({ screenWidth: width })
        }
    }

    render() {
        const { hasMap } = this.state
        return (
            <SheetContext.Consumer>
                {(data) => {
                    const items = data.get('items').toJS()
                    return (
                        <React.Fragment>
                            <Responsive
                                as={Grid}
                                id="Content"
                                minWidth={MOBILE_WIDTH + 1}
                                fireOnMount
                                onUpdate={this.handleWidthUpdate}
                            >
                                <Grid.Row style={{ padding: 0, height: '100%' }}>
                                    <Grid.Column width={4} style={{ height: '100%' }}>
                                        <MapContext.Provider value={this.map}>
                                            {hasMap ?
                                                <Grid style={{ height: '100%', margin: 0 }}>
                                                    <Grid.Row columns={1} style={{ height: 'calc(100% - 50px)' }}>
                                                        <Grid.Column style={{ height: '100%' }}>
                                                            <Tab
                                                                panes={[
                                                                    {
                                                                        menuItem: 'What do to?',
                                                                        render: () => (
                                                                            <Tab.Pane>
                                                                                <Items items={items} />
                                                                            </Tab.Pane>
                                                                        )
                                                                    },
                                                                    {
                                                                        menuItem: 'Find Repair Locations',
                                                                        render: () => (
                                                                            <Tab.Pane>
                                                                                <Items items={items} categories={['Repair']} />
                                                                            </Tab.Pane>
                                                                        )
                                                                    },
                                                                    {
                                                                        menuItem: 'Learn more',
                                                                        render: () => (
                                                                            <Tab.Pane>
                                                                                Educational Stuff
                                                                            </Tab.Pane>
                                                                        )
                                                                    }
                                                                ]}
                                                            />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid> :
                                                null
                                            }
                                        </MapContext.Provider>
                                    </Grid.Column>
                                    <Grid.Column
                                        id="Map"
                                        className="no-padding no-margin"
                                        width={12}
                                    />
                                </Grid.Row>
                            </Responsive>
                            <Responsive
                                as={Grid}
                                id="Content"
                                maxWidth={MOBILE_WIDTH}
                                fireOnMount
                                onUpdate={this.handleWidthUpdate}
                            >
                                <Grid.Row columns={1} style={{ height: 350 }}>
                                    <Grid.Column>
                                        <div
                                            id="Map"
                                            className="no-padding no-margin"
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1} style={{ height: 'calc(100% - 400px)' }}>
                                    <Grid.Column style={{ height: '100%' }}>
                                        <MapContext.Provider value={this.map}>
                                            {hasMap ?
                                                <Tab
                                                    panes={[
                                                        {
                                                            menuItem: 'What do to?',
                                                            render: () => (
                                                                <Tab.Pane>
                                                                    <Items items={items} />
                                                                </Tab.Pane>
                                                            )
                                                        },
                                                        {
                                                            menuItem: 'Find Repair Locations',
                                                            render: () => (
                                                                <Tab.Pane>
                                                                    <Items items={items} categories={['Repair']} />
                                                                </Tab.Pane>
                                                            )
                                                        },
                                                        {
                                                            menuItem: 'Learn more',
                                                            render: () => (
                                                                <Tab.Pane>
                                                                    Educational Stuff
                                                                </Tab.Pane>
                                                            )
                                                        }
                                                    ]}
                                                /> :
                                                null
                                            }
                                        </MapContext.Provider>
                                    </Grid.Column>
                                </Grid.Row>
                            </Responsive>
                        </React.Fragment>
                    )
                }}
            </SheetContext.Consumer>
        )
    }
}

export default Content
