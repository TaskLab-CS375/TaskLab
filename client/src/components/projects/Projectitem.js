import {Link} from "react-router-dom";
import moment from "moment-timezone";

export default function Projectitem(props) {

    const rows = props.rows
    console.log(rows);
    console.log(rows.length);
    return (
        <div id="project-table-container">
            <table>
                <thead>
                <tr>
                    <th>Project Name</th>
                    <th align="center">Group</th>
                    <th align="center">Start</th>
                    <th align="center">End</th>
                    <th align="center">Status</th>
                </tr>
                </thead>

                <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                    <th component="th" scope="row"><Link to={"/gantt?projectid=".concat(row.id)}>{row.name}</Link></th>
                    <th align="right">{row.group}</th>
                    <th align="right">{new Date(row.start).toLocaleDateString("en-US")}</th>
                    <th align="right">{new Date(row.end).toLocaleDateString("en-US")}</th>
                    <th align="right">{row.status}</th>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}