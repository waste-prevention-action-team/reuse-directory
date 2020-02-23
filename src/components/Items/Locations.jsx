import React from 'react'
import PropTypes from 'prop-types'

import { SheetContext } from '../Sheet'
import {
    Card, Header, Icon, Label, List, Modal
} from '../../semantic'
import CONFIG from '../../config'
import { MapContext } from '../Map'

const renderItems = (relations, items) => {
    const filteredItems = {}
    const missingItems = []
    relations.forEach((relation) => {
        const relationItem = items.find((item) => item.get('Id') === relation.get('Item'))
        if (relationItem) {
            const itemName = relationItem.get('Item')
            if (!filteredItems[itemName]) {
                filteredItems[itemName] = (
                    <List.Item key={itemName}>
                        {itemName}
                    </List.Item>
                )
            }
        } else {
            missingItems.push(relation.get('Id'))
        }
    })
    if (missingItems.length) {
        console.error(`Missing: ${missingItems}`)
    }
    return Object.values(filteredItems)
}

const Locations = ({ itemId, locations }) => {
    const [modalContent, updateModalContent] = React.useState(null)
    return (
        <SheetContext.Consumer>
            {(data) => {
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
                                            onMouseOver={() => marker && marker.setIcon(map.getMarkerIcon('green'))}
                                            onMouseOut={() => marker && marker.setIcon(map.getMarkerIcon('gold'))}
                                        >
                                            <Card.Content>
                                                <Card.Header>
                                                    {location.Location}
                                                    &nbsp;
                                                    {location.wpTypes.map((wpType) => (
                                                        <Icon
                                                            key={wpType}
                                                            {...CONFIG.icons[wpType]}
                                                            circular
                                                            inverted
                                                            size="tiny"
                                                            title={wpType}
                                                        />
                                                    ))}
                                                </Card.Header>
                                                <Card.Meta>
                                                    {
                                                        location.Address ?
                                                            <div>
                                                                <b>Address: </b>{location.Address}
                                                                &nbsp;
                                                                <a href={`https://www.google.com/maps/search/?api=1&query=${location.LatLng}`} target="_blank" rel="noopener noreferrer">
                                                                    <Icon
                                                                        name="external alternate"
                                                                        color="blue"
                                                                        title="Open in Google Map"
                                                                    />
                                                                </a>
                                                            </div> :
                                                            null
                                                    }
                                                    {location.Phone ? <div><b>Phone: </b>{location.Phone}</div> : null}
                                                    {location.Website ? <div><b>Website: </b><a href={location.Website} target="blank">{location.Website}</a></div> : null}
                                                    {location.Email ? <div><b>Email: </b>{location.Email}</div> : null}
                                                    {location.Hours ? <div><b>Hours: </b>{location.Hours}</div> : null}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {location.Notes}
                                                    <br />
                                                    <a
                                                        href="#"
                                                        onClick={() => {
                                                            updateModalContent({
                                                                header: location.Location,
                                                                data: data
                                                                    .get('relations')
                                                                    .filter(
                                                                        (relation) => (
                                                                            relation.get('Location') === location.Id
                                                                        )
                                                                    )
                                                            })
                                                        }}
                                                    >
                                                        Items accepted at this location
                                                    </a>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )
                                })
                            map.zoomToMarkersBound()
                            return (
                                <>
                                    <Header style={{ margin: 0 }}>
                                        Legend:
                                        {['Reuse', 'Recycle', 'Repair'].map(
                                            (wpType) => (
                                                <Label key={wpType} image size="small">
                                                    <Icon
                                                        {...CONFIG.icons[wpType]}
                                                        circular
                                                        inverted
                                                        size="small"
                                                    />
                                                    {wpType}
                                                </Label>
                                            )
                                        )}
                                    </Header>
                                    <Card.Group id="Cards">
                                        {renderedLocations}
                                        <div>&nbsp;</div>
                                    </Card.Group>
                                    <Modal
                                        open={!!modalContent}
                                        size="small"
                                        closeIcon
                                        onClose={() => updateModalContent(null)}
                                    >
                                        {modalContent ?
                                            <>
                                                <Modal.Header>
                                                    {modalContent.header}
                                                </Modal.Header>
                                                <Modal.Content>
                                                    <Modal.Description>
                                                        <List>
                                                            {renderItems(modalContent.data, data.get('items'))}
                                                        </List>
                                                    </Modal.Description>
                                                </Modal.Content>
                                            </> :
                                            null}
                                    </Modal>
                                </>
                            )
                        }}
                    </MapContext.Consumer>
                )
            }}
        </SheetContext.Consumer>
    )
}

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
