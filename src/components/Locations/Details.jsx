import React from 'react'
import PropTypes from 'prop-types'

import { Button, Header } from '../../semantic'
import { MapContext } from '../Map'
import Props from './props'

const Details = ({ location, onBack }) => (
    <MapContext.Consumer>
        {(map) => {
            map.updateLocationsListMarkers([location], 'green')
            return (
                <React.Fragment>
                    <Button content="Return to all locations" icon="left chevron" onClick={onBack} />
                    <Header content={location.Name} subheader={location.Hours} />
                </React.Fragment>
            )
        }}
    </MapContext.Consumer>
)

Details.propTypes = {
    location: Props.Location.isRequired,
    onBack: PropTypes.func.isRequired
}

export default Details
