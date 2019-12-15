const CONFIG = {
    site_title: 'ReUse Directory',
    google_analytics_key: '',
    google_api_key: '',
    google_sheet_id: '',
    sentry_key: '',
    google_sheet_schema: {
        items: {
            sheetIndex: 0,
            sheetName: 'Items',
            columns: 'A:E',
            sortByColumn: 1,
            searchableColumns: [1, 2, 3]
        },
        locations: {
            sheetIndex: 1,
            sheetName: 'Locations',
            columns: 'A:J',
            sortByColumn: 1,
            searchableColumns: []
        },
        relations: {
            sheetIndex: 2,
            sheetName: 'Relations',
            columns: 'A:H',
            fk_maps: {
                Items: 1,
                Locations: 1
            },
            searchableColumns: []
        },
        categories: {
            sheetIndex: 3,
            sheetName: 'Categories',
            columns: 'A:C'
        },
        resources: {
            sheetIndex: 4,
            sheetName: 'Resources',
            columns: 'A:C'
        }
    },
    icons: {
        Reuse: {
            name: 'sync alternate',
            color: 'green'
        },
        Recycle: {
            name: 'recycle',
            color: 'teal'
        },
        Repair: {
            name: 'wrench',
            color: 'blue'
        },
        Hazardous: {
            name: 'biohazard',
            color: 'yellow'
        }
    },
    map: {
        center: [44.567, -123.283],
        zoom: 14,
        basemap: [
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
        ]
    }
}

module.exports = CONFIG
