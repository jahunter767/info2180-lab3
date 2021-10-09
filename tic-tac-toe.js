window.onload = function(){
    var board = document.getElementById("board");
    var squares = board.children;

    board.style.display = "grid";

    for (s of squares){
        s.setAttribute("class", "square");
    } // End-for

} // End-window.onload
