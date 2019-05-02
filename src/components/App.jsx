import React from 'react'
import { Segment } from '../semantic'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Sheet from './Sheet'

export default () => (
    <Segment
        basic
        className="no-padding"
        style={{ width: '100%', height: '100%' }}
    >
        <Sheet>
            <Header />
            <Content />
            <Footer />
        </Sheet>
    </Segment>
)
