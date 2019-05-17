import PropTypes from 'prop-types'

const Item = PropTypes.shape({
    Id: PropTypes.number,
    Item: PropTypes.string,
    Description: PropTypes.string,
    Type: PropTypes.string,
    Category: PropTypes.string
})

export default {
    Item
}
