import React from 'react'

import { Accordion, List, Segment } from '../../semantic'
import { MapContext } from '../Map'
import { SheetContext } from '../Sheet'
import Items from '.'

class Repair extends React.Component {
    static contextType = MapContext

    componentWillUnmount = () => {
        this.context.repairMarkersLayer.clearLayers()
    }

    render() {
        return (
            <MapContext.Consumer>
                {(map) => (
                    <SheetContext.Consumer>
                        {(data) => {
                            const repairLocationIds = data
                                .get('relations')
                                .filter((relation) => relation.get('Repair') === 'y')
                                .map((relation) => relation.get('Location'))
                                .toSet()
                            const repairLocations = data
                                .get('locations')
                                .filter((location) => repairLocationIds.has(location.get('Id')))
                                .map((location) => {
                                    const marker = map.addLocationMaker(location.toJS(), map.repairMarkersLayer)
                                    marker && marker.setIcon(map.getMarkerIcon('blue'))
                                    return (
                                        <List.Item
                                            key={location.get('Id')}
                                            as="a"
                                            onClick={() => marker && marker.openPopup()}
                                            onMouseOver={() => marker && marker.setIcon(map.getMarkerIcon('green'))}
                                            onMouseOut={() => marker && marker.setIcon(map.getMarkerIcon('blue'))}
                                        >
                                            {location.get('Location')}
                                        </List.Item>
                                    )
                                })
                            return (
                <>
                    <Segment basic>
                        <Accordion
                            styled
                            panels={[
                                {
                                    key: 0,
                                    title: {
                                        content: 'See list of all repair places'
                                    },
                                    content: {
                                        content: (
                                            <List>
                                                {repairLocations}
                                            </List>
                                        )
                                    }
                                }]}
                        />
                    </Segment>
                    <Items
                        items={data.get('items')
                            .toJS()}
                        categories={['Repair']}
                    />
                </>
                            )
                        }}
                    </SheetContext.Consumer>
                )}
            </MapContext.Consumer>
        )
    }
}

export default Repair
