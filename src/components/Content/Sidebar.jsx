import React from 'react'

import { Input, Segment } from '../../semantic'
import { SheetContext } from '../Sheet'

import LocationList from './LocationList'
import LocationCategoryMenu from './LocationCategoryMenu'

const Sidebar = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0)
    const [searchTerm, setSearchTerm] = React.useState('')
    return (
        <Segment basic>
            <SheetContext.Consumer>
                {({ locationCategories, locations }) => (
                    <React.Fragment>
                        <LocationCategoryMenu
                            categories={locationCategories}
                            activeCategory={activeCategoryIndex}
                            onCategoryChange={setActiveCategoryIndex}
                        />
                        <Input
                            type="text"
                            placeholder="Search"
                            icon="search"
                            fluid
                            value={searchTerm}
                            onChange={(e, { value }) => setSearchTerm(value)}
                        />
                        <LocationList
                            locations={locations}
                            locationCategory={locationCategories[activeCategoryIndex]}
                            searchTerm={searchTerm}
                        />
                    </React.Fragment>
                )}
            </SheetContext.Consumer>
        </Segment>
    )
}

export default Sidebar
