import React from 'react'

import {
    Menu,
    Modal
} from '../semantic'

const Footer = () => (
    <Menu id="Footer" fixed="bottom" color="grey" inverted borderless>
        <Menu.Item>
                Contact us
        </Menu.Item>
        <Menu.Menu position="right">
            <Modal
                trigger={<Menu.Item>About</Menu.Item>}
                size="small"
                closeIcon
            >
                <Modal.Header>
                        About ReUse Directory
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                            PLACEHOLDER
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </Menu.Menu>
    </Menu>
)

export default Footer
