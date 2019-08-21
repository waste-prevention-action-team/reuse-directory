import React from 'react'

import {
    Grid, Menu, Responsive
} from '../semantic'
import Map, { MapContext } from './Map'
import Items from './Items'
import Resources from './Resources'
import { SheetContext } from './Sheet'

const MOBILE_WIDTH = 1350

class Content extends React.Component {
    static contextType = SheetContext

    state = {
        hasMap: false,
        screenWidth: null,
        activeTab: 'search'
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

    handleTabChange = (e, { name }) => this.setState({ activeTab: name })

    renderContent = () => {
        const { activeTab } = this.state
        let tabContent
        switch (activeTab) {
            case 'repair':
                tabContent = <Items items={this.context.get('items').toJS()} categories={['Repair']} />
                break
            case 'resources':
                tabContent = <Resources />
                break
            case 'search':
            default:
                tabContent = <Items items={this.context.get('items').toJS()} />
        }
        return (
            <>
                <Menu widths={3} secondary pointing>
                    <Menu.Item
                        name="search"
                        active={activeTab === 'search'}
                        onClick={this.handleTabChange}
                    />
                    <Menu.Item
                        name="repair"
                        active={activeTab === 'repair'}
                        onClick={this.handleTabChange}
                    />
                    <Menu.Item
                        name="resources"
                        active={activeTab === 'resources'}
                        onClick={this.handleTabChange}
                    />
                </Menu>
                <div id="TabContent">
                    {tabContent}
                </div>
            </>
        )
    }

    render() {
        const { hasMap } = this.state
        return (
            <>
                <Responsive
                    as={Grid}
                    id="Content"
                    minWidth={MOBILE_WIDTH + 1}
                    fireOnMount
                    onUpdate={this.handleWidthUpdate}
                >
                    <Grid.Row style={{ padding: 0, height: '100%' }}>
                        <Grid.Column width={5} style={{ height: '100%', overflowY: 'auto' }}>
                            <MapContext.Provider value={this.map}>
                                {hasMap ?
                                    <Grid style={{ height: '100%', margin: 0 }}>
                                        <Grid.Row columns={1} style={{ height: 'calc(100% - 50px)' }}>
                                            <Grid.Column style={{ height: '100%' }}>
                                                {this.renderContent()}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid> :
                                    null}
                            </MapContext.Provider>
                        </Grid.Column>
                        <Grid.Column
                            id="Map"
                            className="no-padding no-margin"
                            width={11}
                        />
                    </Grid.Row>
                </Responsive>
                <Responsive
                    as={Grid}
                    id="Content"
                    className="mobile"
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
                                {hasMap ? this.renderContent() : null}
                            </MapContext.Provider>
                        </Grid.Column>
                    </Grid.Row>
                </Responsive>
            </>
        )
    }
}

export default Content
