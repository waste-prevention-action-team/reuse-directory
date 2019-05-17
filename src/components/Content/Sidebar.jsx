import React from 'react'

import { Segment } from '../../semantic'
import { SheetContext } from '../Sheet'

import Items from '../Items'
import WPTypeMenu from './WPTypeMenu'

const Sidebar = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0)
    return (
        <Segment basic>
            <SheetContext.Consumer>
                {({ wpTypes, items }) => (
                    <React.Fragment>
                        <WPTypeMenu
                            categories={wpTypes}
                            activeCategoryIndex={activeCategoryIndex}
                            onCategoryChange={setActiveCategoryIndex}
                        />
                        <Items
                            items={items}
                            activeWPType={wpTypes[activeCategoryIndex]}
                        />
                    </React.Fragment>
                )}
            </SheetContext.Consumer>
        </Segment>
    )
}

export default Sidebar
