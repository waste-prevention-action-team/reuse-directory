import React from 'react'

import {
    Card,
    Form,
    Header,
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
    const missingItems = []
    relations.forEach((relation, idx) => {
        const relationItem = items.find((item) => item.get('Id') === relation.get('Item'))
        if (relationItem) {
            const itemName = relationItem.get('Item')
            if (!filteredItems[itemName]) {
                filteredItems[itemName] = (
                    <List.Item key={itemName}>
                        {idx + 1} - {itemName}
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
    return Object
        .entries(filteredItems).sort((item1, item2) => item1[0].localeCompare(item2[0]))
        .map(([, item]) => item)
}

const Category = () => {
    const data = React.useContext(SheetContext)
    const cardGroupTopRef = React.useRef(null)
    const [searchCategory, setSearchCategory] = React.useState('')
    const [modalContent, updateModalContent] = React.useState(null)
    const map = React.useContext(MapContext)
    React.useEffect(() => () => map.markersLayer.clearLayers(), [])

    if (cardGroupTopRef.current) {
        cardGroupTopRef.current.scrollIntoView()
    }

    let locations = data
        .getIn([
            'locationCategories',
            data
                .get('itemCategories')
                .findIndex(
                    (category) => ((!searchCategory || category === searchCategory))
                )
        ])
    if (locations) {
        locations = locations
            .split(',')
            .map((locationId) => data
                .get('locations')
                .find((l) => l.get('Id') === locationId)
                .toJS())
            .sort((location1, location2) => location1.Location.localeCompare(location2.Location))
    } else {
        locations = []
    }

    return (

        <>
            <Form>
                <Form.Select
                    placeholder="Pick a Category"
                    fluid
                    search
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
                <>
                    <Header>
                        Legend:
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
                    </Header>
                    <Card.Group id="Cards">
                        <div ref={cardGroupTopRef} />
                        {locations ?
                            locations
                                .map((location) => {
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
                                }) :
                            'No location accepts this category'}
                        <div>&nbsp;</div>
                    </Card.Group>
                </> :
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
                    null}
            </Modal>
        </>
    )
}

export default Category
