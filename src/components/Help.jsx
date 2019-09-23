import React from 'react'

import { Header, List, Segment } from '../semantic'

const Help = () => (
    <Segment basic>
        <div>
            There are four tabs across the left upper side of the screen that include: “Search by Item”, Search by
            Category”, “Repair”, and “Unique Reuse Opportunities”.
        </div>
        <Header as="h3">
            How to search for an item for Reuse, Recycle, or Repair:
        </Header>
        <List ordered>
            <List.Item>
                1. Click on “Search by item” and type in the name of the item you are searching for in the box.
            </List.Item>
            <List.Item>
                2. If your search is successful then it will a show the locations of all the businesses on a map and a
                short description (that includes the address, phone number, and website if available) of
                businesses that might take your item. The next step is to call the business to make sure they will
                take your item.
            </List.Item>
            <List.Item>
                3. If there are no results then the next step is to click on “Search by Category”, click on the drop
                down menu, and select a category that you think might contain your item.
            </List.Item>
            <List.Item>
                4. For example: If I search for pillows and no results appear I would then select a category from the
                drop down menu that will likely include the item, pillows. I choose the category bedding /bath
                which seems a likely category and the results show a map and a short description (that includes
                the address, phone number, and website if available) of 17 businesses that might take pillows.
                The next step is to call the business and ask them if they take pillows.
            </List.Item>
        </List>
        <Header as="h3">The “Repair” tab:</Header>
        <div>
            If you click on the Repair tab it shows a list of businesses or organizations and what items they
            repair.
        </div>
        <Header as="h3">Unique Reuse Opportunities</Header>
        <div>
            Shows a number of Reuse Opportunities that are unusual which people should take advantage
            of. For example Green Girl will supply you with dinnerware free of charge for large groups.
        </div>
    </Segment>
)

export default Help
