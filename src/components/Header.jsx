import React from 'react'

import {
    Header as SUIHeader, Image, Menu, Modal
} from '../semantic'
import logo from '../images/logo-small-wpat.jpg'
import About from './About'

const Header = () => (
    <Menu id="Header" borderless fixed="top">
        <Menu.Item header>
            <SUIHeader>
                <Image src={logo} avatar />
                Waste Reduction Directory
            </SUIHeader>
        </Menu.Item>
        <Menu.Menu position="right">
            <Menu.Item header>
                Benton County, OR
            </Menu.Item>
            <Menu.Item>
                Contact us
            </Menu.Item>
            <Modal
                trigger={<Menu.Item>About</Menu.Item>}
                size="small"
                closeIcon
            >
                <Modal.Header>
                    The Waste Reduction Directory
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <About />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </Menu.Menu>
    </Menu>
)

export default Header
