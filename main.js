
// categories for bingo spaces
const generic_songs = ["A theme from crystal shards", "A theme from super star (ultra)", "A theme from mass attack",
                       "A theme from return to dream land (deluxe)", 
                       "A theme from triple deluxe", "A theme from planet robobot", 
                       "A theme from star allies", "A theme from forgotten land"/*mainline titles*/,
                       "A theme from air ride(rs)",  "A theme from rainbow curse", "A theme from (extra) epic yarn",
                       "A theme from fighters (2)", "A theme from team kirby clash deluxe/ super kirby clash"/*non-mainline titles*/];

const specific_songs = ["Green green", "CROWNED", "Mind in a program", "Gourmet race", 
                        "You just got ALIVEL MALLED", "HEAVY LOBSTER", "Float island", 
                        "Meta Knight's Revenge", "King Dedede's Theme",
                        "Strongest warrior in the galaxy", "Zero 2", "Moonstruck blossom", "The adventure begins rtdl"];
                    
const albums = ["An azifly theme aka 86 memories", "A theme from orchestra", "A theme from Kirbtunes", "A theme from kirby rip attack", 
                "A theme from kirby cafe", "A theme from the super star symphony", "A theme from smash"];

const generic_gameplay = ["A mainline game gameplay", "A spin-off game gameplay", "A game from before rtdl", "A game from after rtdl including rtdl"];

//const specific_gameplay = [];  (left empty for now)

const generic_themed_songs = ["A grass theme", "A water theme", "A space theme",  "A sky theme", "A desert theme", 
                              "A forest theme", "A mechanical theme", "A volcano theme", "A beach theme", "A wind theme", "A ice theme"];

const specific_themed_songs = ["A theme from one of the 4 knights", "A final boss theme", "A theme from the game in gameplay",
                               "A mini boss theme", "A remixed theme from previous games", "2 themes in a row from the same game", "A minigame theme", 
                               "A side mode theme eg. magolor's epilogue", "A theme with food in its name", "A dream friend theme"];

const miscellaneous = ["MARX JUMPSCARE (anything marx related show up)", "Get 300 xp in chat", "The parasol kirbies line up", 
                       "@kirbisbestpoyo appearence", "@hi_im_awkward appearance", "@kahomapler appearance",
                       ">12 people in chat", "<5 people in chat", "Background change", "Chat spam(At least 3 similar messages in a row)", 
                       "People from different continents in chat"];



// function to shuffle an array
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

        // pick the corrsponding number of random items from each category
        const shuffled_generic_songs = pickRandomItems(generic_songs, 4);
        const shuffled_specific_songs = pickRandomItems(specific_songs, 5);
        const shuffled_albums = pickRandomItems(albums, 2);
        const shuffled_generic_gameplay = pickRandomItems(generic_gameplay, 1);
        const shuffled_generic_themed_songs = pickRandomItems(generic_themed_songs, 3);
        const shuffled_specific_themed_songs = pickRandomItems(specific_themed_songs, 5);
        const shuffled_miscellaneous = pickRandomItems(miscellaneous, 5);

        // combine all the picked items into one array and shuffle them
        combined = [...shuffled_generic_songs, ...shuffled_specific_songs, ...shuffled_albums, ...shuffled_generic_gameplay,
                        ...shuffled_generic_themed_songs, ...shuffled_specific_themed_songs, ...shuffled_miscellaneous];
        combined = shuffleArray(combined);

        // reset marked cells for new board
        localStorage.setItem('markedCells', JSON.stringify([]));
    }

    // save the board
    localStorage.setItem('bingoBoard', JSON.stringify(combined));

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
    const marked = JSON.parse(localStorage.getItem('markedCells')) || [];
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
    let marked = JSON.parse(localStorage.getItem('markedCells')) || [];
    if (cell.classList.contains('marked')) {
        // remove from marked
        marked = marked.filter(i => i !== index);
    } else {
        // add to marked
        marked.push(index);
    }
    localStorage.setItem('markedCells', JSON.stringify(marked));
    cell.classList.toggle('marked');
}

// function to restore the board on page load
function restoreBoard() {
    const savedBoard = localStorage.getItem('bingoBoard');
    if (savedBoard) {
        const combined = JSON.parse(savedBoard);
        generate_bingo_board(combined);
    } else {
        // generate a new board on first load without confirmations
        generate_bingo_board(null, true);
    }
}

// restore on load
window.addEventListener('load', restoreBoard);





