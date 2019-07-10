import React from 'react'
import PropTypes from 'prop-types'

import { SheetContext } from '../Sheet'
import { Card, Icon } from '../../semantic'
import CONFIG from '../../config'
import { MapContext } from '../Map'

const Locations = ({ itemId, locations }) => (
    <SheetContext.Consumer>
        {(data) => {
            const wpTypes = data.get('wpTypes').toJS()
            const relations = data.get('relations').toJS()
            const annotatedLocations = []
            locations.forEach((location) => {
                const annotatedLocation = { ...location }
                const itemLocation = relations.find(
                    relation => relation.Item === itemId && relation.Location === annotatedLocation.Id
                )
                annotatedLocation.wpTypes = wpTypes.reduce(
                    (itemLocationWPTypes, wpType) => {
                        if (itemLocation[wpType] === 'y') {
                            itemLocationWPTypes.push(wpType)
                        }
                        return itemLocationWPTypes
                    },
                    []
                )
                annotatedLocations.push(annotatedLocation)
            })
            return (
                <MapContext.Consumer>
                    {(map) => {
                        map.markersLayer.clearLayers()
                        if (!annotatedLocations.length) {
                            return (
                                <div>
                                    <p>You can try another waste prevention category from the above menu.</p>
                                </div>
                            )
                        }
                        const renderedLocations = annotatedLocations
                            .sort((location1, location2) => (
                                (location1.Name && location1.Name.localeCompare(location2.Name)) || 0
                            ))
                            .map((location) => {
                                const marker = map.addLocationMaker(location)
                                return (
                                    <Card
                                        key={location.Id}
                                        href="#"
                                        fluid
                                        onClick={() => marker && marker.openPopup()}
                                        onMouseOver={() => marker && marker.setIcon(map.getMarkerIcon('green'))}
                                        onMouseOut={() => marker && marker.setIcon(map.getMarkerIcon('gold'))}
                                    >
                                        <Card.Content>
                                            <Card.Header>
                                                {location.Name}
                                            </Card.Header>
                                            <Card.Meta>
                                                <div>{location.Hours}</div>
                                                <div>{location.Address}</div>
                                                <div>{location.Phone}</div>
                                                <div>{location.Email}</div>
                                            </Card.Meta>
                                            <Card.Description>
                                                {location.Notes}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra textAlign="right">
                                            {location.wpTypes.map(wpType => (
                                                <Icon
                                                    key={wpType}
                                                    {...CONFIG.icons[wpType]}
                                                    circular
                                                    inverted
                                                    title={wpType}
                                                />
                                            ))}
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        map.zoomToMarkersBound()
                        return renderedLocations
                    }}
                </MapContext.Consumer>
            )
        }}
    </SheetContext.Consumer>
)

Locations.propTypes = {
    itemId: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
        Id: PropTypes.string,
        Name: PropTypes.string,
        Address: PropTypes.string,
        Phone: PropTypes.string,
        Email: PropTypes.string,
        Hours: PropTypes.string,
        Notes: PropTypes.string,
        LatLng: PropTypes.string
    })).isRequired
}

export default Locations
