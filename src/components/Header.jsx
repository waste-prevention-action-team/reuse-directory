import React from 'react'
import PropTypes from 'prop-types'

import {
    Dropdown,
    Header as SUIHeader,
    Image,
    Menu,
    Modal
} from '../semantic'
import logo from '../images/logo-small-coalition.png'
import About from './About'

const Header = ({ mobile }) => {
    const [modalView, updateModalView] = React.useState(null)
    let modalHeader
    let modalContent
    switch (modalView) {
        case 'help':
            modalHeader = 'Help'
            modalContent = 'HELP TEXT PLACEHOLDER'
            break
        case 'about':
            modalHeader = 'The Waste Prevention Directory'
            modalContent = <About />
            break
        default:
            modalHeader = ''
            modalContent = ''
    }
    return (
        <>
            <Menu id="Header" borderless fixed="top" inverted>
                <Menu.Item header>
                    <SUIHeader inverted>
                        <Image className="logo" src={logo} />
                        <SUIHeader.Content>
                            Waste Prevention Directory
                            <SUIHeader.Subheader>Corvallis and Surrounding Areas</SUIHeader.Subheader>
                        </SUIHeader.Content>
                    </SUIHeader>
                </Menu.Item>
                <Menu.Menu position="right">
                    {mobile ?
                        <Menu.Item>
                            <Dropdown icon="bars">
                                <Dropdown.Menu>
                                    <Dropdown.Item>Contact us</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateModalView('help')}>Help</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateModalView('about')}>About</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item> :
                        <>
                            <Menu.Item>Contact us</Menu.Item>
                            <Menu.Item onClick={() => updateModalView('help')}>Help</Menu.Item>
                            <Menu.Item onClick={() => updateModalView('about')}>About</Menu.Item>
                        </>}
                </Menu.Menu>
            </Menu>
            <Modal
                open={!!modalView}
                size="small"
                closeIcon
                onClose={() => updateModalView(null)}
            >
                <Modal.Header>
                    {modalHeader}
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {modalContent}
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    )
}

Header.propTypes = {
    mobile: PropTypes.bool
}

Header.defaultProps = {
    mobile: false
}

export default Header
