var expect  = require('expect');

var {generateMessage,generateLocationMessage}  = require('./message');

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

describe('generateLocationMessage',() => {
  it('Should generate correct location object',()=>{
    var from='Ted';
    var latitude=15;
    var longitude=19;
    var url ='https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from,latitude,longitude)

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});

  });
});
