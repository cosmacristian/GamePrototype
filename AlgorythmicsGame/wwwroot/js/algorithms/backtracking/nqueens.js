'use strict';
(function ($, AlgoRythmics) {
    var iterations = 0;
    var board;
    var indexTable;
    var xCoords = [0];
    var yCoords = new Array();

    function genereateBoard(size) {
        var board = [];
        for (var i = 0; i < size; i++) {
            board[i] = new Array(size);
        }
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                board[i][j] = 0;
            }
        }
        return board;
    }


    AlgoRythmics.startAlgorithm = async function (size) {
        $('.Tray').empty();
        board = genereateBoard(size);
        indexTable = new Array(size);
        xCoords = [0];
        yCoords = new Array();
        iterations = 0;
        //AlgoRythmics.print_board( await placeNextQueen(board, $('.Tray'), board.length, board.length - 1, 0, 0));
        await placeNextQueen(board, $('.Tray'), board.length, board.length - 1, 0, 0);
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            $('.Tray').empty();
        } else {
            await AlgoRythmics.cleanUp();
            AlgoRythmics.finishAlgorithm();
            AlgoRythmics.arrayIsSorted();
            //$('#congratulations').modal('show');
        }
    };

    async function hasConflict(board, row, column, container) {
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        await AlgoRythmics.highlightCodeBlock('.functionPromisingCode');
        var found = false;
        var indexContainer = container.siblings('.SideContainer').children('.IndexContainer');
        board[row][column] = 0;
        AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'checked');
        //setIndex(column,row,indexContainer);
        await AlgoRythmics.highlightCodeBlock('.forCycle');
        for (var i = 0; i < board.length; ++i) {
            AlgoRythmics.markSpot(row, i, board.length, container, 'checked');
            if (board[row][i] === 1) {
                found = true;
                AlgoRythmics.markSpot(row, i, board.length, container, 'found');
                AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
            }
            AlgoRythmics.markSpot(i, column, board.length, container, 'checked');
            if (board[i][column] === 1) {
                found = true;
                AlgoRythmics.markSpot(i, column, board.length, container, 'found');
                AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
            }
            if (row + i < board.length && column + i < board.length) {
                AlgoRythmics.markSpot(row + i, column + i, board.length, container, 'checked');
                if (board[row + i][column + i] === 1) {
                    found = true;
                    AlgoRythmics.markSpot(row + i, column + i, board.length, container, 'found');
                    AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
                }
            }
            if (row - i >= 0 && column + i < board.length) {
                AlgoRythmics.markSpot(row - i, column + i, board.length, container, 'checked');
                if (board[row - i][column + i] === 1) {
                    found = true;
                    AlgoRythmics.markSpot(row - i, column + i, board.length, container, 'found');
                    AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
                }
            }
            if (row + i < board.length && column - i >= 0) {
                AlgoRythmics.markSpot(row + i, column - i, board.length, container, 'checked');
                if (board[row + i][column - i] === 1) {
                    found = true;
                    AlgoRythmics.markSpot(row + i, column - i, board.length, container, 'found');
                    AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
                }
            }
            if (row - i >= 0 && column - i >= 0) {
                AlgoRythmics.markSpot(row - i, column - i, board.length, container, 'checked');
                if (board[row - i][column - i] === 1) {
                    found = true;
                    AlgoRythmics.markSpot(row - i, column - i, board.length, container, 'found');
                    AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'found');
                }
            }
        }
        await AlgoRythmics.highlightCodeBlock('.checkConflict');
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        AlgoRythmics.clearMarkings();
        if (!found) {
            await AlgoRythmics.highlightCodeBlock('.returnTrue');
            board[row][column] = 1;
            AlgoRythmics.markSpot(row, column, board.length, container, 'good');
            AlgoRythmics.markSpot(column, 0, board.length, indexContainer, 'good');
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            AlgoRythmics.clearMarkings();
            return false;
        }
        await AlgoRythmics.highlightCodeBlock('.returnFalse');
        return found;
    }

    async function placeNextQueen(board, parent, queens, column, x, y) {
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        await AlgoRythmics.highlightCodeBlock('.functionQueenCode');
        var rowContainer;
        if (queens === 0) {
            await AlgoRythmics.highlightCodeBlock('.compareElse');
            await AlgoRythmics.highlightCodeBlock('.printSolution');
            return board;
        }
        if (/*Math.max.apply(Math,xCoords) == x &&*/ !yCoords.includes(y)) {
            x = 0;
            rowContainer = $('<div>').addClass('row');
            parent.append(rowContainer)
            while (Math.max.apply(Math, xCoords) > x) {
                x += 1;
                if (Math.max.apply(Math, xCoords) >= x) {
                    AlgoRythmics.print_board(board, rowContainer).css('visibility', 'hidden');
                    //empty placeholder board
                }
            }
        } else {
            x += 1;
            while (/*xCoords.includes(x) &&*/ Math.max.apply(Math, xCoords) >= x) {
                if (/*!xCoords.includes(x) &&*/ Math.max.apply(Math, xCoords) >= x) {
                    rowContainer = parent.children().eq(y);
                    AlgoRythmics.print_board(board, rowContainer).css('visibility', 'hidden');
                    x += 1;
                    //empty placeholder board
                }
            }
            rowContainer = parent.children().eq(y);
        }
        xCoords.push(x);
        yCoords.push(y);
        var boardContainer = AlgoRythmics.print_board(board, rowContainer);
        boardContainer.children('.DecorContainer').children('.Board').css('border-color', 'yellow');
        for (var row = 0; row < board.length; row++) {
            
            board[row][column] = 1;
            indexTable[column] = row;
            iterations++
            AlgoRythmics.update_board(board, boardContainer, indexTable);
            await AlgoRythmics.highlightCodeBlock('.firstCycle');
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            await AlgoRythmics.highlightCodeBlock('.promising');
            if (!(await hasConflict(board, row, column, boardContainer.children('.DecorContainer').children('.Board')))) {
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    return;
                }
                await AlgoRythmics.highlightCodeBlock('.compareCode');
                if (queens-1 != 0) {
                    await AlgoRythmics.highlightCodeBlock('.firstHalfRecursiveCallCode');
                }
                if (await placeNextQueen(board, $('.Tray'), queens - 1, column - 1, x, y + 1)) {
                    if (AlgoRythmics.stopSignal) {
                        await AlgoRythmics.cleanUp();
                        return;
                    }
                    boardContainer.children('.DecorContainer').children('.Board').css('border-color', 'green');
                    return board;
                }
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    return;
                }
            }
            board[row][column] = 0;
            indexTable[column] = NaN;
        }
        boardContainer.children('.DecorContainer').children('.Board').css('border-color', 'black');
        AlgoRythmics.shade(boardContainer.children('.DecorContainer').children('.Board'), 50);
        AlgoRythmics.shade(boardContainer.children('.DecorContainer').children('.IndexContainer'), 50);
        return null
    }


    AlgoRythmics.initLimits = function (length) {

        
        AlgoRythmics.limits.firstHalfRecursiveCallSecondParamValue = "k+1";
        AlgoRythmics.limits.lowerLimitI = "1";
        AlgoRythmics.limits.upperLimitI = "n";
        AlgoRythmics.limits.compareFirstParam = "k";
        AlgoRythmics.limits.compareSecondParam = "n";
        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery, window.AlgoRythmics);