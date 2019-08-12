import React from 'react'
import PropTypes from 'prop-types'

import { Card, Form, Header } from '../../semantic'
import Props from './props'

const List = ({ items, onSelectItem }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    return (
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
            </Form>
            <br />
            <Card.Group style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
                {items
                    .filter((item) => item.Id && item.searchText.indexOf(searchTerm.toLowerCase()) >= 0)
                    .sort((item1, item2) => item1.Item.localeCompare(item2.Item))
                    .map(({
                        Id, Item, Category, Description
                    }) => (
                        <Card
                            key={Id}
                            href="#"
                            fluid
                            onClick={() => onSelectItem(Id)}
                        >
                            <Card.Content>
                                <Card.Header>
                                    {Item}
                                </Card.Header>
                                <Card.Description>
                                    {Description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra textAlign="right">
                                {Category}
                            </Card.Content>
                        </Card>
                    ))}
            </Card.Group>
        </>
    )
}

List.propTypes = {
    items: PropTypes.arrayOf(Props.Item).isRequired,
    onSelectItem: PropTypes.func.isRequired
}

export default List
