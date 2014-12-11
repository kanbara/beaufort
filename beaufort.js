var windName = [
               "calm", 
               "light air", 
               "light breeze", 
               "gentle breeze",
               "moderate breeze",
               "fresh breeze",
               "strong breeze",
               "near gale",
               "gale",
               "strong gale",
               "storm",
               "violent storm"
               ];

// each array element is the max windspeed in kmh for that beaufort 
// number (starting with 1)
// http://about.metservice.com/assets/downloads/learning/winds_poster_web.pdf
var kmhLimits = [1,6,11,19,30,39,50,61,74,87,102,117,177,249,332,418];

// input is kmh, output is beaufort number
// initialValue is 0 so we can safely add to it to get the reduce.
// TODO add code for (E)Fujita EF0-EF5, and Saffir-Simpson
// EF0: 8-11
// EF1: 12 
//  ...
// EF5: 16
// SafSim: Cat1/2: 12
//         Cat3/4: 13
//         Cat5  : 14
//

numberFromKmh = function(kmh) {
  var beauNum = kmhLimits.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + (kmh > currentValue ? 1 : 0);
  },0);

  return beauNum;
}

nameFromNumber = function(beauNum) {
  if(beauNum > windName.length) return "";

  return windName[beauNum];
}

valOrDefault = function(val, def) {
  if(def === undefined) def = "";
  return val === undefined ? def : val;
}

module.exports = function(speed, data) {
  
  // no behaviour for missing parameters...
  if(speed === undefined) return undefined;

  // if we have no json we at least want to set up the 
  // data object. This allows valOrDefault() to work
  if(data === undefined) data = {};

  var unit = valOrDefault(data.unit, 'kmh');
  var getName = valOrDefault(data.getName, true);

  var beauNum = undefined;

  switch (unit)
  {
    case 'kmh':
      beauNum = numberFromKmh(speed);
      break;
    case 'mps':
      speed *= 3.6;
      beauNum = numberFromKmh(speed);
  }

  if(getName) return nameFromNumber(beauNum);

  return beauNum;

};
