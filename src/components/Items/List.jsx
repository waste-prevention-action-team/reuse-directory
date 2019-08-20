import React from 'react'
import PropTypes from 'prop-types'

import {
    Card, Form, Header
} from '../../semantic'
import { SheetContext } from '../Sheet'
import Props from './props'

const List = ({ items, onSelectItem }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [searchCategory, setSearchCategory] = React.useState('')
    return (
        <SheetContext.Consumer>
            {(data) => (
                <>
                    <Form>
                        <Form.Input
                            type="text"
                            label={<Header>Search for an Item</Header>}
                            placeholder="Search"
                            icon="search"
                            fluid
                            value={searchTerm}
                            onChange={(e, { value }) => setSearchTerm(value)}
                        />
                        <Form.Select
                            placeholder="Pick a Category"
                            fluid
                            options={[
                                { text: '----', value: null },
                                ...data
                                    .get('itemCategories')
                                    .sort((v1, v2) => v1.toLowerCase() > v2.toLowerCase())
                                    .map((v) => ({ text: v, value: v }))
                                    .toJS()
                            ]}
                            value={searchCategory}
                            onChange={(e, { value }) => setSearchCategory(value)}
                        />
                    </Form>
                    <br />
                    <Card.Group style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
                        {items
                            .filter((item) => (
                                (!searchCategory || item.Category === searchCategory) &&
                                (item.Id && item.searchText.indexOf(`${searchTerm.toLowerCase()}`)) >= 0
                            ))
                            .sort((item1, item2) => item1.Item.localeCompare(item2.Item))
                            .map(({
                                Id, Item, Category, Description
                            }) => (
                                <Card
                                    key={Id}
                                    href="#"
                                    fluid
                                    onClick={() => onSelectItem(Id, Item)}
                                >
                                    <Card.Content>
                                        <Card.Header>
                                            {Item}
                                        </Card.Header>
                                        <Card.Meta>
                                            {Category}
                                        </Card.Meta>
                                        <Card.Description>
                                            {Description}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                    </Card.Group>
                </>
            )}
        </SheetContext.Consumer>
    )
}

List.propTypes = {
    items: PropTypes.arrayOf(Props.Item).isRequired,
    onSelectItem: PropTypes.func.isRequired
}

export default List
