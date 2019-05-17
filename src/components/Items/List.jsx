import React from 'react'
import PropTypes from 'prop-types'

import { Card, Input } from '../../semantic'
import Props from './props'

const List = ({ items, onSelectItem }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    return (
        <React.Fragment>
            <Input
                type="text"
                placeholder="Search"
                icon="search"
                fluid
                value={searchTerm}
                onChange={(e, { value }) => setSearchTerm(value)}
            />
            {items
                .filter(item => item.searchText.indexOf(searchTerm.toLowerCase()) >= 0)
                .sort((item1, item2) => item1.Item > item2.Item)
                .map(({
                    Id, Item, Category, Description
                }) => (
                    <Card
                        key={Id}
                        href="#"
                        header={Item}
                        meta={Category}
                        description={Description}
                        onClick={() => onSelectItem(Id)}
                    />
                ))
            }
        </React.Fragment>
    )
}

List.propTypes = {
    items: PropTypes.arrayOf(Props.Item).isRequired,
    onSelectItem: PropTypes.func.isRequired
}

export default List
