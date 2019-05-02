import React from 'react'

import { Input, Menu, Segment } from '../../semantic'
import SheetContext from '../Sheet/Context'

const Sidebar = () => (
    <Segment basic>
        <SheetContext.Consumer>
            {sheets => (
                <Menu>
                    {sheets
                        .filter(sheet => sheet.properties.title === 'Location Category')[0]
                        .data[0]
                        .rowData
                        .map(({ values }) => (
                            <Menu.Item key={values[0].formattedValue}>
                                {values[0].formattedValue}
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
        />
    </Segment>
)

export default Sidebar
