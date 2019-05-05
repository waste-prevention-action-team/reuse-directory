import React from 'react'

import { Input, Segment } from '../../semantic'
import SheetContext from '../Sheet/Context'

import LocationList from './LocationList'
import LocationCategoryMenu from './LocationCategoryMenu';

const Sidebar = () => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    return (
        <Segment basic>
            <SheetContext.Consumer>
                {({ locationCategories, locations }) => (
                    <React.Fragment>
                        <LocationCategoryMenu
                            categories={locationCategories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                        <Input
                            type="text"
                            placeholder="Search"
                            icon="search"
                            fluid
                        />
                        <LocationList
                            locations={locations}
                            locationCategory={activeCategory}
                        />
                    </React.Fragment>
                )}
            </SheetContext.Consumer>
        </Segment>
    )
}

export default Sidebar
