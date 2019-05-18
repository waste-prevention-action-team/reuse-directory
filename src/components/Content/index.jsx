import React from 'react'

import { Grid, Responsive } from '../../semantic'
import LeafletMap, { MapContext } from '../Map'
import WPTypeMenu from './WPTypeMenu'
import Items from '../Items'
import { SheetContext } from '../Sheet'

const MOBILE_WIDTH = 1350

class Content extends React.Component {
    state = {
        hasMap: false,
        screenWidth: null,
        activeCategoryIndex: 0
    }

    componentDidMount() {
        if (!this.state.hasMap) {
            this.map = new LeafletMap()
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
                        this.map = new LeafletMap()
                        this.setState({ hasMap: true })
                    }
                )
            }
        } else {
            this.setState({ screenWidth: width })
        }
    }

    render() {
        const { hasMap, activeCategoryIndex } = this.state
        return (
            <SheetContext.Consumer>
                {({ wpTypes, items }) => (
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
                                                <Grid.Row columns={1} style={{ height: 50 }}>
                                                    <Grid.Column>
                                                        <WPTypeMenu
                                                            categories={wpTypes}
                                                            activeCategoryIndex={activeCategoryIndex}
                                                            onCategoryChange={
                                                                categoryIdx => this.setState(
                                                                    { activeCategoryIndex: categoryIdx }
                                                                )
                                                            }
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row columns={1} style={{ height: 'calc(100% - 50px)' }}>
                                                    <Grid.Column style={{ height: '100%' }}>
                                                        <Items
                                                            items={items}
                                                            activeWPType={wpTypes[activeCategoryIndex]}
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
                            <Grid.Row columns={1} style={{ padding: 10, height: 50 }}>
                                <WPTypeMenu
                                    categories={wpTypes}
                                    activeCategoryIndex={activeCategoryIndex}
                                    onCategoryChange={
                                        categoryIdx => this.setState(
                                            { activeCategoryIndex: categoryIdx }
                                        )
                                    }
                                />
                            </Grid.Row>
                            <Grid.Row columns={1} style={{ height: 200 }}>
                                <Grid.Column>
                                    <div
                                        id="Map"
                                        className="no-padding no-margin"
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1} style={{ height: 'calc(100% - 250px)' }}>
                                <Grid.Column style={{ height: '100%' }}>
                                    <MapContext.Provider value={this.map}>
                                        {hasMap ?
                                            <Items
                                                items={items}
                                                activeWPType={wpTypes[activeCategoryIndex]}
                                            /> :
                                            null
                                        }
                                    </MapContext.Provider>
                                </Grid.Column>
                            </Grid.Row>
                        </Responsive>
                    </React.Fragment>
                )}
            </SheetContext.Consumer>
        )
    }
}

export default Content
