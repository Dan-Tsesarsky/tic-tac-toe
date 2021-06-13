import classes from "./GameView.module.css";
import imgX from "../../assets/cross-sign.png";
import imgO from "../../assets/o.png";
const GameView = (props) => {
  return (
    <div className={classes.game}>
      <div>
        <div onClick={async () => await props.makeMove(0)}>
          {props.board[0] ? (
            <img src={props.board[0] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(1)}>
          {props.board[1] ? (
            <img src={props.board[1] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(2)}>
          {props.board[2] ? (
            <img src={props.board[2] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
      </div>

      <div>
        <div onClick={async () => await props.makeMove(3)}>
          {props.board[3] ? (
            <img src={props.board[3] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(4)}>
          {props.board[4] ? (
            <img src={props.board[4] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(5)}>
          {props.board[5] ? (
            <img src={props.board[5] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
      </div>

      <div>
        <div onClick={async () => await props.makeMove(6)}>
          {props.board[6] ? (
            <img src={props.board[6] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(7)}>
          {props.board[7] ? (
            <img src={props.board[7] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
        <div onClick={async () => await props.makeMove(8)}>
          {props.board[8] ? (
            <img src={props.board[8] === "X" ? imgX : imgO} alt=""></img>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GameView;
