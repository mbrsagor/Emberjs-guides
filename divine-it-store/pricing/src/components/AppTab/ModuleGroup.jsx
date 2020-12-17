import React from 'react'
import Module from './Module';
import MultiplierInputGroup from '../Engine/MultiplierInputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import PricingParameterPrimary from '../Engine/PricingParameterPrimary';
import ModuleGroupAddedCount from './ModuleGroupAddedCount';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class ModuleGroup extends React.Component {

    constructor(props) {
        super(props);

        const hideModuleControl = (props.app == 'START') || (props.app == 'PIP');
        const expand = (props.app == 'START') || (props.app == 'PIP');

        this.state = {
            expand: expand,
            hideModuleControl: hideModuleControl
        }


        if (this.props.data.showMultiplier && this.props.data.multipliers) {
            const multiplierNameList = this.props.data.showMultiplier.split(',');
            //console.log(multiplierNameList, this.props.data.multipliers);

            this.displayMultipliers = this.props.data.multipliers.filter((each) => multiplierNameList.includes(each.code) != 0 );
            //console.log(this.displayMultipliers);
        }
        else {
            this.displayMultipliers = [];
        }
    }

    selectAll = (e,action) => {
        e.preventDefault();
        this.props.addItems(action, {app: this.props.app, group: this.props.code});
        return false;
    }

    expandCollapse = (e) => {
        this.setState(prevState => ({expand: !prevState.expand}));
        e.preventDefault();
        return false;
    }

    renderToolbarDropdown() {
        return (
            <div className="flex-shrink-0 toolbar d-sm-none">
                <DropdownButton title="A">
                    <Dropdown.Item eventKey="1">
                        <a className='icon icon-addall mr-2' href="#" onClick={e=>this.selectAll(e,'EVERYTHING')} ></a>
                        Add Everything
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="2">
                        <a className='icon icon-add mr-2' href="#" onClick={e=>this.selectAll(e,'ADD')} title='Add All Items (excluding specialized Items)'> </a>
                        Add All Items
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="3">
                        <a className='icon icon-toggle mr-2' href="#" onClick={e=>this.selectAll(e)} title='Toggle'> </a>
                        Toggle
                    </Dropdown.Item>

                    <Dropdown.Item eventKey="4">
                        <a className='ml-2 icon icon-clear mr-2' href="#" onClick={e=>this.selectAll(e,'REMOVE')} title='Clear All'> </a>
                        Clear All
                    </Dropdown.Item>
                </DropdownButton>
                
                <ModuleGroupAddedCount code={this.props.code} moduleCount={this.props.data.modules.length}/>
                
            </div>
        )
    }

    renderToolbar() {
        return (
            <div className="flex-shrink-0 toolbar d-none d-sm-block">
                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={
                  <Tooltip>
                    Add Everything
                  </Tooltip>
                }>
                    <a className='icon icon-addall' href="#" onClick={e=>this.selectAll(e,'EVERYTHING')} title='Add Everything (including specialized items)'> </a>
                </OverlayTrigger>

                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={
                  <Tooltip>
                    Add All Items<br/>
                    (excluding specialized items)
                  </Tooltip>
                }>
                    <a className='icon icon-add ml-2' href="#" onClick={e=>this.selectAll(e,'ADD')} title='Add All Items (excluding specialized Items)'> </a>
                </OverlayTrigger>

                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={
                  <Tooltip id="overlay-example">
                    Toggle Selection
                  </Tooltip>
                }>
                    <a className='icon icon-toggle ml-2' href="#" onClick={e=>this.selectAll(e)} title='Toggle'> </a>
                </OverlayTrigger>

                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={
                  <Tooltip id="overlay-example">
                    Clear All
                  </Tooltip>
                }>
                    <a className='ml-2 icon icon-clear' href="#" onClick={e=>this.selectAll(e,'REMOVE')} title='Clear All'> </a>
                </OverlayTrigger>
                
                <ModuleGroupAddedCount code={this.props.code} moduleCount={this.props.data.modules.length}/>
                
            </div>
        )
    }

    renderSummary() {
        return (
                <>
                <Badge pill variant="primary" style={{fontSize: '0.9em'}} className="mr-2" title={'this.props.data.modules.length.toString() + modules under ' + this.props.data.name}>{this.props.data.modules.length} modules</Badge>
                <a className="" href="#" style={{fontSize: '1em'}}>
                { !this.state.expand
                    ? 
                    'Click to show Modules'
                    :
                    'Click to hide Modules'
                }
                </a>
                </>
        )
    }

    render() {
        let multipliersSection = '';

        //console.log(this.props.data.name, this.props.data.multiplier);
        if (this.displayMultipliers.length != 0) {
            multipliersSection = (
                <Card className="multiplier-container" bg="light">
                <Card.Body className="row">
                {
                    this.displayMultipliers.map(
                      each =>
                      <PricingParameterPrimary key={ each.name}
                        name={ each.name}
                        label={each.label}
                        slabs={each.slabs}
                        slabConfig={each.slabConfig}
                      />
                    )
                }
                </Card.Body>
                </Card>
            );
        }

        let summary = '';
        let toolbar = '';
        let toolbarDropdown = '';
        if (!this.state.hideModuleControl) {
            summary = this.renderSummary();
            toolbar = this.renderToolbar();
            //toolbarDropdown = this.renderToolbarDropdown();
        }

        return (

            <div className={this.state.expand?'module':"module hideModule"}>

                <div className="module-header">
                    <div className="d-flex">
                        <div className="flex-grow-1 header-group" onClick={this.expandCollapse}>
                            <h3>{this.props.data.name}</h3>
                            {summary}
                        </div>
                        {toolbar}
                        {toolbarDropdown}
                    </div>

                    <div className="parameter multiplier-input">
                        {multipliersSection}
                    </div>

                </div>

                    

                {
                    this.props.data.modules.map((module, index) =>
                        <Module
                            app={this.props.app}
                            group={this.props.data.code}
                            key={module.code}
                            multipliers={this.props.data.multipliers}
                            code={module.code}
                            data={module}
                        />)
                }
            </div>
        )
    }
}

export default connect([], actions)(ModuleGroup);