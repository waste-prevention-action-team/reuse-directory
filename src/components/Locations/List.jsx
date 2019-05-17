import React from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../semantic'
import { MapContext } from '../Map'
import Props from './props'

const List = ({ locations, activeWPType, onSelectLocation }) => (
    <MapContext.Consumer>
        {(map) => {
            map.updateLocationsListMarkers(locations)
            return (
                locations.length ?
                    locations
                        .sort((location1, location2) => location1.Location > location2.Location)
                        .map(({
                            Id, Name, Hours, Notes
                        }) => (
                            <Card
                                key={Id}
                                href="#"
                                header={Name}
                                meta={Hours}
                                description={Notes}
                                onClick={() => onSelectLocation(Id)}
                            />
                        )) :
                    <div>
                        <p>
                            We do not have a place in our database for the selected item and category
                            (<i>{activeWPType}</i>).
                        </p>
                        <p>You can try another waste prevention category from the above menu.</p>
                    </div>
            )
        }}
    </MapContext.Consumer>
)

List.propTypes = {
    locations: PropTypes.arrayOf(Props.Location).isRequired,
    activeWPType: PropTypes.string.isRequired,
    onSelectLocation: PropTypes.func.isRequired
}

export default List
