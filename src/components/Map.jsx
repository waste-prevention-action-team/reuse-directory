import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerShadowImage from 'leaflet/dist/images/marker-shadow.png'
import markerImage from '../images/map-marker-alt-solid.svg'

import CONFIG from '../config'

export const MapContext = React.createContext(null)

class Map {
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

    renderLocationPopupContent = ({
        Location,
        Address,
        Phone,
        Website,
        Email,
        Hours,
        Notes,
        wpTypes
    }) => {
        const icons = wpTypes.map(wpType => (
            `<i class="${CONFIG.icons[wpType].color} ${CONFIG.icons[wpType].name} circular inverted icon"></i>`
        ))
        return `
        <div class="ui fluid card">
            <div class="content">
                <div class="header">${Location || ''}</div>
                <div class="meta">
                    ${Address ? `<div><b>Address: </b>${Address}</div>` : ''}
                    ${Phone ? `<div><b>Phone: </b>${Phone}</div>` : ''}
                    ${Website ? `<div><b>Website: </b><a href=${Website} target="blank">${Website}</a></div>` : ''}
                    ${Email ? `<div><b>Email: </b>${Email}</div>` : ''}
                    ${Hours ? `<div><b>Hours: </b>${Hours}</div>` : ''}
                </div>
                <div class="description">${Notes || ''}</div>
            </div>
            <div class="extra right aligned content">
                ${icons.join('')}
            </div>
        </div>
    `
    }

    addLocationMaker = (location) => {
        if (location.LatLng) {
            const marker = L.marker(
                location.LatLng.split(','),
                { icon: this.getMarkerIcon('gold') }
            )
            marker.addTo(this.markersLayer)
            marker.bindPopup(this.renderLocationPopupContent(location))
            return marker
        }
        return null
    }

    zoomToMarkersBound = () => {
        const bounds = this.markersLayer.getBounds()
        if (Object.keys(bounds).length) {
            this.map.fitBounds(bounds)
        } else {
            this.map.setView(CONFIG.map.center, CONFIG.map.zoom)
        }
    }
}

export default Map
