import React from 'react'
import PropTypes from 'prop-types'

import Props from './props'
import Details from './Details'
import List from './List'

const Items = ({ items, activeWPType }) => {
    const [selectedItem, setSelectedItem] = React.useState(null)
    return (
        selectedItem ?
            <Details
                item={items.find(item => item.Id === selectedItem)}
                activeWPType={activeWPType}
                onBack={() => setSelectedItem(null)}
            /> :
            <List items={items} onSelectItem={setSelectedItem} />
    )
}

Items.propTypes = {
    items: PropTypes.arrayOf(Props.Item).isRequired,
    activeWPType: PropTypes.string.isRequired
}

export default Items
