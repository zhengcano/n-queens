/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var temp = [];
  for (var i = 0; i < n; i++){
    temp.push(0); //Fill temporary array with 'n' zeros
  }

  for (var j = 0; j < n; j++){
    var row = temp.slice();
    row[j] = 1;
    solution.push(row);
  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = n;

  // decision tree for solution is n! long
  // preset solutionCount to n
  // factorial:
  // for loop: iterate starting at 2, until n
  //   solution is solution * current loop number

  for (var i = 2; i < n; i++) {
    solutionCount *= i;
  }

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  if ( n === 1 ) {
    solution.push([1]);
  } else if (n > 3){
    if (n === 8){
      var col = n - 4;
      for (var i = 0; i < n/2; i++){
        var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
        row[col] =1;
        solution.push(row);
        col -= 2;
        if (col < 0){
          col = n - 2;
        }
      }

      col = n - 7;
      for (var i = 0; i < n/2; i++){
        var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
        row[col] =1;
        solution.push(row);
        col -= 2;
        if (col < 0){
          col = n - 1;
        }
      }

    } else if (n % 2 === 0) { //if n is an even number
      //set column to 2nd to last index
      var col = n - 2;

      for (var i = 0; i < n; i++){
        var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
        row[col] = 1; //set queen
        solution.push(row);
        col -= 2; //change column position to 2 spots to the left
        if (col < 0){
          col = n - 1;
        }
        //iteration over next row will move the position down 1 spot
        //moving queen down like a knight will ensure that the next queen
        //doesn't challenge the previous
      }
    } else { //for odd, initial position is 2 from right instead of 1
      var col = n - 3;
      for (var i = 0; i < n; i++){
        var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
        row[col] = 1; //set queen
        solution.push(row);
        col -= 2; //change column position to 2 spots to the left
        if (col === -2){
          col = n - 2;
        } else if (col === -1) {
          col = n - 1;
        }
        //iteration over next row will move the position down 1 spot
        //moving queen down like a knight will ensure that the next queen
        //doesn't challenge the previous
      }
    }
  } else {
    for (var i = 0; i < n; i++){
      var row = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
      solution.push(row);
    }
  }
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  // generate an n x n board with n queens on it
  // run the helper function tests
  //   if it passes, increment solutionCount
  // run this again but make a different board this time
  // profit!

  // constraints:
  //rows cannot be shared
  //indices cannot be shared
  //a new queen must be at least 2 index spaces away from the previous
  var board = new Board({"n":n});
/*
  var findSolution = function(queensSoFar, rowNum){
    if (queensSoFar < n){
      for (var i = 0; i < n; i++){
        if (!columns[i]){
          board[rowNum][i] = 1;
          columns[i] = true;
          queensSoFar++;
          findSolution(queensSoFar, rowNum+1);
        }
      }
    } else {
      if (!this.hasAnyRowConflicts)
    }
  };
*/
  var columns = [];
  for (var i = 0; i < n; i++){
    columns[i] = false;
  }

  //When filling board with queens, queensSoFar = the row we're adding to
  var findSolution = function(queensSoFar, taken){
    if (queensSoFar < n){
      for (var i = 0; i < n; i++){
        if (taken[i] === false){
          board.togglePiece(queensSoFar, i);
          taken[i] = true;
          findSolution(queensSoFar + 1, taken.slice());
          board.togglePiece(queensSoFar, i);
          taken[i] = false;
        }
      }
    } else {
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()){
        solutionCount++;
      }
    }
  };

  findSolution(0, columns);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};












