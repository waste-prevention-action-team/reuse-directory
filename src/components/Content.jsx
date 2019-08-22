import React from 'react'

import {
    Grid,
    Menu,
    Responsive
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
                <Menu id="TabsMenu" widths={3} secondary pointing>
                    <Menu.Item
                        name="search"
                        active={activeTab === 'search'}
                        content="Search"
                        onClick={this.handleTabChange}
                    />
                    <Menu.Item
                        name="repair"
                        active={activeTab === 'repair'}
                        content="Repair"
                        onClick={this.handleTabChange}
                    />
                    <Menu.Item
                        name="resources"
                        active={activeTab === 'resources'}
                        content="Unique Reuse Opportunities"
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
            <MapContext.Provider value={this.map}>
                <Responsive
                    as={Grid}
                    id="Content"
                    className="no-padding"
                    minWidth={MOBILE_WIDTH + 1}
                    fireOnMount
                    onUpdate={this.handleWidthUpdate}
                >
                    <Grid.Column id="Sidebar" width={5}>
                        {hasMap && this.renderContent()}
                    </Grid.Column>
                    <Grid.Column id="MapColumn" className="no-padding no-margin" width={11}>
                        <div id="Map" />
                    </Grid.Column>
                </Responsive>
                <Responsive
                    as={Grid}
                    id="Content"
                    className="no-padding"
                    maxWidth={MOBILE_WIDTH}
                    fireOnMount
                    onUpdate={this.handleWidthUpdate}
                >
                    <Grid.Column id="MapColumn" className="no-padding no-margin" width={16}>
                        <div id="Map" />
                    </Grid.Column>
                    <Grid.Column id="Sidebar" width={16}>
                        {hasMap && this.renderContent()}
                    </Grid.Column>
                </Responsive>
            </MapContext.Provider>
        )
    }
}

export default Content
