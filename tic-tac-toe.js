"use strict";

class TicTacToe {
    static playerMarkers = ["X", "O"];

    constructor(){
        this.turn = 0;
        this.size = 3;
        this.chainLen = 3;
        this.board = [];
        this.winner = "";
        this.state = "IP";

        var i, j;
        for (i = 0; i < this.size; i++){
            this.board[i] = [];
            for (j = 0; j < this.size; j++){
                this.board[i][j] = "";
            } // End-for
        } // End-for
    } // End-constructor

    checkWinner(row, col){
        let translations = [[0, 1], [1, 1], [1, 0], [1, -1]];

        // Finding the starts and ends of all the chains that pass through
        // the given point
        var starts = [], ends = [], tl, r, c;
        var endPtDist = this.chainLen - 1;
        var correction;
        for (tl of translations){
            // Calculating the furthest possible start of the chain
            // Apply translation
            r = row - (endPtDist * tl[0]);
            c = col - (endPtDist * tl[1]);

            // Check board bounds
            correction = 0;
            if ((r < 0) || (c < 0)){
                correction = -(Math.min(r, c));
            } // End-if
            if (c >= this.size){
                correction = Math.max (correction,
                    c - (this.size - 1));
            } // End-if

            // Correct any overshoot
            r += correction * tl[0];
            c += correction * tl[1];
            starts[starts.length] = [r, c];

            // Calculating the furthest possible end of the chain
            // Apply translation
            r = row + (endPtDist * tl[0]);
            c = col + (endPtDist * tl[1]);

            // Check board bounds
            correction = 0;
            if ((r >= this.size) || (c >= this.size)){
                correction = Math.max(r, c) - (this.size - 1);
            } // End-if
            if (c < 0){
                correction = Math.max(correction, -c);
            } // End-if

            // Correct any overshoot
            r -= correction * tl[0];
            c -= correction * tl[1];
            ends[ends.length] = [r, c];
        } // End-for

        // Traversing all the chains to find winning chains
        var i, player = this.board[row][col];
        for (i = 0; i < translations.length; i++){
            var len = 0;
            r = starts[i][0];
            c = starts[i][1];
            tl = translations[i];
            while ((len < this.chainLen) &&
            !((r == ends[i][0] + tl[0]) && (c == ends[i][1] + tl[1]))){
                if (this.board[r][c] == player){
                    len += 1;
                    if (len == this.chainLen) {
                        this.winner = player;
                        return "W";
                    } // End-if
                } // End-if
                r += tl[0];
                c += tl[1];
            } // End-while
        } // End-for
        return (this.turn == this.size**2)?"D":"IP";
    } // End-checkWinner

    // Marks the given point on the board and returns the mark and general
    // game state information
    click(row, col){
        let result = {state: this.state,
                    winner: this.winner,
                    mark: ""};

        if ((row < this.size) && (col < this.size)){
            if (this.state == "IP"){
                if (this.board[row][col] == ""){
                    this.board[row][col] = TicTacToe.playerMarkers[
                        this.turn % TicTacToe.playerMarkers.length];
                    this.turn++;
                }// End-if

                this.state = this.checkWinner(row, col);
                result.mark = this.board[row][col];
                result.state = this.state;
                result.winner = (result.state == "W")?result.mark:"";
            }else{
                result.mark = this.board[row][col];
            }// End-if
        } // End-if
        return result;
    } // End-click
} // End-TicTacToe



window.onload = function(){
    var game = new TicTacToe();
    let board = document.getElementById("board");
    let squares = board.children;

    board.style.display = "grid";

    // Actions to take once an unmarkes square is clicked
    function squareClickEvent(e){
        let marked = TicTacToe.playerMarkers
            .map(m => m == e.target.textContent)
            .reduce((acc, m) => acc || m);
        if (!marked){
            var coord = e.target.id;
            coord = coord.split("-").map(c => parseInt(c));
            let gameStats = game.click(...coord);

            e.target.setAttribute("class",
                `${e.target.className} ${gameStats.mark}`);
            e.target.textContent = gameStats.mark;

            if (gameStats.state == "W"){
                let status = document.getElementById("status");
                status.setAttribute("class", "you-won");
                status.textContent = `Congratulations! ${gameStats.winner} is the Winner!`;
            }else if (gameStats.state == "D"){
                alert("Draw");
            } // End-if
        } // End-if
    } // End-squareClickEvent

    var s, i = 0, row, col;
    for (s of squares){
        col = i % 3;
        row = (i - (i % 3)) / 3;
        s.setAttribute("class", "square");
        s.setAttribute("id", `${row}-${col}`);
        s.addEventListener("click", squareClickEvent);
        s.addEventListener("mouseover", e =>
            e.target.setAttribute("class", `${e.target.className} hover`));
        s.addEventListener("mouseout", e =>
            e.target.setAttribute("class",
                e.target.className.replace(" hover", "")));
        i++;
    } // End-for
} // End-window.onload
