import React, { Component } from "react";
import GameView from "./GameView";
import classes from "./GameView.module.css";
import Button from "../Buttton/Button";
import ScoreBorad from "../scoreBoard/scoreBorad";
import tokenService from "../../services/jwtService";
import gameService from "../../services/gameService";

class GameRules extends Component {
  randomNum = Math.round(Math.random()) * 10;
  player1 = "X";
  player2 = "O";
  currntTurn = this.randomNum > 5 ? this.player1 : this.player2;

  state = {
    turn: this.currntTurn,
    move: 0,
    board: Array(9).fill(null),
    gameEnded: false,
    player1Wins: 0,
    player2Wins: 0,
    gameId: 0,
    ties: 0,
    haveWinner: false,
    busy: false,
  };

  nextTurn = () => {
    const { turn } = this.state;

    if (turn === "X") {
      this.setState({ turn: "O" });
    } else if (turn === "O") {
      this.setState({ turn: "X" });
    }
  };
  makeMove = async (i) => {
    const updatedboard = [...this.state.board];

    if (updatedboard[i]) return;
    if (!this.gameIsInProgress()) return;
    if (this.state.busy) return;

    updatedboard[i] = this.state.turn;

    await this.setState((prevState) => {
      if (prevState.board !== updatedboard)
        return { board: updatedboard, move: prevState.move + 1 };
    });
    let winningCombination = this.findWinningCombination();
    if (!winningCombination) {
      if (!this.state.board.includes(null)) {
        this.setRecord();
        return;
      }
      this.nextTurn();
    } else {
      this.setRecord(winningCombination);
    }
  };
  findWinningCombination() {
    const { board } = this.state;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combination;
      }
    }

    return null;
  }
  addGame = async () => {
    const board = [...this.state.board];
    const game = { board };
    const res = await gameService.addGame(game);
    const data = await res.data;

    const _id = data._id;
    if (!this.state.gameId) {
      this.setState({ gameId: _id });
    }
  };
  updateGame = async () => {
    if (!this.state.gameId) return;
    this.setState({ busy: true });
    const gameId = this.state.gameId;
    const board = [...this.state.board];
    const game = { board };
    const res = await gameService.editGame(game, gameId);
    const data = await res.data;

    this.setState({ board: data.board });
    this.setState({ busy: false });
  };

  gameIsInProgress() {
    const { board } = this.state;
    return !this.findWinningCombination() && board.includes(null);
  }

  setRecord = async (winningCase) => {
    await this.setState({ gameEnded: true });

    if (winningCase) {
      const { turn } = this.state;
      if (turn === this.player1) {
        const copyWinner1 = this.state.player1Wins;
        const updateWinner1 = copyWinner1 + 1;
        this.setState({ player1Wins: updateWinner1 });
      } else if (turn === this.player2) {
        const copyWinner2 = this.state.player2Wins;
        const updateWinner2 = copyWinner2 + 1;
        this.setState({ player2Wins: updateWinner2 });
      }
      this.setState({ haveWinner: true });
    } else {
      const copyTie = this.state.ties;
      const updateTie = copyTie + 1;
      this.setState({ ties: updateTie });
    }
    const records = await JSON.stringify({
      player2Wins: this.state.player2Wins,
      player1Wins: this.state.player1Wins,
      ties: this.state.ties,
    });
    await tokenService.setToken(records);
  };

  clearBoard = async () => {
    const restBoard = Array(9).fill(null);

    const rand = Math.round(Math.random()) * 10;
    const updatedTurn = rand > 5 ? this.player1 : this.player2;
    await this.setState((prevState) => {
      return {
        board: restBoard,
        gameEnded: false,
        gameId: 0,
        turn: updatedTurn,
        haveWinner: false,
        move: 0,
      };
    });
  };

  componentDidMount() {
    var retrievedObject = tokenService.getToken();
    let value = JSON.parse(retrievedObject);
    if (value) {
      const { player1Wins, player2Wins, ties } = value;
      this.setState({ player1Wins, player2Wins, ties });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.move === 0 && this.state.move === 1 && !this.state.gameId) {
      this.addGame();
    }
    if (
      this.state.move - prevState.move === 1 &&
      this.state.move > 1 &&
      this.state.gameId
    ) {
      this.updateGame();
    }
  }

  render() {
    const { turn, gameEnded, haveWinner, move } = this.state;

    return (
      <React.Fragment>
        <div className="header">
          <div className="header__turn">
            {" "}
            {!gameEnded &&
              (move ? ` now its ${turn}` : `Get stared  with ${turn}`)}
            {gameEnded && "Game Ended"}
          </div>
          {gameEnded && haveWinner && (
            <div className="header__status">{`the winner is ${turn}`}</div>
          )}
          {gameEnded && !haveWinner && (
            <div className="header__status">{`There is a tie`}</div>
          )}
          <Button clearBoard={this.clearBoard} className={"header__restart"}>
            Clear Borad
          </Button>
        </div>

        <GameView
          board={this.state.board}
          makeMove={this.makeMove}
          turn={this.state.turn}
        />
        <div className={classes.center}>
          <ScoreBorad
            player1Score={this.state.player1Wins}
            player2Score={this.state.player2Wins}
            ties={this.state.ties}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default GameRules;
