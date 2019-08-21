import React from 'react'
import PropTypes from 'prop-types'

import { SheetContext } from '../Sheet'
import { Button, Card, Icon } from '../../semantic'
import CONFIG from '../../config'
import { MapContext } from '../Map'
import analytics from '../../utils/analytics'

const Locations = ({ itemId, locations }) => (
    <SheetContext.Consumer>
        {(data) => {
            const topElement = React.createRef()
            const wpTypes = data.get('wpTypes').toJS()
            const relations = data.get('relations').toJS()
            const annotatedLocations = []
            locations.forEach((location) => {
                const annotatedLocation = { ...location }
                const itemLocation = relations.find(
                    (relation) => relation.Item === itemId && relation.Location === annotatedLocation.Id
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
                                    <p>There is no place that accepts your selected item.</p>
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
                                        as="div"
                                        key={location.Id}
                                        fluid
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            analytics('location', location.Location)
                                            marker && marker.openPopup()
                                        }}
                                        onMouseOver={() => marker && marker.setIcon(map.getMarkerIcon('green'))}
                                        onMouseOut={() => marker && marker.setIcon(map.getMarkerIcon('gold'))}
                                    >
                                        <Card.Content>
                                            <Card.Header>
                                                {location.Location}
                                            </Card.Header>
                                            <Card.Meta>
                                                {
                                                    location.Address ?
                                                        <div><b>Address: </b>{location.Address}</div> :
                                                        null
                                                }
                                                {location.Phone ? <div><b>Phone: </b>{location.Phone}</div> : null}
                                                {location.Website ? <div><b>Website: </b><a href={location.Website} target="blank">{location.Website}</a></div> : null}
                                                {location.Email ? <div><b>Email: </b>{location.Email}</div> : null}
                                                {location.Hours ? <div><b>Hours: </b>{location.Hours}</div> : null}
                                            </Card.Meta>
                                            <Card.Description>
                                                {location.Notes}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra textAlign="right">
                                            {location.wpTypes.map((wpType) => (
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
                        return (
                            <>
                                <Card.Group>
                                    <div ref={topElement} />
                                    {renderedLocations}
                                </Card.Group>
                                <Button
                                    className="scrollUp"
                                    circular
                                    primary
                                    icon="arrow up"
                                    onClick={() => topElement.current.scrollIntoView()}
                                />
                            </>
                        )
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
