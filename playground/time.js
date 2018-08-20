//time library moment
// var date = new Date();
// var months = ['Jan','Feb'];
// console.log(date.getMonth());
const moment =  require('moment');

// var date  = moment();
// date.add(5,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

//10:35 am
//6:01 am
var createdAt = 1234;
var date = moment(createdAt);
console.log('Date: ',date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
