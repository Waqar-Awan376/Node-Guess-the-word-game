var figlet = require('figlet');//NPM package that will print stylish message on the console
const prompt = require('prompt-sync')({ sigint: true });//NPM package that will allow us to take input on the node console rather than browser

/*~~~~~~~~~~ PRING MESSAGE ~~~~~~~~~~*/
figlet('GUESS THE WORD', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    gameInterface();//Start the game-->Go to line number 65
});
/*~~~~~~~~~~ PRING MESSAGE ~~~~~~~~~~*/


/*~~~~~~~~~~ WORD ARRAY ~~~~~~~~~~*/
const wordArray = ["Wonderland"];
let totalGuessAllowed = 10;
/*~~~~~~~~~~ WORD ARRAY ~~~~~~~~~~*/


/*~~~~~~~~~~ HELPER FUNCTIONS FOR THE GAME ~~~~~~~~~~*/
function replaceWithAsterisk(totalCharacter) {//this function just converts the original word to the list of asterisks to show it to the user
    let asterisk = '';
    for (let i = 0; i < totalCharacter; i++) {
        asterisk = asterisk + '*';
    }
    return asterisk;
}
function isLetter(letter) {
    return letter.match(/[a-z]/i) || letter.match(/[A-Z]/i);
}
function changeWord(guess, originalWord, encWord) {
    let encryptedWord = '';
    for (let i = 0; i < originalWord.length; i++) {
        if (originalWord[i] === guess) {//if it is the alphabet which the user guessed, show it to the user
            encryptedWord = encryptedWord + guess;
        }
        else {
            if (encWord[i] !== '*') {//check if encryptedWord has *
                encryptedWord = encryptedWord + encWord[i];//if it does not have it, it means the letter has already been exposed in the previous try
            }
            else {
                encryptedWord = encryptedWord + '*';//if it is *, it means the letter should be kept encrypted
            }
        }
    }
    return encryptedWord;
}
function checkGuess(guess, originalWord, encWord) {
    let newWord;
    if (originalWord.includes(guess)) {//check if the user guess is contained in the originalWord
        newWord = changeWord(guess, originalWord, encWord);
        return newWord;
    }
    else {
        totalGuessAllowed--;//reduce the total guess allowed by 1
        return encWord;//return encrypted word as it is because user has guessed the wrong alphabet and no further processing is required
    }
}
/*~~~~~~~~~~ HELPER FUNCTIONS FOR THE GAME ~~~~~~~~~~*/

/*~~~~~~~~~~ GAME INTERFACE ~~~~~~~~~~*/
function gameInterface() {
    let randomWordIndex = Math.floor(Math.random() * (wordArray.length));//Get any random number that will decide which word to guess from the array of words
    let word = wordArray[randomWordIndex].toLowerCase();//pick the word from the array
    let encryptedWord = replaceWithAsterisk(wordArray[randomWordIndex].length);
    let checkedWholeWord = false;
    let choosenWord;
    do {
        console.log(`You have ${totalGuessAllowed} guesses`);
        console.log("The word is:");
        console.log(encryptedWord);
        console.log("What is your guess?");
        console.log("Word(Write the whole word if you want to guess it at once):")
        choosenWord = prompt().toLowerCase();//take input from the user
        if (choosenWord === word) {
            console.log("Congradulations! You have guessed the word.")
            return;
        }
        if (choosenWord.length > 1) {
            console.log("Sorry! You have guessed it wrong.");
            checkedWholeWord = true;
            totalGuessAllowed--;
        }

        if (choosenWord.length === 1 && isLetter(choosenWord)) {//check if the user has entered a single alphabet
            encryptedWord = checkGuess(choosenWord, word, encryptedWord);
            if (encryptedWord === word) {
                console.log("Congradulations! You have guessed the word.")
                return;
            }
        }
        else {
            if (checkedWholeWord) {
                checkedWholeWord = false;
                continue;
            }
            if (choosenWord.length != 1) {
                console.log("*** PLEASE ENTER A SINGLE LETTER ***")
            }
            else {
                console.log("*** PLEASE ENTER AN ALPHABET ***")
            }
        }
    } while (totalGuessAllowed > 0);
    console.log("You Lose! You were not able to guess the word.");
    return;
};
/*~~~~~~~~~~ GAME INTERFACE ~~~~~~~~~~*/