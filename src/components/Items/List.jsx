import React from 'react'
import PropTypes from 'prop-types'

import {
    Card,
    Form
} from '../../semantic'
import Props from './props'

const List = ({ items, onSelectItem }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    return (
        <>
            <Form>
                <Form.Input
                    type="text"
                    placeholder="Search for an Item"
                    icon="search"
                    fluid
                    value={searchTerm}
                    onChange={(e, { value }) => setSearchTerm(value)}
                />
            </Form>
            {searchTerm ?
                <Card.Group id="Cards">
                    {items
                        .filter((item) => (
                            item.Id && item.searchText.indexOf(`${searchTerm.toLowerCase()}`) >= 0
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
                    <div>&nbsp;</div>
                </Card.Group> :
                null}
        </>
    )
}

List.propTypes = {
    items: PropTypes.arrayOf(Props.Item).isRequired,
    onSelectItem: PropTypes.func.isRequired
}

export default List
