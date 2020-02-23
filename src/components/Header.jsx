import React from 'react'
import PropTypes from 'prop-types'

import { loadIframe } from '../utils/loadExternalContent'

import {
    Dropdown,
    Header as SUIHeader,
    Image,
    Menu,
    Modal
} from '../semantic'
import logo from '../images/logo-small-coalition.png'

const Header = ({ mobile }) => {
    const iframeRef = React.useRef(null)
    const [modalView, updateModalView] = React.useState(null)
    let modalTitle
    let modalSrc
    switch (modalView) {
        case 'help':
            modalTitle = 'How to Use'
            modalSrc = 'https://docs.google.com/document/d/e/2PACX-1vSZldiYAJ_CHsy5YmdGLriu0OE8f-Qh3uEox9ULDjYDRUeaQCv4PiGOltbtC7RWjIMGjcJXKGTvGQcn/pub?embedded=true'
            break
        case 'about':
            modalTitle = 'About'
            modalSrc = 'https://docs.google.com/document/d/e/2PACX-1vQ3VLxzPhHJ1rflLoOT-EA4nM8D1k9FuFbGZrdscRX4DxSkFMV-XBdqHCuA-x0TW266NpNj1CeyZlII/pub?embedded=true'
            break
        case 'contact':
            modalTitle = 'Contact'
            modalSrc = 'https://docs.google.com/document/d/e/2PACX-1vQOnXo-DzjtkDM6r20Z9AGgNhd5rhW4lAmCukciLaX0v9Zr8ImNSx27xAvEXTBh1PSd7QRswLRWMdeq/pub?embedded=true'
            break
        default:
            modalTitle = ''
            modalSrc = ''
    }

    React.useEffect(() => {
        if (iframeRef.current) {
            loadIframe(iframeRef.current, modalSrc)
        }
    })

    return (
        <>
            <Menu id="Header" borderless fixed="top" inverted>
                <Menu.Item header>
                    <SUIHeader inverted>
                        {mobile ? null : <Image className="logo" src={logo} />}
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
                                    <Dropdown.Item onClick={() => updateModalView('contact')}>Contact us</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateModalView('help')}>How to Use</Dropdown.Item>
                                    <Dropdown.Item onClick={() => updateModalView('about')}>About</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item> :
                        <>
                            <Menu.Item onClick={() => updateModalView('contact')}>Contact us</Menu.Item>
                            <Menu.Item onClick={() => updateModalView('help')}>How to Use</Menu.Item>
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
                <Modal.Content>
                    <Modal.Description>
                        <iframe
                            ref={iframeRef}
                            title={modalTitle}
                            frameBorder="0"
                            style={{ width: '100%', minHeight: 500 }}
                            srcDoc=""
                        />
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
