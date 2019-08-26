import React from 'react'

import {
    Grid,
    Menu,
    Responsive
} from '../semantic'
import Map, { MapContext } from './Map'
import Header from './Header'
import Items from './Items'
import Category from './Items/Category'
import Repair from './Items/Repair'
import Resources from './Resources'
import { SheetContext } from './Sheet'

const MOBILE_WIDTH = 1350

class Content extends React.Component {
    static contextType = SheetContext

    state = {
        hasMap: false,
        screenWidth: null,
        activeTab: 'search_item'
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
            case 'search_category':
                tabContent = <Category />
                break
            case 'repair':
                tabContent = <Repair />
                break
            case 'resources':
                tabContent = <Resources />
                break
            case 'search_item':
            default:
                tabContent = <Items items={this.context.get('items').toJS()} />
        }
        return (
            <>
                <Menu id="TabsMenu" widths={4} secondary pointing size="tiny">
                    <Menu.Item
                        name="search_item"
                        active={activeTab === 'search_item'}
                        content="Search by Item"
                        onClick={this.handleTabChange}
                    />
                    <Menu.Item
                        name="search_category"
                        active={activeTab === 'search_category'}
                        content="Search by Category"
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
                    as={React.Fragment}
                    minWidth={MOBILE_WIDTH + 1}
                    fireOnMount
                    onUpdate={this.handleWidthUpdate}
                >
                    <Header />
                    <Grid id="Content" className="no-padding">
                        <Grid.Column id="Sidebar" width={5}>
                            {hasMap && this.renderContent()}
                        </Grid.Column>
                        <Grid.Column id="MapColumn" className="no-padding no-margin" width={11}>
                            <div id="Map" />
                        </Grid.Column>
                    </Grid>
                </Responsive>
                <Responsive
                    as={React.Fragment}
                    maxWidth={MOBILE_WIDTH}
                    fireOnMount
                    onUpdate={this.handleWidthUpdate}
                >
                    <Header mobile />
                    <Grid id="Content" className="no-padding mobile">
                        <Grid.Column id="MapColumn" className="no-padding no-margin" width={16}>
                            <div id="Map" />
                        </Grid.Column>
                        <Grid.Column id="Sidebar" width={16}>
                            {hasMap && this.renderContent()}
                        </Grid.Column>
                    </Grid>
                </Responsive>
            </MapContext.Provider>
        )
    }
}

export default Content
