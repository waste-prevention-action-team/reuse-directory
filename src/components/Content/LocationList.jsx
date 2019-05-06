import React from 'react'
import L from 'leaflet'
import PropTypes from 'prop-types'

import { Card } from '../../semantic'
import { MapContext } from '../Map'

const LocationList = ({ locations, searchTerm }) => (
    <MapContext.Consumer>
        {map => (
            locations
                .filter(location => location.Categories && location.Name.indexOf(searchTerm) >= 0)
                .map(({
                    Id, Name, Categories, Latitude, Longitude
                }) => {
                    L.marker([Latitude, Longitude]).addTo(map)
                    return (
                        <Card
                            key={Id}
                            href="#"
                            header={Name}
                            meta={Categories.split(',').map(c => <span key={c}>{c}</span>)}
                            description="Test"
                        />
                    )
                })
        )}
    </MapContext.Consumer>
)

LocationList.propTypes = {
    locationCategory: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
        Name: PropTypes.string,
        Categories: PropTypes.string,
        Latitude: PropTypes.number,
        Longitude: PropTypes.number
    })).isRequired,
    searchTerm: PropTypes.string.isRequired
}

export default LocationList
