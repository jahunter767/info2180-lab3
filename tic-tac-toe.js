"use strict";

class TicTacToe {
    static playerMarkers = ["X", "O"];

    constructor(){
        this.turn = 0;
        this.size = 3;
        this.chainLen = 3;
        this.board = [];

        var i, j;
        for (i = 0; i < this.size; i++){
            this.board[i] = [];
            for (j = 0; j < this.size; j++){
                this.board[i][j] = "";
            } // End-for
        } // End-for
    } // End-constructor

    click(x, y){
        if ((x < this.size) && (y < this.size) && (this.board[x][y] == "")){
            this.board[x][y] = TicTacToe.playerMarkers[
                this.turn % TicTacToe.playerMarkers.length];
            this.turn++;
        } // End-if
        return this.board[x][y];
    } // End-click
} // End-TicTacToe

window.onload = function(){
    var game = new TicTacToe();
    var board = document.getElementById("board");
    var squares = board.children;

    board.style.display = "grid";

    function squareClickEvent(e){
        var coord = e.target.id;
        coord = coord.split("-").map(c => parseInt(c));
        var mark = game.click(...coord);

        e.target.setAttribute("class", `${e.target.className} ${mark}`);
        e.target.textContent = mark;
        e.target.onclick = undefined;
    } // End-squareClickEvent

    var s, i = 0, row, col;
    for (s of squares){
        col = i % 3;
        row = (i - (i % 3)) / 3;
        s.setAttribute("class", "square");
        s.setAttribute("id", `${row}-${col}`);
        s.onclick = squareClickEvent;
        i++;
    } // End-for

} // End-window.onload
