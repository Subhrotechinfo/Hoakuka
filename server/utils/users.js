[{
      id:'/#12sjbhsab145',
      name:'Subhro',
      room:'Developers'
}]

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)
// class Person{
//   constructor(name,age){
//     //console.log(name,age);
//     this.name = name;
//     this.age = age;
//   }
//   getUserDesc(){
//     return `${this.name} is ${this.age} years old.`;
//   }
// }
// var me = new Person('Subhro' , 25);
// console.log('this.name -> ', me.name);
// console.log('this.age -> ', me.age);
//
// var des = me.getUserDesc();
// console.log(des);

class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //return removed user
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room){
     var users = this.users.filter((user) =>  user.room === room);
     var namesArray =  users.map((user) => user.name);
     return namesArray;
  }

}

module.exports = {Users};
