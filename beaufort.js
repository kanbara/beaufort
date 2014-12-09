/**
 * kmh [0,5.5,11,19,28,38,49,61,74,88,102,117,153,177,209,249,332,418,512]
 */

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
               "violent storm",
               "category one hurricane",
               "category two hurricane",
               "category three hurricane",
               "category four hurricane",
               "category five hurricane"
               ];

var kmhLimits = [1,7,12,20,31,40,51,62,75,88,103,118,154,178,210,250,333,419];

// input is kmh, output is beaufort number
// initialValue is 0 so we can safely add to it to get the reduce.
numberFromKmh = function(kmh) {
  return kmhLimits.reduce(function(previousValue, currentValue, index, array) {
    return previousValue + (kmh > currentValue ? 1 : 0);
  },0);
}

numberFromKmhFilter = function(kmh) {
  // speedSegments is an array of each beaufort number's max speed
  // for which the kmh passed in is less. The count of this array
  // is the beaufort number.
  //
  var speedSegments = kmhLimits.filter(function(element) {
    return kmh > element;
  });

  return speedSegments.length;
}

descFromKmh = function(kmh) {
  return descFromNumber(numberFromKmh(kmh));
}

descFromKmh2 = function(kmh) {
  return descFromNumber(numberFromKmhFilter(kmh));
}

descFromMps = function(mps) {
  // convert to kmh because we already defined the kmh scale
  var kmh = mps * (1/1000) * 60 * 60;
  return descFromKmh(kmh);
}

descFromNumber = function(beauNum) {
  return windDesc[beauNum];
}

exports.descFromKmh = descFromKmh;
exports.descFromKmh2 = descFromKmh2;
exports.numberFromKmh = numberFromKmh;
