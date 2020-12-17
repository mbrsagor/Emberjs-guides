import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AppTab from '../AppTab';
import Cart from '../Cart/Cart';
import {connect} from 'unistore/react';
import {actions} from '../../core/store';
import Parameters from '../Param/Param';

class CompositePricingEngine extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-12">
                    <div className="">
                    <Tab.Container
                        defaultActiveKey={this.props.configData[0].code} 
                        id="fa" >

                        <Nav className="d-block sticky-top" style={{float:'left', width: '6em'}}>
                        {
                            this.props.configData.map((app, index) => (
                                <Nav.Item key={app.code}>
                                <Nav.Link className={app.code} key={app.code} eventKey={app.code} title={app.code}>
                                    <span>{index == 0 ? '' : index}</span>{app.code}
                                </Nav.Link>
                                </Nav.Item>
                        ))}
                        </Nav>

                        <Tab.Content className="f-left" style={{ marginLeft: '6em' }} >
                        {
                            this.props.configData.map(app => (
                                <Tab.Pane className={app.code} key={app.code} eventKey={app.code} title={app.code}>
                                    <AppTab key={app.code} code={app.code} data={app} />
                                </Tab.Pane>
                        ))}
                        </Tab.Content>
                    </Tab.Container>
                    </div>
                </div>

                <div className="col-md-4 col-12 position-relative cart-container">
                    <Cart />
                </div>
                
            </div>
        );
    }
}

export default connect(['configData'], actions)(CompositePricingEngine);
