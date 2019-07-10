import React from 'react'
import PropTypes from 'prop-types'

import { Button, Header, Segment } from '../../semantic'
import { MapContext } from '../Map'
import { SheetContext } from '../Sheet'
import Locations from './Locations'
import Props from './props'

const Details = ({ item, onBack }) => (
    <MapContext.Consumer>
        {map => (
            <SheetContext.Consumer>
                {(data) => {
                    const locations = data.get('locations').toJS()
                    const relations = data.get('relations').toJS()
                    return (
                        <React.Fragment>
                            <Button
                                content="Return to all items"
                                icon="left chevron"
                                onClick={() => {
                                    map.markersLayer.clearLayers()
                                    onBack()
                                }}
                            />
                            <Segment basic>
                                <Header content={item.Item} subheader={item.Category} />
                                <div>
                                    {item.Description}
                                </div>
                            </Segment>
                            <Locations
                                itemId={item.Id}
                                locations={
                                    locations.filter(
                                        location => relations.filter(relation => (
                                            relation.Item === item.Id &&
                                            relation.Location === location.Id
                                        )).length
                                    )
                                }
                            />
                        </React.Fragment>
                    )
                }}
            </SheetContext.Consumer>
        )}
    </MapContext.Consumer>
)

Details.propTypes = {
    item: Props.Item.isRequired,
    onBack: PropTypes.func.isRequired
}

export default Details
