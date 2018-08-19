var expect  = require('expect');

var {generateMessage}  = require('./message');

describe('generateMessage',() => {
  it('should generate the correct message object',() => {
      //store res in variable
      var from ='Jend';
      var text = 'Some Message';
      var message = generateMessage(from,text);
      //assert createdAt in number
      expect(message.createdAt).toBeA('number');
      //assert from match
      //assert text match
      expect(message).toInclude({from, text});
  });
});
