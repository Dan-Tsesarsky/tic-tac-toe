import classes from "./scoreBorad.module.css"
const ScoreBorad = (props) => {
    return (<table className={classes.scoreBorad}>

    <thead>
        <tr>
            <th>
Player(x)
            </th>
            <th>
                Tie
            </th>
            <th>
            Player(O) 
            </th>
        </tr>
    </thead>

    <tbody>
    <tr>
            <td>
{props.player1Score}
            </td>
            <td>
            {props.ties}
            </td>
            <td>
            {props.player2Score}
            </td>
        </tr>



    </tbody>
    </table>  );
}
 
export default ScoreBorad;