const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    usToGB (string) {

        return "this is the text translated to British English"

    };

    gbToUS (string) {

        return "this is the text translated to US English"

    }

}

module.exports = Translator;