import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerShadowImage from 'leaflet/dist/images/marker-shadow.png'
import markerImage from '../../images/map-marker-alt-solid.svg'

import CONFIG from '../../config'

class LeafletMap {
    constructor() {
        this.map = L.map('Map', {
            center: CONFIG.map.center,
            zoom: CONFIG.map.zoom,
            layers: [L.tileLayer(...CONFIG.map.basemap)],
            zoomControl: false,
            preferCanvas: true
        })

        L.control.zoom({
            position: 'topright'
        }).addTo(this.map)

        this.markersLayer = L.featureGroup([]).addTo(this.map)
    }

    destroy = () => {
        this.map.off()
        this.map.remove()
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
        locations.forEach(({ Name, Latitude, Longitude }) => {
            const marker = L.marker([Latitude, Longitude], { icon: this.getMarkerIcon(color) })
            marker.addTo(this.markersLayer)
            marker.bindPopup(`${Name}`)
        })
        const bounds = this.markersLayer.getBounds()
        if (Object.keys(bounds).length) {
            this.map.fitBounds(bounds)
        } else {
            this.map.setView(CONFIG.map.center, CONFIG.map.zoom)
        }
    }
}

export default LeafletMap
