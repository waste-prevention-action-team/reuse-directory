import React from 'react'
import PropTypes from 'prop-types'

import {
    Dropdown,
    Header as SUIHeader,
    Image,
    Menu,
    Modal
} from '../semantic'
import logo from '../images/logo-small-wpat.jpg'
import About from './About'

const Header = ({ mobile }) => (
    <Menu id="Header" borderless fixed="top" inverted>
        <Menu.Item header>
            <SUIHeader inverted>
                <Image src={logo} avatar />
                <SUIHeader.Content>
                    Waste Reduction Directory
                    <SUIHeader.Subheader>Benton County, OR</SUIHeader.Subheader>
                </SUIHeader.Content>
            </SUIHeader>
        </Menu.Item>
        <Menu.Menu position="right">
            {mobile ?
                <Menu.Item>
                    <Dropdown icon="bars">
                        <Dropdown.Menu>
                            <Dropdown.Item>Contact us</Dropdown.Item>
                            <Modal
                                trigger={<Dropdown.Item>About</Dropdown.Item>}
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
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item> :
                <>
                    <Menu.Item>Contact us</Menu.Item>
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
                </>}
        </Menu.Menu>
    </Menu>
)

Header.propTypes = {
    mobile: PropTypes.bool
}

Header.defaultProps = {
    mobile: false
}

export default Header
