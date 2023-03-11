'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      let language = req.body.locale
      let string = req.body.text

      console.log({
        locale: language,
        text: string
      })

      //Reject missing text string
      if ( string == "" ) {
        res.json({
          error: 'No text to translate'
        })
        return
      }

      //Reject missing strings
      if ( language == undefined || string == undefined  ) {
          res.json({
            error: 'Required field(s) missing'
          })
          return
      }


      //Reject wrong locale
      if ( language != "american-to-british" || language != "british-to-american" ) {
        res.json({
          error: 'Invalid value for locale field'
        })
      }

      //Create a shared translate variable
      //To store the answer in
      let translate;

      //Call the appropriate translate function
      //Based on the locale provided
      if ( language == "american-to-british" ) {
        translate = translator.usToGB(string);
      }

      if ( language == "british-to-american" ) {
        translate = translator.gbToUS(string);
      }

      res.send({
        text: string,
        translation: translate
      })
      
    });
};
