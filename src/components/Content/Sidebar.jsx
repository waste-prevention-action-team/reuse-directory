import React from 'react'

import { Input, Menu, Segment } from '../../semantic'
import SheetContext from '../Sheet/Context'

const Sidebar = () => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    return (
        <Segment basic>
            <SheetContext.Consumer>
                {data => (
                    <Menu widths={data.locationCategories.length}>
                        {data
                            .locationCategories
                            .map((category, idx) => (
                                <Menu.Item
                                    key={category}
                                    active={activeCategory === idx}
                                    onClick={() => setActiveCategory(idx)}
                                >
                                    {category}
                                </Menu.Item>
                            ))
                        }
                    </Menu>
                )}
            </SheetContext.Consumer>
            <Input
                type="text"
                placeholder="Search"
                icon="search"
                fluid
            />
        </Segment>
    )
}

export default Sidebar
