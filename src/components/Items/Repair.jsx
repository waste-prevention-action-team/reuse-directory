import React from 'react'

import {
    Accordion,
    List,
    Segment
} from '../../semantic'
import { MapContext } from '../Map'
import { SheetContext } from '../Sheet'
import Items from '.'

const Repair = () => {
    const map = React.useContext(MapContext)
    const data = React.useContext(SheetContext)
    React.useEffect(() => () => map.repairMarkersLayer.clearLayers(), [])

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
                <List.Item key={location.get('Id')}>
                    <List.Header
                        as="a"
                        onClick={() => marker && marker.openPopup()}
                        onMouseOver={() => marker && marker.setIcon(map.getMarkerIcon('green'))}
                        onMouseOut={() => marker && marker.setIcon(map.getMarkerIcon('blue'))}
                    >
                        {location.get('Location')}
                    </List.Header>
                    <List.Description>
                        <List.List>
                            {data
                                .get('relations')
                                .filter(
                                    (relation) => relation.get('Location') === location.get('Id')
                                ).map((relation) => (
                                    <List.Item key={relation.get('Id')}>
                                        {data
                                            .get('items')
                                            .find((item) => item.get('Id') === relation.get('Item'))
                                            .get('Item')
                                        }
                                    </List.Item>
                                ))
                            }
                        </List.List>
                    </List.Description>
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
}

export default Repair
