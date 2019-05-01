import React from 'react'

import { Header, Image, Menu } from '../semantic'
import logo from '../images/logo-small-wpat.jpg'

export default () => (
    <Menu id="Header" borderless>
        <Menu.Item header>
            <Header as="h3">
                <Image src={logo} avatar />
                ReUse Directory
            </Header>
        </Menu.Item>
        <Menu.Item position="right">
            <Header as="h4">
                Benton County, OR
            </Header>
        </Menu.Item>
    </Menu>
)
