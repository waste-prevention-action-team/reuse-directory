import PropTypes from 'prop-types'

const Location = PropTypes.shape({
    Id: PropTypes.number,
    Name: PropTypes.string,
    Address: PropTypes.string,
    Latitude: PropTypes.number,
    Longitude: PropTypes.number,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    Hours: PropTypes.string,
    Notes: PropTypes.string
})

export default {
    Location
}
