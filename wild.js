
// function to shuffle an array
// for future use, not used in wild mode currently
function shuffleArray(array) {  
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
// function to pick n random items from an array
// used to pick out the items from the different categories
// for future use, not used in wild mode currently
function pickRandomItems(array, n) {

    let shuffled = [...array];

    shuffled = shuffleArray(shuffled);

    return shuffled.slice(0, n);
}

// function to generate bingo board
function generate_bingo_board(savedCombined = null, skipConfirm = false) {
    let combined;
    if (savedCombined) {
        combined = savedCombined;
    } else {
        if (!skipConfirm) {
        // confirm with the user before generating a new board
        // Star allies style layers :)
        let proceed = confirm("Generate a new bingo board?");
        if (!proceed) {return;}

        proceed = confirm("Are you sure?");
        if (!proceed) {return;}

        proceed = confirm("Are you really, really sure?");
        if (!proceed) {return;}

        proceed = confirm("This can't be undone. Are you REALLY sure?");
        if (!proceed) {return;}

        }
        combined = [">20 people in chat", "synced parasol kirbies", "matching theme", "same theme back to back (can be remix)", "@poyostar appearence",
                    "a theme from kirby fighters 1", "get 1000 xp on the leaderboard", "a wind theme", "a song that lasts exactly 86 seconds", "dreamland 1 gameplay",
                    "kirby slide gameplay", "big bean vine", "faded dreams of a phychomeddler", "the Italian anime opening theme", "a theme from each of the seasons",
                    "A theme with kirby VA", "friendly field", "3 themes in a row from the same game", "#1,2,3 of the leaderboard in chat at the same time", "shadow kirby chapter 5",
                    "people from 4 different continents in chat at the same time", "batamon in gameplay", "kirby dies in gameplay", "complete a normal bingo with all 25 spaces", "an old member coming back after 2+ years"];

        // reset marked cells for new board
        localStorage.setItem('wildMarkedCells', JSON.stringify([]));
    }

    // save the board
    localStorage.setItem('wildBingoBoard', JSON.stringify(combined));

    // generate the bingo board
    let tableHTML = '<table border="1" style="border-collapse: collapse;"><thead><tr><th>K</th><th>I</th><th>R</th><th>B</th><th>Y</th></tr></thead>';
    for (let i = 0; i < 5; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 5; j++) {
            const index = i * 5 + j;
            tableHTML += `<td style="padding: 5px;" onclick="markCell(this)" data-index="${index}">${combined[index]}</td>`;
        }
    tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // display the bingo board
    document.getElementById("bingo-board").innerHTML = tableHTML;

    // restore marked cells
    const marked = JSON.parse(localStorage.getItem('wildMarkedCells')) || [];
    marked.forEach(index => {
        const cell = document.querySelector(`td[data-index="${index}"]`);
        if (cell) {
            cell.classList.add('marked');
        }
    });
}

// function to mark a cell when clicked
function markCell(cell) {
    const index = parseInt(cell.dataset.index);
    let marked = JSON.parse(localStorage.getItem('wildMarkedCells')) || [];
    if (cell.classList.contains('marked')) {
        // remove from marked
        marked = marked.filter(i => i !== index);
    } else {
        // add to marked
        marked.push(index);
    }
    localStorage.setItem('wildMarkedCells', JSON.stringify(marked));
    cell.classList.toggle('marked');
}
function restoreBoard() {
    const savedBoard = localStorage.getItem('wildBingoBoard');
    if (savedBoard) {
        const combined = JSON.parse(savedBoard);
        generate_bingo_board(combined);
    } else {
        // generate a new board on first load without confirmations
        generate_bingo_board(null, true);
    }
}




window.addEventListener('load', restoreBoard);
