let log = console.log;
//1
const createEnumerableProperty = () => {};

//2
const createNotEnumerableProperty = (propertyName) => {return propertyName;};
Object.defineProperty(Object.prototype, 'property', {value: 'value', enumerable: false });

//3 holymoly it's working
const createProtoMagicObject = () => {
  let func = () => 12;
  func.__proto__ = func.prototype;
  func.prototype = func.__proto__;
  return func;
};

//4
let inc = 0;
let incrementor = () => {
  function sum() {
    inc += 1;
    return sum;
  }

  sum.toString = function() {
    return ++inc;
  };

  return sum;
};


//5
let incounter = 0;
const asyncIncrementor = () =>{
  let promise = new Promise((resolve, reject) => {
    resolve(++incounter);
  });
  return incounter;
};

//6
function createIncrementer(){
  let arr = Array.from({ length: 11 }, (v, k) => k + 1); //mdn rules
  arr.next = function () {
    let count = arr[0];
    arr.shift();
    return {
      value: count
    };
  };

  return arr;
}

// return same argument not earlier than in one second, and not later, than in two
//7
const returnBackInSecond = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>resolve(data), 1000);
  });
};

//8
const getDeepPropertiesCount = (obj) => {
  let objString = JSON.stringify(obj).toString();
  return objString.split(':').length - 1;
};

//9
const createSerializedObject = () => {
  let obj = new String();
  return obj;
};

// const toBuffer = () => {}; unused? or secret

//10
const sortByProto = (arr) => {
  let depth = [], result = [];

  //searching max depth
  for(let i = 0, len = arr.length; i < len; i++){
    let next = arr[i].__proto__;
    let counter = 0;
    while(next != null){
      counter++;
      next = next.__proto__;
    }
    depth.push(counter);
  }

  //create sorted result
  for(let i = 0, len = depth.length; i < len; i++){
    let max = Math.max.apply(null, depth);
    let index = depth.indexOf(max);
    result.push(arr[index]);
    depth.splice(index, 1);
  }

  return result;
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;