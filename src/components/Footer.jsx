import React from 'react'
import {
    Menu,
    Modal
} from '../semantic'

export default () => (
    <Menu id="Footer" fixed="bottom" color="grey" inverted borderless>
        <Menu.Item>
            Contact us
        </Menu.Item>
        <Modal
            trigger={<Menu.Item position="right">About</Menu.Item>}
            size="small"
            closeIcon
        >
            <Modal.Header>About ReUse Directory</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    PLACEHOLDER
                </Modal.Description>
            </Modal.Content>
        </Modal>
    </Menu>
)
