import React, {Component} from "react";
import {withCookies} from "react-cookie";
import GanttItem from "./GanttItem";
import SelectGantt from "./SelectGantt";

class Gantt extends Component  {
    constructor(props) {
        super(props);

        const { cookies } = props;

    }


    render() {
        return (
                <div>
                    New Page
                    <SelectGantt />
                    <GanttItem />
                </div>                   
        );
    }
}

export default withCookies(Gantt)