import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerShadowImage from 'leaflet/dist/images/marker-shadow.png'
import markerImage from '../../images/map-marker-alt-solid.svg'

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

class LeafletMap {
    constructor() {
        this.map = L.map('Map', {
            center: [44.566667, -123.283333],
            zoom: 11,
            layers: [BASEMAP],
            zoomControl: false,
            preferCanvas: true
        })

        L.control.zoom({
            position: 'topright'
        }).addTo(this.map)

        this.markersLayer = L.layerGroup([]).addTo(this.map)
    }

    getMarkerIcon = color => (
        L.icon({
            iconUrl: `data:image/svg+xml;base64,${btoa(markerImage.replace('currentColor', color))}`,
            shadowUrl: markerShadowImage,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
            className: color
        })
    )

    updateLocationsListMarkers = (locations, color = 'gold') => {
        this.markersLayer.clearLayers()
        locations.forEach(({ Latitude, Longitude }) => {
            L.marker([Latitude, Longitude], { icon: this.getMarkerIcon(color) }).addTo(this.markersLayer)
        })
    }
}

export default LeafletMap
