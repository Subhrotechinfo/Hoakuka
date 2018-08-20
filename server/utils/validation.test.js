const expect = require('expect');
const {isRealString} =  require('./validation');
 //des  isRealString
  //should reject non-string values
  //should reject string with only spaces
  //should allow string with non-spaces characters

describe('isRealString ', () => {
  it('Should reject non real values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
  });

  it('Should reject string with only space', () => {
      var res  = isRealString('       ');
      expect(res).toBe(false);
  });

  it('Should allow string with non-spaces characters', () => {
      var res = isRealString('  Subhro  ');
      expect(res).toBe(true);
  });

});
