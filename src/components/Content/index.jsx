import React from 'react'

import { Grid } from '../../semantic'
import LeafletMap, { MapContext } from '../Map'
import Sidebar from './Sidebar'

class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasMap: false
        }
    }

    componentDidMount() {
        if (!this.state.hasMap) {
            this.map = new LeafletMap()
            this.setState({ hasMap: true })
        }
    }

    render() {
        const { hasMap } = this.state
        return (
            <Grid id="Content">
                <Grid.Row style={{ padding: 0, height: '100%' }}>
                    <Grid.Column width={4} style={{ height: '100%', overflowY: 'auto' }}>
                        <MapContext.Provider value={this.map}>
                            {hasMap ? <Sidebar /> : null}
                        </MapContext.Provider>
                    </Grid.Column>
                    <Grid.Column
                        id="Map"
                        className="no-padding no-margin"
                        width={12}
                    />
                </Grid.Row>
            </Grid>
        )
    }
}

export default Content
