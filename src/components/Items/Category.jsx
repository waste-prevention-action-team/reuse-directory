import React from 'react'

import {
    Card,
    Form
} from '../../semantic'
import { SheetContext } from '../Sheet'
import analytics from '../../utils/analytics'
import { MapContext } from '../Map'

const Category = () => {
    const [searchCategory, setSearchCategory] = React.useState('')
    const map = React.useContext(MapContext)
    React.useEffect(() => () => map.markersLayer.clearLayers(), [])
    return (
        <SheetContext.Consumer>
            {(data) => (
                <>
                    <Form>
                        <Form.Select
                            placeholder="Pick a Category"
                            fluid
                            options={[
                                {
                                    text: '----',
                                    value: null
                                },
                                ...data
                                    .get('itemCategories')
                                    .sort((v1, v2) => v1.toLowerCase() > v2.toLowerCase())
                                    .map((v) => ({
                                        text: v,
                                        value: v
                                    }))
                                    .toJS()
                            ]}
                            value={searchCategory}
                            onChange={(e, { value }) => {
                                map.markersLayer.clearLayers()
                                setSearchCategory(value)
                            }}
                        />
                    </Form>
                    {searchCategory ?
                        <Card.Group id="Cards">
                            {data
                                .getIn([
                                    'locationCategories',
                                    data
                                        .get('itemCategories')
                                        .findIndex(
                                            (category) => ((!searchCategory || category === searchCategory))
                                        )
                                ])
                                .split(',')
                                .map((locationId) => {
                                    const location = data
                                        .get('locations')
                                        .find((l) => l.get('Id') === locationId)
                                        .toJS()
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
                                            onMouseOver={
                                                () => marker && marker.setIcon(map.getMarkerIcon('green'))
                                            }
                                            onMouseOut={
                                                () => marker && marker.setIcon(map.getMarkerIcon('gold'))
                                            }
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
                                                    {location.Phone ?
                                                        <div><b>Phone: </b>{location.Phone}</div> :
                                                        null}
                                                    {location.Website ?
                                                        <div>
                                                            <b>Website: </b>
                                                            <a
                                                                href={location.Website}
                                                                target="blank"
                                                            >
                                                                {location.Website}
                                                            </a>
                                                        </div> :
                                                        null}
                                                    {location.Email ?
                                                        <div><b>Email: </b>{location.Email}</div> :
                                                        null}
                                                    {location.Hours ?
                                                        <div><b>Hours: </b>{location.Hours}</div> :
                                                        null}
                                                </Card.Meta>
                                                <Card.Description>
                                                    {location.Notes}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )
                                })}
                            <div>&nbsp;</div>
                        </Card.Group> :
                        null}
                </>
            )}
        </SheetContext.Consumer>
    )
}

export default Category
