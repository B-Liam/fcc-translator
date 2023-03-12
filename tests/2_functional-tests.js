const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    // put this in your functional test suite
    after(function() {
        chai.request(server).get('/api')
    });

    test('Translation with valid text and locale fields', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "text": 'This is how you spell colour in the United Kingdom of Great Britain and Northern Ireland.',
            "locale": 'british-to-american'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.text, 'This is how you spell colour in the United Kingdom of Great Britain and Northern Ireland.');
            assert.equal(res.body.translation, `This is how you spell <span class="highlight">color</span> in the United Kingdom of Great Britain and Northern Ireland.`);
            done();
          });
      });

      test('Translation with text and invalid locale field', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "text": 'This is how you spell colour in the United Kingdom of Great Britain and Northern Ireland.',
            "locale": 'british-to-irish'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid value for locale field');
            done();
          });
      });

      test('Translation with missing text field', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "locale": 'british-to-american'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });

      test('Translation with missing locale field', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "text": 'This is how you spell colour in the United Kingdom of Great Britain and Northern Ireland.'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field(s) missing');
            done();
          });
      });

      test('Translation with empty text', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "text": '',
            "locale": 'british-to-american'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'No text to translate');
            done();
          });
      });

      test('Translation with text that needs no translation', function(done) {
        chai
          .request(server)
          .post('/api/translate')
          .send({
            "text": 'This is correct.',
            "locale": 'british-to-american'
           })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.text, 'This is correct.');
            assert.equal(res.body.translation, `Everything looks good to me!`);
            done();
          });
      });

});
