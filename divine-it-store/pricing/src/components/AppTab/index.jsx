import React, {useState} from 'react';
import ModuleGroup from './ModuleGroup';
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import AppHeaderWithMultiplier from "./AppHeaderWithMultiplier";

class AppTab extends React.Component {

    render() {
        return (
            <div className="app">
                <AppHeaderWithMultiplier title={this.props.data.name} app={this.props.data.code} />

                <div className="module-container">
                    {this.props.data.moduleGroups.map((moduleGroup, index) =>
                        <ModuleGroup
                            app={this.props.code}
                            key={index}
                            code={this.props.code + '-' + moduleGroup.code}
                            data={moduleGroup}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default AppTab;

