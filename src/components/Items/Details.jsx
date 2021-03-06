import React from 'react'
import PropTypes from 'prop-types'

import { Button, Header, Segment } from '../../semantic'
import { MapContext } from '../Map'
import { SheetContext } from '../Sheet'
import Locations from './Locations'
import Props from './props'

const Details = ({ item, onBack, categories }) => (
    <MapContext.Consumer>
        {(map) => (
            <SheetContext.Consumer>
                {(data) => {
                    const locations = data.get('locations').toJS()
                    const relations = data.get('relations').toJS()
                    return (
                        <>
                            <Segment
                                basic
                                compact
                                style={{ padding: 0, width: '100%' }}
                            >
                                <div style={{ float: 'left' }}>
                                    <Header content={item.Item} subheader={item.Category} />
                                    <div>
                                        {item.Description}
                                    </div>
                                </div>
                                <Button
                                    content="Return to all items"
                                    icon="left chevron"
                                    size="mini"
                                    style={{ float: 'right' }}
                                    onClick={() => {
                                        map.markersLayer.clearLayers()
                                        onBack()
                                    }}
                                />
                            </Segment>
                            <Locations
                                itemId={item.Id}
                                locations={
                                    locations.filter(
                                        (location) => relations.filter((relation) => (
                                            (!categories.length || categories.some((category) => relation[category] && relation[category] === 'y')) &&
                                            relation.Item === item.Id &&
                                            relation.Location === location.Id
                                        )).length
                                    )
                                }
                            />
                        </>
                    )
                }}
            </SheetContext.Consumer>
        )}
    </MapContext.Consumer>
)

Details.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    item: Props.Item.isRequired,
    onBack: PropTypes.func.isRequired
}

Details.defaultProps = {
    categories: []
}

export default Details
