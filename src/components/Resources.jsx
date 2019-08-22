import React from 'react'

import {
    Card,
    Icon,
    Image
} from '../semantic'

import GreenGirl from '../images/green_girl.jpg'
import LoveINC from '../images/love_inc.jpg'
import RepairFair from '../images/repair_fair.jpg'

const Resources = () => (
        <>
            <p>
                Three unique ReUse opportunities are available to the Corvallis Community
            </p>
            <Card.Group id="Cards">
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Green Girl</Card.Header>
                        <Card.Description>
                            <Image src={GreenGirl} size="small" />
                            <p>
                                Are you planning a birthday party for your child and don’t want to use your breakable
                                dishes? Are you having a baby shower at your house and don’t have enough settings for a
                                group of twenty five? The holidays are coming up, and maybe you don’t want to use paper
                                plates and disposable products? Call Green Girl. I will supply you with clean,
                                unbreakable, reusable earth friendly products to use for any and all occasions.
                                Just give me a call and pick up your ready-to-go Green Girl Party Pack! It’s so easy
                                to be green.
                            </p>
                            <p>Call (541) 207-7924</p>
                            <p>
                                <a
                                    href="mailto:lauriricher@comcast.net"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    lauriricher@comcast.net
                                </a>
                            </p>
                            <p>
                                <a
                                    href="https://www.facebook.com/Green-Girl-1724492821118516/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon name="facebook" size="big" color="blue" />
                                </a>
                            </p>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>OSU Repair Fairs Repair Fairs</Card.Header>
                        <Card.Description>
                            <Image src={RepairFair} size="small" />
                            <p>
                                <b>OSU Repair Fairs Repair Fairs</b> are an event series sponsored by the student group
                                Waste Watchers, a group run by Campus Recycling. Details for each fair vary, so stay
                                tuned to this page for information about upcoming fairs.
                            </p>
                            <br />
                            <p>
                                Why Repair Fairs?  We believe in providing a space that allows us to exchange ideas
                                rather than dollars, developing people into fixers rather than consumers, and reusing
                                materials rather than wasting them. We offer Repair Fairs to realize this vision.
                                We believe you will benefit by:
                            </p>
                            <br />
                            <p>Save Money: Score free repairs so you don’t have to buy more stuff.</p>
                            <p>Gain Skills: Connect with others to learn new skills or share your own.</p>
                            <p>Reduce Waste: Save your beloved belongings and conserve natural resources.</p>
                            <br />
                            <p>When: Wednesday, May 15, 2019, 5:30-7:30 p.m.</p>
                            <p>Where: OSUsed Store, 644 SW 13th St.</p>
                            <br />
                            <p>
                                Bring your broken items and volunteers will help you learn how to repair your
                                belongings, attend demos to learn more skills! Free and open to all.
                            </p>
                            <br />
                            <p>REPAIR SKILLS OFFERED:</p>
                            <p>
                                Appliances / electronics, housewares, clothing, bicycles, computer diagnostics, jewelry
                            </p>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Love INC Medical Shed</Card.Header>
                        <Image src={LoveINC} size="small" />
                        <Card.Description>
                            <p>
                                The Love INC Medical Shed is a joint ministry of several Benton County churches.
                                This ministry offers free durable medical equipment such as walkers, commodes, crutches,
                                wheelchairs, etc. There is no limit on how long equipment is used for.
                                Love INC greatly appreciates when equipment is returned after use so that it can
                                continue to bless others in need.
                            </p>
                            <br />
                            <p>Love INC of Benton County</p>
                            <p>2330 NW Professional Drive Suite 102</p>
                            <p>Corvallis, OR 97330</p>
                            <p>(541) 757-8111</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <div>&nbsp;</div>
            </Card.Group>
        </>
)

export default Resources
