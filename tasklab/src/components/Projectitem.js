import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class Projectitem extends Component {
    getRowStyle = () => {
        return {
            background: 'lightgrey',
            padding: '10px',
            border: '1px solid black',
            borderCollapse: 'collapse',
            width: '100%'
            // color: this.props.task.percentCompleted === 0 ? 'red' : 'black'
        }
    }
    
    render() {
        const project = this.props.project;
        console.log(project.projectname);
        return (
            <React.Fragment>
                <tr style={this.getRowStyle()}><td>{project.projectname}</td><td>{project.groupname}</td><td>{project.starttime}</td><td>{project.endTime}</td><td>{project.projectstatus}</td></tr>
            </React.Fragment>

            // <div style={this.getStyle()}>
            //     <p>
            //         {project.starttime} - {project.endTime}: {project.projectname}

            //         {/* <button onClick={this.props.delTask.bind(this, id)} style={btnStyle}>Delete</button> */}
            //     </p>
                
            // </div>
        )
    }
}

const btnStyle = {
    background: 'red',
    color: 'white',
    padding: '5px 5px',
    float: 'right'
}

// PropTypes
Projectitem.propTypes = {
    project: PropTypes.object.isRequired
}

export default Projectitem
