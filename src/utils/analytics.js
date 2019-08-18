import ReactGA from 'react-ga'

export default (category, label) => {
    ReactGA.event({
        category,
        action: label
    })
}
