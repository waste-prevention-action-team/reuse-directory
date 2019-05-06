import React from 'react'

import { Grid } from '../../semantic'
import setUpMap, { MapContext } from '../Map'
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
            this.map = setUpMap()
            this.setState({ hasMap: true })
        }
    }

    render() {
        const { hasMap } = this.state
        return (
            <Grid id="Content">
                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={4}>
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
