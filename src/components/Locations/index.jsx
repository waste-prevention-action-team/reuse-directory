import React from 'react'
import PropTypes from 'prop-types'

import Props from './props'
import Details from './Details'
import List from './List'

const Locations = ({ locations, activeWPType }) => {
    const [selectedLocationId, setSelectedLocationId] = React.useState(null)
    const selectedLocation = selectedLocationId && locations.find(location => location.Id === selectedLocationId)
    return (
        selectedLocation ?
            <Details
                location={selectedLocation}
                onBack={() => setSelectedLocationId(null)}
            /> :
            <List
                locations={locations}
                activeWPType={activeWPType}
                onSelectLocation={setSelectedLocationId}
            />
    )
}

Locations.propTypes = {
    locations: PropTypes.arrayOf(Props.Location).isRequired,
    activeWPType: PropTypes.string.isRequired
}

export default Locations
