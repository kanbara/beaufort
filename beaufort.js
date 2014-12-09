var windDesc = [
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

numberFromMps = function(mps) {
  var kmh = mps * 3.6; // scale factor, 1km/1000m * 3600s/hr
  return numberFromKmh(kmh);
}

descFromKmh = function(kmh) {
  return descFromNumber(numberFromKmh(kmh));
}

descFromMps = function(mps) {
  // convert to kmh because we already defined the kmh scale
  var kmh = mps * 3.6;
  return descFromKmh(kmh);
}

descFromNumber = function(beauNum) {
  if(beauNum > windDesc.length) return "";

  return windDesc[beauNum];
}

exports.descFromKmh = descFromKmh;
exports.numberFromKmh = numberFromKmh;
exports.descFromMps = descFromMps;
exports.numberFromMps = numberFromMps;

