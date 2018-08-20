const expect = require('expect');
const {Users} = require('./users');

describe('Users',() => {

//seed some data
beforeEach(() => {
  users = new Users();
  users.users = [{
    id:'1',
    name:'Sam',
    room:'DevOps'
  },{
    id:'2',
    name:'Jack',
    room:'C'
  },{
    id:'3',
    name:'Honey',
    room:'DevOps'
  }]
});

  it('should add new users',() => {
    var users = new Users();
    var user = {
      id:'1230',
      name:'subhro',
      room:'devops'
    };
    var res = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should retun names for DevOps', () => {
    var userList = users.getUserList('DevOps');
    expect(userList).toEqual(['Sam','Honey']);
  });
  it('Should retun names for C', () => {
    var userList = users.getUserList('C');
    expect(userList).toEqual(['Jack']);
  });
  //removeUser()
  it('Should remove a user',() => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user',() => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('Should find user',() => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('Should not find user',() => {
    var userId = '9';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

});
