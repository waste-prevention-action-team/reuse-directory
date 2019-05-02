import React from 'react'

import { Grid } from '../../semantic'
import Map from '../Map'
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
            this.map = Map.setUp()
            this.setState({ hasMap: true })
        }
    }

    render() {
        return (
            <Grid id="Content">
                <Grid.Row style={{ padding: 0 }}>
                    <Grid.Column width={4}>
                        <Map.Context.Provider value={this.map}>
                            <Sidebar />
                        </Map.Context.Provider>
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
