import React from 'react'
import { List } from '../semantic'

const About = () => (
    <List bulleted>
        <List.Item>
            Our Online Directory provides an easy way to find businesses or organizations in the Corvallis area that
            either accept reusable items for resale or donation to the public or that offer repair services.
        </List.Item>
        <List.Item>
            You can search for items or categories and receive a list of locations accepting those items for reuse or
            repair, along with a map of those locations and their contact information.
        </List.Item>
        <List.Item>
            Up-to-date link to local recycling opportunities (though we consider recycling a last resort after
            prevention and reuse): <a href="http://local.republicservices.com/site/Corvallis-OR/service-information#recycling" target="blank">http://local.republicservices.com/site/Corvallis-OR/service-information#recycling</a>
        </List.Item>
    </List>
)

export default About
