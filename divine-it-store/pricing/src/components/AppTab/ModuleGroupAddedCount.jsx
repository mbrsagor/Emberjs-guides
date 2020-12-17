import React from 'react'
import {actions} from "../../core/store";
import {connect} from "unistore/react";
import Badge from 'react-bootstrap/Badge';

class ModuleGroupAddedCount extends React.Component {
    render() {
        const count = this.props.groupCount[this.props.code] || 0;
        let msg = 'No module selected';
        let shortMsg = '-';

        if (count) {
            msg = count.toString() + ' of ' + this.props.moduleCount.toString() + ' selected';
            shortMsg = count.toString() + ' / ' + this.props.moduleCount.toString() ;
        }

        return (
            <Badge pill variant={count==0?'warning':'success'} className="mr-2" >
                <span class="d-none d-sm-inline">{msg}</span>
                <span class="d-inline d-sm-none">{shortMsg}</span>
            </Badge>
        )
    }
}

export default connect(['groupCount'], actions)(ModuleGroupAddedCount);