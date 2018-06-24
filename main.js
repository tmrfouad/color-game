var squareCount = 6;
var container = document.querySelector('#container');
var squares;
var colors = generateRandomColors(squareCount);
var selectedColor = selectColor();

createSquares();


var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var btnReset = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

var primaryColor = 'steelblue';
var backColor = '#232323';

colorDisplay.textContent = selectedColor;

for (let i = 0; i < modeButtons.length; i++) {
    const modeButton = modeButtons[i];
    modeButton.addEventListener('click', () => {
        for (let ii = 0; ii < modeButtons.length; ii++) {
            const modeBtn = modeButtons[ii];
            modeBtn.classList.remove('selected');
        }
        modeButton.classList.add('selected');
        squareCount = +modeButton.id.split('-')[1];
        createSquares();
        reset();
    })
}

function createSquares() {
    var containerInnerHtml = '';
    for (let i = 0; i < squareCount; i++) {
        containerInnerHtml += '\n<div class="square"></div>';
    }
    container.innerHTML = containerInnerHtml;
    squares = document.querySelectorAll('.square');

    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        square.index = i;
        square.style.backgroundColor = colors[i];
        square.addEventListener('click', function () {
            var color = colors[this.index];

            if (color === selectedColor) {
                changeColors(color);
                messageDisplay.textContent = 'Correct.';
                btnReset.textContent = 'Play Again?'
            } else {
                this.style.backgroundColor = backColor;
                messageDisplay.textContent = 'Try Again!';
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(squareCount);
    selectedColor = selectColor();
    colorDisplay.textContent = selectedColor;
    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        square.style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = primaryColor;
    btnReset.textContent = 'New Colors';
    messageDisplay.textContent = '';
}

btnReset.addEventListener('click', () => {
    reset();
});

function changeColors(color) {
    h1.style.backgroundColor = color;
    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        square.style.backgroundColor = color;
    }
}

function selectColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        result.push('rgb(' + red + ', ' + green + ', ' + blue + ')');
    }
    return result;
}