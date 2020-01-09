import React from 'react'

import { Header, List, Segment } from '../semantic'

const Help = () => (
    <Segment basic>
        <Header as="h3">
            How to use the Waste prevention directory
        </Header>
        <div>
            You will find four tabs across the top: Search by Item, Search by Category, Repair,
            and Unique Reuse Opportunities.
        </div>
        <Header as="h3">
            How to search for an item for Reuse, Recycle, or Repair:
        </Header>
        <List ordered>
            <List.Item>
                Click on “Search by Item” and in the box, type in the item you are searching for.
            </List.Item>
            <List.Item>
                If search is successful, all locations accepting that item are listed*, each also appearing on a map
                with the location&#39;s contact info. For each business you can click on
                “Items accepted at this location” to verify what items the business takes. The next step is to call
                a location to confirm your item is currently being accepted.
            </List.Item>
            <List.Item>
                If there are no results, click on “Search by Category” and look through the drop-down menu for a
                category likely to contain your item.
            </List.Item>
            <List.Item>
                For example: If I search for pillows and no results appear*, I would select a likely category from
                the drop-down menu such as bedding/bath. Results then show a list and map of locations that may accept
                pillows. The next step is to call a location to confirm if pillows are currently being accepted.
            </List.Item>
        </List>
        <Header as="h3">
            How to search for locations to bring items for Repair:
        </Header>
        <List ordered>
            <List.Item>
                1. Click on &quot;Repair&quot; at the top.
            </List.Item>
            <List.Item>
                2. Click on &quot;See list of all repair places&quot; drop-down menu for a list of locations and
                what items they repair.
            </List.Item>
            <List.Item>
                3. Click a location name for contact information a map location.
            </List.Item>
        </List>
        <Header as="h3">
            Unique Reuse Opportunities
        </Header>
        <div>
            Scroll for a number of local Reuse Opportunities that are unusual but well-vetted. For example,
            Green Girl can supply you with dinnerware, free of charge, for your event.
        </div>
        <Header as="h4">
            *TIP FOR ANDROID USERS:
        </Header>
        <div>
            When searching by item, after clicking &quot;search&quot; click elsewhere on the screen to minimize your
            keyboard to see locations list.
        </div>
        <Header as="h4">
            *TIP FOR iPHONE USERS:
        </Header>
        <div>
            When searching by item, after clicking &quot;search&quot; click &quot;done&quot; to minimize your keyboard
            to see locations list.
        </div>
        <Header as="h5">
            NOTE: This site functions best via PC or Mac. We hope to have it be more mobile-friendly in the future.
        </Header>
    </Segment>
)

export default Help
