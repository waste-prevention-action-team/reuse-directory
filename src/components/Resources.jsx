import React from 'react'

import { Card } from '../semantic'

import { SheetContext } from './Sheet'

const Resources = () => (
    <SheetContext.Consumer>
        {(data) => (
            <>
                <p>
                    Unique ReUse opportunities are available to the Corvallis Community
                </p>
                <Card.Group id="Cards">
                    {data.get('resources').map((resource) => {
                        const title = resource.get('Title')
                        const description = resource.get('Description')
                        const notes = resource.get('Notes')
                        return (
                            <Card fluid key={title}>
                                <Card.Content>
                                    <Card.Header>{title}</Card.Header>
                                    <Card.Description>
                                        <p>
                                            {description}
                                        </p>
                                    </Card.Description>
                                </Card.Content>
                                {notes ?
                                    <Card.Content extra>
                                        {resource.get('Notes').split('\n').map((note, idx) => (
                                            <p key={idx}>
                                                <br />
                                                {note}
                                            </p>
                                        ))}
                                    </Card.Content> :
                                    null}
                            </Card>
                        )
                    })}
                    <div>&nbsp;</div>
                </Card.Group>
            </>
        )}
    </SheetContext.Consumer>
)

export default Resources
