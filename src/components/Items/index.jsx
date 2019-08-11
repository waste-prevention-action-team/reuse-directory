import React from 'react'
import PropTypes from 'prop-types'

import Props from './props'
import Details from './Details'
import List from './List'

const Items = ({ items, categories }) => {
    const [selectedItem, setSelectedItem] = React.useState(null)
    return (
        selectedItem ?
            <Details
                item={items.find((item) => item.Id === selectedItem)}
                categories={categories}
                onBack={() => setSelectedItem(null)}
            /> :
            <List items={items} onSelectItem={setSelectedItem} />
    )
}

Items.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.arrayOf(Props.Item).isRequired
}

Items.defaultProps = {
    categories: []
}

export default Items
