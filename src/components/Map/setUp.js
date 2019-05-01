import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const BASEMAP = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    {
        attribution: `
            &copy; <a href="http://www.openstreetmap.org/copyright">
            OpenStreetMap</a>, &copy; 
            <a href="https://cartodb.com/attributions">Carto</a>
        `,
        subdomains: 'abcd',
        maxZoom: 20,
        minZoom: 0
    }
)

const initBaseControls = (map) => {
    L.control.zoom({
        position: 'topright'
    }).addTo(map)
}

const setUp = () => {
    const map = L.map('Map', {
        center: [44.566667, -123.283333],
        zoom: 11,
        layers: [BASEMAP],
        zoomControl: false,
        preferCanvas: true
    })

    initBaseControls(map)

    return map
}

export default setUp
