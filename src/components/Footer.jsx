import React from 'react'

import {
    Menu,
    Modal
} from '../semantic'
import Admin from './Admin'

const Footer = () => {
    const [isAdminModalOpen, setAdminModalState] = React.useState(false)
    return (
        <Menu id="Footer" fixed="bottom" color="grey" inverted borderless>
            <Menu.Item>
                Contact us
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item onClick={() => setAdminModalState(true)}>Admin</Menu.Item>
                <Modal
                    open={isAdminModalOpen}
                    size="fullscreen"
                >
                    <Modal.Header>
                        Admin
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Admin />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>

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
}

export default Footer
