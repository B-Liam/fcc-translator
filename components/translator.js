const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    usToGB (string) {

        //Split the words into an array
        let splitString = string.split(" ");

        //need to remove trailling punctuation
        let finalIndex = splitString[splitString.length -1];
        let regexPunctuation = /[:;,.?!]$/
        //This creates the test function
        let regexTestPunctuation = new RegExp(regexPunctuation);
        //This calls the test function
        //And will return true
        let regexPunctuationResult = regexTestPunctuation.test(finalIndex)
        console.log("regexPunctuationResult", regexPunctuationResult);

        //If true, remove the final character from  string
        //And store it in a variable
        let punctionCharacter = finalIndex[finalIndex.length - 1];
        console.log('punctionCharacter', punctionCharacter);

        if (regexPunctuationResult == true ) {
            splitString[splitString.length -1] = splitString[splitString.length -1].slice(0, -1);
            console.log('splitString with punctuation removed', splitString);
        }

        //A variable to store the translation
        let translatedString = [...splitString];

        //go one by one through splitString and check for words

        //first check is for words that can be
        //directly translated from American to British
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];
            
            if ( wordToCheck in americanToBritishSpelling ) {
                console.log({
                    status: 'Word needs translating',
                    word: wordToCheck,
                    translatedWord: americanToBritishSpelling[wordToCheck]
                })
                let translatedWord = `<span class="highlight">${americanToBritishSpelling[wordToCheck]}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //second check is for American only words
        //This does not 'translate', but substitutes for the nearest English word
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];
            
            if ( wordToCheck in americanOnly ) {
                console.log({
                    status: 'Word needs translating',
                    word: wordToCheck,
                    translatedWord: americanOnly[wordToCheck]
                })
                let translatedWord = `<span class="highlight">${americanOnly[wordToCheck]}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //third check is for American times
        //needs to work for both 9:30 and 09:30
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];
            let regex = /^\d{1,2}:\d\d$/g;
            const testResult = wordToCheck.match(regex);
            
            if ( testResult != null ) {
                console.log({
                    action: "translate time",
                    string: wordToCheck
                })
                let regexToReplace = /:/;
                let translatedTime = wordToCheck.replace(regexToReplace, ".");
                let translatedWord = `<span class="highlight">${translatedTime}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //fourth check is for American titles
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i].toLowerCase();
            
            if ( wordToCheck in americanToBritishTitles ) {
                console.log({
                    status: 'Word needs translating',
                    word: wordToCheck,
                    translatedWord: americanToBritishTitles[wordToCheck]
                })
                // let translatedWord = `<span class="highlight">${americanToBritishTitles[wordToCheck]}</span>`;
                let translatedWord = americanToBritishTitles[wordToCheck];
                let splitTranslatedWord = translatedWord.split('');
                splitTranslatedWord[0] = splitTranslatedWord[0].toUpperCase();
                splitTranslatedWord = splitTranslatedWord.join('');
                translatedWord = `<span class="highlight">${splitTranslatedWord}</span>`;
                
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //When all this is done, join translated string back together
        //Ensuring there is a space between words
        translatedString = translatedString.join(' ');

        //I need to put back any required punctuation
        if (regexPunctuationResult == true ) {
            translatedString += punctionCharacter;
        }

        //additional check for two word strings
        let arrayOfKeys = Object.keys(americanOnly);
        console.log("arrayOfKeys:", arrayOfKeys);
        console.log("americanOnly", americanOnly[arrayOfKeys[0]])

        //A for loop to go through all the elements in arrayOfKeys
        for (let i = 0 ; i < arrayOfKeys.length ; i++ ) {

            //only replace if string not surrounded by letters
            //to left or right
            let regexLettersLeft = `[a-zA-Z\-]${arrayOfKeys[i]}`;
            let regexLettersRight = `${arrayOfKeys[i]}[a-zA-Z\-]`;

            //This stores true of fault if letters directly left or right
            let regexLeftCheck = new RegExp(regexLettersLeft,"ig");
            let regexRightCheck = new RegExp(regexLettersRight,"ig");

            //The test results
            let regexLeftTest = regexLeftCheck.test(translatedString);
            let regexRightTest = regexRightCheck.test(translatedString);

            //Do the replacement if know letter left or right
            //ie the one is not contained within another word
            if ( regexLeftTest == false && regexRightTest == false ) {

                //Creates a regular expression for replacement
                let regexReplace = `${arrayOfKeys[i]}`;
                var re = new RegExp(regexReplace,"ig");

                //Do the replacing
                translatedString = translatedString.replace(re, `<span class="highlight">${americanOnly[arrayOfKeys[i]]}</span>`)

            }
            
        }

        //This checks for whether the string has changed
        //If nothing has changed, it returns 'everything looks good'
        //If something has changed, it returns the translated string
        if ( string == translatedString ) {
            return "Everything looks good to me!"
        } else {
            return translatedString
        }
        

    };

    gbToUS (string) {

        //Split the words into an array
        let splitString = string.split(" ");

        //need to remove trailling punctuation
        let finalIndex = splitString[splitString.length -1];
        let regexPunctuation = /[:;,.?!]$/
        //This creates the test function
        let regexTestPunctuation = new RegExp(regexPunctuation);
        //This calls the test function
        //And will return true
        let regexPunctuationResult = regexTestPunctuation.test(finalIndex)
        console.log("regexPunctuationResult", regexPunctuationResult);

        //If true, remove the final character from  string
        //And store it in a variable
        let punctionCharacter = finalIndex[finalIndex.length - 1];
        console.log('punctionCharacter', punctionCharacter);

        if (regexPunctuationResult == true ) {
            splitString[splitString.length -1] = splitString[splitString.length -1].slice(0, -1);
            console.log('splitString with punctuation removed', splitString);
        }

        //A variable to store the translation
        let translatedString = [...splitString];

        //go one by one through splitString and check for words

        //first check is for words that can be
        //directly translated from British to American
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];

            //a function that returns a key name for a specified value
            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
              }

            //this calls the function
            const searchForWord = getKeyByValue( americanToBritishSpelling , wordToCheck )

            if ( searchForWord != undefined ) {

                let translatedWord = `<span class="highlight">${searchForWord}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;

            }
            
        }

        //second check is for British only words
        //This does not 'translate', but substitutes for the nearest English word
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];
            
            if ( wordToCheck in britishOnly ) {
                console.log({
                    status: 'Word needs translating',
                    word: wordToCheck,
                    translatedWord: britishOnly[wordToCheck]
                })
                let translatedWord = `<span class="highlight">${britishOnly[wordToCheck]}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //third check is for American times
        //needs to work for both 9:30 and 09:30
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i];
            let regex = /^\d{1,2}\.\d\d$/g;
            const testResult = wordToCheck.match(regex);
            
            if ( testResult != null ) {
                console.log({
                    action: "translate time",
                    string: wordToCheck
                })
                let regexToReplace = /\./;
                let translatedTime = wordToCheck.replace(regexToReplace, ":");
                let translatedWord = `<span class="highlight">${translatedTime}</span>`;
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //fourth check is for American titles
        for ( let i = 0 ; i < splitString.length ; i++ ) {

            let wordToCheck = splitString[i].toLowerCase();

            //a function that returns a key name for a specified value
            function getKeyByValue(object, value) {
                return Object.keys(object).find(key => object[key] === value);
              }

            //this calls the function
            const searchForTitle = getKeyByValue( americanToBritishTitles , wordToCheck )

            if ( searchForTitle != undefined ) {
                console.log({
                    status: 'Word needs translating',
                    word: wordToCheck,
                    translatedWord: searchForTitle
                })
                // let translatedWord = `<span class="highlight">${americanToBritishTitles[wordToCheck]}</span>`;
                let translatedWord = searchForTitle;
                let splitTranslatedWord = translatedWord.split('');
                splitTranslatedWord[0] = splitTranslatedWord[0].toUpperCase();
                splitTranslatedWord = splitTranslatedWord.join('');
                translatedWord = `<span class="highlight">${splitTranslatedWord}</span>`;
                
                //And then replace the existing word in translatedString
                translatedString[i] = translatedWord;
            }
        }

        //When all this is done, join translated string back together
        //Ensuring there is a space between words
        translatedString = translatedString.join(' ');

        //I need to put back any required punctuation
        if (regexPunctuationResult == true ) {
            translatedString += punctionCharacter;
        }

        //additional check for two word strings
        let arrayOfKeys = Object.keys(britishOnly);
        console.log("arrayOfKeys:", arrayOfKeys);
        console.log("britishOnly", britishOnly[arrayOfKeys[0]])

        //A for loop to go through all the elements in arrayOfKeys
        for (let i = 0 ; i < arrayOfKeys.length ; i++ ) {

            //only replace if string not surrounded by letters
            //to left or right
            let regexLettersLeft = `[a-zA-Z\-]${arrayOfKeys[i]}`;
            let regexLettersRight = `${arrayOfKeys[i]}[a-zA-Z\-]`;

            //Creates a regex to use in a test
            let regexLeftCheck = new RegExp(regexLettersLeft,"ig");
            let regexRightCheck = new RegExp(regexLettersRight,"ig");

            //The test results
            let regexLeftTest = regexLeftCheck.test(translatedString);
            let regexRightTest = regexRightCheck.test(translatedString);

            // console.log("regex left right check is", {
            //     leftCheck: regexLeftTest,
            //     rightCheck: regexRightTest
            // })

            //Do the replacement if know letter left or right
            //ie the one is not contained within another word
            if ( regexLeftTest == false && regexRightTest == false ) {

                let regexReplace = `${arrayOfKeys[i]}`;
                let re = new RegExp(regexReplace,"ig");

                //do the translating
                translatedString = translatedString.replace(re, `<span class="highlight">${britishOnly[arrayOfKeys[i]]}</span>`)

            }

            
        }

        //This checks for whether the string has changed
        //If nothing has changed, it returns 'everything looks good'
        //If something has changed, it returns the translated string
        if ( string == translatedString ) {
            return "Everything looks good to me!"
        } else {
            return translatedString
        }

    }

}

module.exports = Translator;