import React from 'react'

import {
    Card,
    Form,
    Icon,
    Label,
    List,
    Modal
} from '../../semantic'
import CONFIG from '../../config'
import { SheetContext } from '../Sheet'
import { MapContext } from '../Map'

const renderItems = (relations, items) => {
    const filteredItems = {}
    relations.forEach((relation) => {
        const itemName = items
            .find((item) => item.get('Id') === relation.get('Item'))
            .get('Item')
        if (!filteredItems[itemName]) {
            filteredItems[itemName] = <List.Item key={itemName}>{itemName}</List.Item>
        }
    })
    return Object.values(filteredItems)
}

const Category = () => {
    const [searchCategory, setSearchCategory] = React.useState('')
    const [modalContent, updateModalContent] = React.useState(null)
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
                            <Card as="div" fluid>
                                <Card.Content>
                                    <Card.Description>
                                        {['Reuse', 'Recycle', 'Repair'].map(
                                            (wpType) => (
                                                <Label key={wpType} image>
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
                                    </Card.Description>
                                </Card.Content>
                            </Card>
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
                                                    &nbsp;
                                                    {location.allCategories.map((wpType) => (
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
                                })}
                            <div>&nbsp;</div>
                        </Card.Group> :
                        null}
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
                            null
                        }
                    </Modal>
                </>
            )}
        </SheetContext.Consumer>
    )
}

export default Category
