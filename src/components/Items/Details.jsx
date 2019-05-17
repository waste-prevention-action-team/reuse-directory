import React from 'react'
import PropTypes from 'prop-types'

import { Button, Header } from '../../semantic'
import Locations from '../Locations'
import { MapContext } from '../Map'
import { SheetContext } from '../Sheet'
import Props from './props'

const Details = ({ item, activeWPType, onBack }) => (
    <MapContext.Consumer>
        {map => (
            <SheetContext.Consumer>
                {({ locations, relations }) => (
                    <React.Fragment>
                        <Button
                            content="Return to all items"
                            icon="left chevron"
                            onClick={() => {
                                map.updateLocationsListMarkers([])
                                onBack()
                            }}
                        />
                        <Header content={item.Item} subheader={item.Category} />
                        <Locations
                            locations={
                                locations.filter(
                                    location => relations.filter(relation => (
                                        relation.Category === activeWPType &&
                                        relation.Item === item.Id &&
                                        relation.Location === location.Id
                                    )).length
                                )
                            }
                            activeWPType={activeWPType}
                        />
                    </React.Fragment>
                )}
            </SheetContext.Consumer>
        )}
    </MapContext.Consumer>
)

Details.propTypes = {
    item: Props.Item.isRequired,
    activeWPType: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired
}

export default Details
