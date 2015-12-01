// # Canter.js #

/*
    Canter.js Copyright 2015 iWebMa Ltd., Arnold Matyasi. 
    Canter.js may be freely distributed under the MIT license.
    Commercial and non-commercial use are permitted in compliance with the License.
 */

// Current version
const VERSION = "0.1.68";


// ![Canter logo](canter.png)

// Canter.js is a small dataset query processing helper library in JavaScript offering
// Declarative and Functional programming style composable functions.

// ## Features ##
// - Transducers like functional [composition](#composition)
// - [Tests](http://docs.loganis.com/canter/test) and [Benchmarks](http://docs.loganis.com/canter/test/benchmark.html)
// - Declarative style [query](#queryobj)
// - very small (canter-min.js.gz ~3KB)
// - no dependencies
// - does not extend built-in objects
// - [dataset](#dataset) functions
// - basic [statistical](#statistical) and [set-theory](#set-theory) and [sort](#sort) functions
// - should run on Cloud (Google Apps Script), IoT devices (Edison, RPi), Browser, Server (Node)

// ## Table of Contents ##
// - [Abbreviations](#abbreviations)
// - [Terminology](#terminology)
// - [Operators](#operators)
// - [Predicates](#predicates)
// - [Composition](#composition)
// - [Array](#array)
// - [String](#string)
// - [Date](#date)
// - [Object](#object)
// - [Dataset](#dataset)
//   - [Object Array](#object-array)
//   - [Matrix](#matrix)
//   - [Import-Export](#import-export)
// - [Statistical](#statistical)
// - [Set therory](#set-theory)
// - [Sort](#sort)

// ### Abbreviations ###


// `ar`, `arb` an __array__: `[]`<br />
// `args` arguments of a function in an array<br />
// `col` an object containing all columns and rows data: `[{}]`<br />
// `col1`, `col2` a column name string : `""`<br />
// `cols` column names in an array: `["",""]`<br />
// `cq` canter query object: `{}`<br />
// `ct` composition type string `""`<br />
// `f` a function<br />
// `fns` functions in an array: `[f,f,f]`<br />
// `i` an index number: `0`<br />
// `k` a key of an object: `{k: v}`<br />
// `kar` an array of keys of an obj: `["k","k","k"]`<br />
// `*li`, `arli`, `oarli` a number, the index of the last item of an array is (li - 1)<br />
// `mtx` a __matrix__ or array of arrays: `[[],[],[]]`<br />
// `n` a __number__: `0`<br />
// `oar`, `oarb` an __object array__: `[{}]`<br />
// `obj` a js __object__: `{}`<br />
// `q` query object: `{}`<br />
// `res` result variable, array `[]` or object `{}`<br />
// `row` an object containing all data of a row: `{}`<br />
// `row1`, `row2` a row in an `oar`<br />
// `rows` rows of an `oar`<br />
// `s` a __string__: `"a"`<br />
// `sep` a separator char: `","`<br />
// `v` value of a `k` in an `obj`: `{k: v}`<br />
// `x` a number: `0`<br />
// `y` a number: `0`<br />



// ## Terminology ##
// 


// ### Dataset formats###
// Dataset is a collection of metrical or dimensional values in the following formats:
// - `oar` - Object Array or JSON, [{},{}]
// - `mtx` - Matrix Array, [[],[]]
// - `csv` - String, Comma Separated Values

// #### OAR ####
// A (JSON) object is an array of objects containing key-value pairs
// > [{col1:v11,col2:v12,col3:v13},
// >  {col1:v21,col2:v22,col3:v23}]
//
// #### MTX ####
// A Matrix is an array of arrays containing ordered values. 
// First element is the column name array.
// Rest of the elements are value arrays
// > [[col1,col2,col3]
// >  [v11,v12,v13]
// >  [v21,v22,v23]]
//
// #### CSV ####
// CSV is string where each line is terminated by a newline char.
// First line is the column header.
// > col1,col2,col3
// > v11,v12,v13
// > v21,v22,v23
//

// ## Operators ##
// Basic operator helpers
var ops = {

    // #### ops.or ####
    // `ops.or(x,y)`<br />Returns true if any of `x` or `y` is true
    // > &gt; ops.or(true,false)
    // > true
    // > &gt; [true,false,true].reduce(ops.or)
    // > true
    or:  function(x, y)
    { return (x || y)},

    // #### ops.and ####
    // `ops.and(x,y)`<br />Returns true if both `x` and `y` are true
    // > &gt; ops.and(true,false)
    // > false
    // > &gt; [true,false,true].reduce(ops.and)
    // > false
    and: function(x, y)
    { return (x && y)},

    // #### ops.eq ####
    // `ops.eq(x,y)`<br />Returns true if `x` is equal to `y`
    // > &gt; ops.eq(true,true)
    // > true
    eq:  function(x, y)
    { return (x == y)},

    // #### ops.neq ####
    // `ops.neq(x,y)`<br />Returns true if `x` is not equal to `y`
    // > &gt; ops.neq(true, true)
    // > false
    neq: function(x, y)
    { return (x != y)},

    // #### ops.lt ####
    // `ops.lt(x,y)`<br />Returns true if `x` if less than `y`
    // > &gt; ops.lt(1, 2)
    // > true
    lt: function(x, y)
    { return (x < y)},

    // #### ops.lte ####
    // `ops.lte(x,y)`<br />Returns true of `x` is less than or equal to `y`
    // > &gt; ops.lte(1, 2)
    // > true
    lte: function(x, y)
    { return (x <= y)},

    // #### ops.gt ####
    // `ops.gt(x,y)`<br />Returns true if `x` is greater than `y`
    // > &gt; ops.gt(1, 2)
    // > false
    gt: function(x, y)
    { return (x > y)},

    // #### ops.gte ####
    // `ops.gte(x,y)`<br />Returns true if `x` is greater than or equal to `y`
    // > &gt; ops.gte(1, 2)
    // > false
    gte: function(x, y)
    { return (x >= y)},

    // #### ops.in ####
    // `ops.in(x,ar)`<br />Returns true if `ar` array contains `x`
    // > &gt; ops.in(1, [1, 2, 3])
    // > true
    in: function(x, ar)
    { return (ar.some(function(c)
		      { return (c == x) }))},

    // #### ops.nin ####
    // `ops.nin(x,ar)`<br />Returns true if `ar` array does not contain `x`
    // > &gt; ops.nin(1, [2, 3, 4])
    // > true
    nin: function(x, ar)
    { return (ar.every(function(c)
		       { return (c != x) }))},

    // #### ops.plus ####
    // `ops.plus(x,y)`<br />Returns the sum of `x` and `y`
    // > &gt; ops.plus(1, 2)
    // > 3
    // > &gt; [1, 2, 3].reduce(ops.plus)
    // > 6
    plus: function(x, y)
    { return 1 * x  + 1 * y},

    // #### ops.minus ####
    // `ops.minus(x,y)`<br />Returns the result of `x - y` calculation
    // > &gt; ops.minus(2, 1)
    // > 1
    // > &gt; var myminus = comp('->', [ops.minus, 10]);
    // > &gt; myminus(11)
    // > 1
    // > &gt; var myminus2 = comp('->>', [ops.minus, 10]);
    // > &gt; myminus2(11)
    // > -1
    minus: function(x, y)
    { return x - y},

    // #### ops.mult ####
    // `ops.mult(x,y)`<br />Returns the result of `x * y` calculation
    // > &gt; ops.mult(2, 3)
    // > 6
    // > &gt; var mymult = comp('->', [ops.mult, 2 * Math.PI]);
    // > &gt; mymult(1/Math.PI)
    // > 2
    // > &gt; map(mymult, [1/Math.PI, 2, 3, 4])
    // > [2, 12.566370614359172, 18.84955592153876, 25.132741228718345]
    // > &gt; map(mymult,[1/Math.PI, 2, 3, 4]).reduce(ops.plus)
    // > 58.548667764616276
    mult: function(x, y)
    { return x * y},

    // #### ops.div ####
    // `ops.div(x,y)`<br />Returns the result of `x / y` calculation
    // > &gt; ops.div(15, 3)
    // > 5
    div: function(x, y)
    { return x / y},

    // #### ops.inc ####
    // `ops.inc(x)`<br />Returns the result of `x + 1` calculation
    // > &gt; ops.inc(8)
    // > 9
    // > &gt; map(ops.inc, [1, 2, 3, 4, 5])
    // > [2, 3, 4, 5, 6]
    inc: function(x)
    { return 1 * x + 1},

    // #### ops.dec ####
    // `ops.dec(x)`<br />Returns the result of `x - 1` calculation
    // > &gt; ops.dec(12)
    // > 11  
    // > &gt; map(ops.dec, [2, 3, 4, 5, 6])
    // > [1, 2, 3, 4, 5]
    dec: function(x)
    { return x - 1},

    // #### ops.square ####
    // `ops.square(x)`<br />Returns the result of `x * x` calculation
    // > &gt; ops.square(8)
    // > 64
    square: function(x)
    { return x * x}
   
}



// ## Predicates ##
var is = {

    // #### is.Object ####
    // `is.Object(obj)`<br />Returns true if `obj` is an object
    // > &gt; is.Object([1])
    // > true
    // > &gt; is.Object({a: 1})
    // > true
    Object: function(obj)
    { if (typeof obj == 'object')
      { return true}
      else
      { return false}},

    // #### is.Array ####
    // `is.Array(ar)`<br />Returns true if `ar` is an array
    // > &gt; is.Array([1])
    // > true
    // > &gt; is.Array({a: 1})
    // > false
    Array: function(ar)
    { return Array.isArray(ar)},

    // #### is.Number ####
    // `is.Number(n)`<br />Returns true if `n` is a number
    // > &gt; is.Number(1)
    // > true
    Number: function(n)
    { return !isNaN(parseFloat(n)) && isFinite(n)},

    // #### is.String ####
    // `is.String(s)`<br />Returns true if `s` is a string
    // > &gt; is.String("abc")
    // > true
    String: function(s)
    { return typeof s === 'string'},

    // #### is.Indexed ####
    // `is.Indexed(ar)`<br />Returns true if `ar` is an indexed type, like string or array
    // > &gt; is.Indexed("abc")
    // > true
    // > &gt; is.Indexed([1])
    // > true
    // > &gt; is.Indexed({a: 1})
    // > false
    Indexed: function(ar)
    { return typeof ar === 'string' || is.Array(ar)},

    // #### is.Unique ####
    // `is.Unique(v,index,self)`<br />Returns true for first uniq value of `v` in an array
    // > &gt; [1, 2, 2, 3, 4].filter(is.Unique)
    // > [1, 2, 3, 4]
    Unique:  function(v, index, self)
    { return self.indexOf(v) === index},


    // #### is.Undefined ####
    // `is.Undefined(v)`<br />Returns true of value `v` is undefined
    Undefined: function(v)
    { return  v == undefined},

    // #### is.notUndefined ####
    // `is.notUndefined(v)`<br />Returns true of value `v` is not undefined
    notUndefined: function(v)
    { return  v != undefined}
}


// ## Composition ##

// #### comp ####
// `comp(ct, fn1, [fn2,arg1,arg2], ... fnn)`<br />Returns a new composed function<br />
// `ct` can be `->` result of previous function as the first argument of current function (thread-first)<br />
// or `->>` result of previous function as the last argument of current function (thread-last)<br />
// extra parameters can be passed to any function using the array notation: [ops.minus, 20]
// > &gt; var squareinc = comp("->", ops.square, ops.inc);
// > &gt; squareinc(10)
// > 101
// >
// > &gt; var sqIncMinDec1 = comp(
// >       "->", 
// >       ops.square, 
// >       ops.inc,
// >       [ops.minus, 20],
// >       ops.dec);
// >
// > &gt; sqIncMinDec1(2)
// > -16
// >
// > &gt; var sqIncMinDec2 = comp(
// >       "->>",
// >       ops.square,
// >       ops.inc,
// >       [ops.minus, 20],
// >       ops.dec);
// >
// > &gt; sqIncMinDec2(2)
// > 14
var comp = function()
{ var args = [].slice.call(arguments);
  var ct = first(args);
  var fns = rest(args);
  var fnsli = fns.length ;
  return function(f)
  { var res = f;
    for (var i=0; i < fnsli;  i++)
    { var fnsname,fnsarg;
      var fnsi = fns[i];
      if (!is.Array(fnsi))
      {  res = fnsi(res)}
      else
      { fnsname = first(fnsi);
	fnsarg = rest(fnsi);
	if (ct == '->')
	{ res = fnsname(res,fnsarg)}
	else if (ct == '->>')
	{ res = fnsname(fnsarg,res) }
	else
	{ res = fnsname(fnsarg,res)}}}
    return res}}



// #### map ####
// `map(f, ar)`<br />Returns a new array with values calculated by applying f to elements of `ar`
// > &gt; map(ops.inc, [1, 2, 3, 4, 5])
// > [2, 3, 4, 5, 6]
var map = function(f, ar)
{ var arli = ar.length;
  var res = new Array(arli);
  for (var i = 0; i <  arli; i++)
  { res[i] = f(ar[i])}
  return res}

// ## Array ##
// Array helper functions

// #### uniq ####
// `uniq(ar)`<br />Returns a unique array
// > &gt; uniq([1,2,1,3,2,3])
// > [1, 2, 3]
var uniq = function(ar)
{ return ar.filter(is.Unique)}

// #### range ####
// `range(n)`<br />Returns a new array with size `n` and incremental values from 0
// > &gt; range(5)
// > [0, 1, 2, 3, 4]
var range = function(n)
{ var res = new Array(n);
  for (var i = 0; i < n; i++)
  { res[i] = i}
  return res}



// #### cons ####
// `cons(x,ar)`<br />Returns a new array where `x` is the first element and `ar` is the rest
// > &gt; cons(10, [1, 2, 3])
// > [10, 1, 2, 3]
var cons = function(x,ar)
{ var res = ar.slice(0);
  res.unshift(x);
  return res}

// #### conj ####
// `conj(ar,x)`<br />Returns a new array where `x` is added as the last element to `ar`
// > &gt; conj([1, 2, 3], 10)
// > [1, 2, 3, 10]
var conj = function(ar,x)
{ var res = ar.slice(0);
  res.push(x);
  return res}

// #### merge ####
// `merge(ar, arb)`<br /> Returns a merged array of array `ar` and `arb`
// > &gt; merge([1, 2], [3, 4])
// > [1, 2, 3, 4]
// > &gt; merge("ab", "cd")
// > "abcd"
var merge = function(ar,arb)
{ return ar.concat(arb)}

// #### nth ####
// `nth(ar,i)`<br />Returns the `i`th element of array `ar` or a string
// > &gt; nth([1, 2, 3],0)
// > 1
// > &gt; nth("abc",0)
// > "a"
var nth = function(ar, i)
{ return ar[i]}

// #### first ####
// `first(ar)`<br />Returns the first element of array `ar` or a string
// > &gt; first([1, 2, 3])
// > 1
// > &gt; first("abc")
// > "a"
var first = function(ar)
{ return nth(ar, 0)}

// #### second ####
// `second(ar)`<br />Returns the second element of array `ar` or a string
// > &gt; second([1, 2, 3])
// > 2
// > &gt; second("abc")
// > "b"
var second = function(ar)
{ return nth(ar, 1)}

// #### rest ####
// `rest(ar)`<br />Returns all but the first element of array `ar` or a string
// > &gt; rest([1, 2, 3])
// > [2, 3]
// > &gt; rest("abc")
// > "bc"
var rest = function(ar)
{ return ar.slice(1)}


// #### last ####
// `last(ar)`<br />Returns the last element of array `ar` or a string
// > &gt; last([1, 2, 3])
// > 3
// > &gt; last("abc")
// > "c"
var last = function(ar)
{ return nth(ar, ar.length - 1)}

// #### interpose ####
// `interpose(sep,ar)`<br />Returns an interposed string from array `ar` using separator char `sep`
// > &gt; interpose(",",["a","b","c"])
// > "a,b,c"
var interpose = function(sep,ar)
{ return ar.join(sep)}

// ## String ##

// #### strim ####
// `strim(s)`<br />Trim a string
// > &gt; strim(" abc def  ")
// > "abc def"
var strim = function(s)
{ return s.trim()}

// #### stringToNumber ####
// `stringToNumber(s)`<br />Returns a parsed number if possible from string
// > &gt; stringToNumber(" 42 ")
// > 42
var stringToNumber = function(s)
{ if (is.Number(s))
  { return parseFloat(s)}
  else
  { return s}}

// #### strimNumber ####
// `strimNumber(s)`<br />Returns a trimmed and if possible a parsed number from string
// > &gt; strimNumber(" 42 ")
// > 42
var strimNumber = comp(
    "->",
    strim,
    stringToNumber);

// #### splitColnames ####
// `splitColnames(s)`<br />Splits a string at commas and returns an array of strings.
// > &gt; splitColnames("a,b,c")
// > ["a", "b", "c"]
var splitColnames = function(s)
  { var cols;
    if (is.String(s))
    { cols = s.split(",")}
    else
    { cols = s.slice()}
    return cols}


// ## Date ##

var dt = {
    
    now: function()
    { return new Date()},
    
    getYear: function(d)
    { return d.getUTCFullYear()},

    getMonth: function(d)
    { return d.getUTCMonth() * 1 + 1},

    getDay: function(d)
    { return d.getUTCDate()}
/* 
   getUTCFullYear() // y
   getUTCMonth()    // m
   getUTCDate()     // d


*/
}



// ## Object ##

// #### keys ####
// `keys(obj)`<br />Returns the keys of an object
// > &gt; keys({a:1,b:2})
// > ["a", "b"]
var keys = function(obj)
{ if (! is.Object(obj)) return [];
  return Object.keys(obj)}

// #### vals ####
// `vals(obj)`<br />Returns the values of an object
// > &gt; vals({a:1,b:2})
// > [1, 2]
var vals = function(obj)
{ if (! is.Object(obj)) return [];
  var kar = keys(obj);
  var karli = kar.length;
  var res = new Array(karli);
  for (var i=0; i < karli; i++)
  { res[i] = obj[kar[i]]}
  return res}



// #### getv ####
// `getv(obj,key)`<br />Returns the value of key `key` of object `obj`
// > &gt; var o1 = {a:1,b:11};
// > &gt; var o2 = [{a:1,b:11},{a:2,b:12}];
// > &gt; var myb = comp("->", [getv, "b"]);
// > &gt; myb(o1)
// > 11
// > &gt; map(myb, o2)
// > [11, 12]
var getv = function(obj,key)
{ return obj[key]}

// #### getkv ####
// `getkv(obj,key)`<br />Returns both key and value of key `key` of object `obj`
// > &gt; getkv({a: 1}, "a")
// > {a: 1}
var getkv = function(obj,key)
{ var res = {};
  res[key] = obj[key];
  return res}

// #### selectKeys ####
// `selectKeys(obj, ar)`<br />Returns a new object containing only the values of input keys in array `ar`
// > &gt; selectKeys({a:1,b:2,c:3}, ["a","b"])
// > {a: 1, b: 2} 
var selectKeys = function (obj, ar)
{ res = {};
  var arli = ar.length;
  for (var i=0; i < arli;  i++)
  { res[ar[i]] = obj[ar[i]]}
  return res}


// #### count ####
// `count(obj)`<br />Count the number of keys of an object
// > &gt; count({a: 1, b:2})
// > 2
// > &gt; count([1,2])
// > 2
// > &gt; count("ab")
// > 2
var count = function(obj)
{ if (is.Object(obj) && !is.Array(obj))
  { return keys(obj).length}
  else
  { return obj.length}}


// ##### queryObj #####
// `queryObj(obj,q)`<br />Returns a boolean after evaluating `q` queries on `obj`
// > &gt; var obj = {a:11,b:12,c:13};
// > &gt; queryObj(obj,{a:11})
// > true
// > &gt; queryObj(obj,{a:1})
// > false
// > &gt; queryObj(obj,{a: {eq: 11}})
// > true
// > &gt; queryObj(obj,{a: {neq: 111}})
// > true
// > &gt; queryObj(obj,{a: {in: [1,11,111]}})
// > true
// > &gt; queryObj(obj,{a: {nin: [1,111]}, b: {nin: [2,22]}})
// > true
// > &gt; queryObj(obj,{a: {lte: 11}, b: {gte: 12}})
// > true
// > &gt; queryObj(obj,{a: {lt: 12}, b: {gt: 11}})
// > true
var queryObj = function(obj,q)
{ var res = [];
  var kar = keys(q);
  var karli = kar.length;
  for (var i = 0; i < karli; i++)
  { var op, val;
    if (is.Object(q[kar[i]]))
    { op = keys(q[kar[i]]);
      val = q[kar[i]][op]}
    else
    { op = 'eq';
      val = q[kar[i]]}
    var opfn = ops[op];
    res.push(opfn(obj[kar[i]], val))}
  return res.reduce(ops.and)
}


// #### filterObj ####
// `filterObj(obj,f)`<br />Filters elements of object `obj` by applying function `f` to values of `obj`, returns a new filtered object 
// > &gt; var obj = {a: 1, b: "b", c: [], d: {}, f: "11"};
// > &gt; filterObj(obj, is.Number);
// > {a: 1, f: 11}
var filterObj = function(obj,f)
{ var res = {};
  var kar = keys(obj);
  var karli = kar.length;
  for (var i = 0; i < karli; i++)
  { if (f(obj[kar[i]]))
    { res[kar[i]] = obj[kar[i]]}}
  return res}

// #### cloneObject ####
// `cloneObject(obj)`<br />Returns a new object that has the same keys and values as object `obj`
// > &gt; cloneObject({a: 1})
// > {a: 1}
var cloneObject = function(obj)
{ var res = {};
  var kar = keys(obj);
  var karli = kar.length;
  for (var i = 0; i < karli; i++)
  { res[kar[i]] = obj[kar[i]]}
  return res}

// #### mergeObjects ####
// `mergeObjects(obj,objb)`<br />Merge two objects, `objb` to `obj`
// > &gt; mergeObjects({a: 1},{b:2})
// > {a: 1, b: 2}
var mergeObjects = function(obj,objb)
{ var res = cloneObject(obj);
  var kar = keys(objb);
  var karli = kar.length;
  for (var i = 0; i < karli; i++)
  { res[kar[i]] =  objb[kar[i]]}
  return res}

// ## Dataset ##

// ### Object Array ###

// #### colNames ####
// `colNames(oar)`<br />Returns the column names (keys) of the first row of `oar`
// > &gt; colNames([{a: 1, b:2}])
// > ["a", "b"]
var colNames =  function(oar)
{ return keys(oar[0])}

// #### selectColumn ####
// `selectColumn(colnames, oar)`<br />
// Filter `oar` to selected columns. 
// Returns an `oar`.<br />
// `colnames` can be: string `'col1,col2'` or array
// `['col1','col2']`.<br />
// > &gt; var oar = [{a:11,b:12,c:13},{a:21,b:22,c:23},{a:31,b:32,c:33}];
// > &gt; selectColumn("a",oar)
// > [{"a":11},{"a":21},{"a":31}]
// > &gt; selectColumn("a,c",oar)
// > [{"a":11,"c":13},{"a":21,"c":23},{"a":31,"c":33}]
var selectColumn = function(colnames, oar)
{ var oarli = oar.length;
  var res = new Array(oarli);
  var cols = splitColnames(colnames);
  var colsli = cols.length;
  for (var row = 0; row < oarli; row++)
  { var onerow = {};
    for (var col = 0; col < colsli; col++)
    { onerow[cols[col]] = oar[row][cols[col]]}
    res[row]=onerow}
  return res}

// #### pluck ####
// `pluck(colnames,oar)`<br />Pluck, calls selectColumn with `mtx` as outType, returns a flattened array if only one column is selected.
// > &gt; var oar = [{a:11,b:12,c:13},{a:21,b:22,c:23},{a:31,b:32,c:33}];
// > &gt; pluck("a",oar)
// > [11,21,31]
// > &gt; pluck("a,c",oar)
// > [[11,13],[21,23],[31,33]]
var pluck = function(colnames,oar)
{ var res = rest(oar2mtx(selectColumn(colnames, oar)));
  if (res[0].length == 1)
  { return flatten(res)}
  else
  { return res}
}


// #### queryOar ####
// `queryOar(oar,q)`<br />Queries object `oar` using `q`, returns matching rows
// > &gt; var oar = [{a:11,b:12,c:13},{a:21,b:22,c:23},{a:31,b:32,c:33}];
// > &gt; queryOar(oar, {a: {gt: 11}, b:{lte: 22}})
// > [{"a":21,"b":22,"c":23}]
var queryOar = function(oar,q)
{ var res = [];
  var oarli = oar.length;
  for (var i = 0; i < oarli; i++)
  { if (queryObj(oar[i],q))
    { res.push(oar[i])}}
  return res}


// #### indexBy ####
// `indexBy(oar, lookupkey)`<br />Create a constant time lookup table for values of `lookupkey` in `oar` 
// > &gt; var oar = [{a:11,b:12,c:13},{a:21,b:22,c:23},{a:31,b:32,c:33}];
// > &gt; var lta = indexBy(oar,"a");
// > &gt; lta[21]
// > 1
var indexBy = function(oar, lookupkey)
{ var res = {};
  var oarli = oar.length;
  for (var i=0; i < oarli; i++)
  { res[oar[i][lookupkey]] = i}
  return res}



// #### addColumn ####
// `addColumn(colname, values, oar)`<br />Add a new column with values to an `oar`, returns a new `oar`
// > &gt; addColumn("c",[13,23],[{a:11,b:12},{a:21,b:22}])
// > [{"a":11,"b":12,"c":13},{"a":21,"b":22,"c":23}]
var addColumn = function(colname, values, oar)
{ var oarli = oar.length;
  var res = new Array(oarli);
  for (var i = 0; i < oarli; i++)
  { var oneobj = cloneObject(oar[i]);
    oneobj[colname] = values[i];
    res[i] = oneobj}
  return res}



// ### Matrix ###

// #### flatten ####
// `flatten(mtx)`<br>Returns a flattened array
// > &gt; flatten([[1],[2]])
// > [1, 2]
var flatten = function(mtx)
{ return [].concat.apply([],mtx)}

// #### flatuniq ####
// `flatuniq(mtx)`<br />Returns a flattened uniq array
// > &gt; flatuniq([[1,2],[2,3],[3,4]])
// > [1, 2, 3, 4]
var flatuniq = comp(
    "->",
    flatten,
    uniq);


// #### transpose ####
// `transpose(mtx)`<br />Returns a new transposed matrix array from `mtx`. 
// > &gt; transpose([['Alice',  'Bob', 'Rich'],
// >             [33, 24, 42],
// >             [false, false, true]])
// >> [["Alice",33,false],
// >>  ["Bob",24,false],
// >>  ["Rich",42,true]]
// >
// > &gt; transpose([["Alice",33,false],
// >             ["Bob",24,false],
// >             ["Rich",42,true]])
// >> [["Alice","Bob","Rich"],
// >>  [33,24,42],
// >>  [false,false,true]]
var transpose = zip = unzip = function(mtx)
{ var arli = mtx[0].length;
  var mtxli = mtx.length;
  var res = new Array(arli);
  for (var i = 0; i < arli; i++)
  { var resrow = new Array(mtxli);
    for (var j = 0; j < mtxli; j++)
    { resrow[j] = mtx[j][i]}
    res[i] = resrow}
  return res}


// #### joinObjects ####
// `joinObjects(mtx,joinkey)`<br />Join two or more object arrays using a joinkey, where
// `mtx` is an array of `oar`-s ex. [oar, oarb, oarc], 
// `joinkey` is used as key for joining objects, it must have unique values.
// > &gt; var oar = [{a: 11, b:12},{a: 21, b:22}];
// > &gt; var oarb = [{a: 11, c:13},{a: 21, c:23}];
// > &gt; var oarc = [{a: 11, d:14},{a: 21, d:24}];
// > &gt; joinObjects([oar, oarb, oarc],"a")
// > [{"a":11,"b":12,"c":13,"d":14},{"a":21,"b":22,"c":23,"d":24}]
var joinObjects = function (mtx,joinkey)
{ var joinTwoOars = function(oar,oarb)
  { var oarli = oar.length;
    var res = new Array(oarli);
    var lookupTable = indexBy(oarb,joinkey);
    for (var i=0; i < oarli;  i++)
    { res[i] = mergeObjects(oar[i],oarb[lookupTable[oar[i][joinkey]]])}
    return res}
  return mtx.reduce(joinTwoOars)}


// ### Import-Export ####

// #### mtx2oar ####
// `mtx2oar(mtx)`<br />Converts matrix array `mtx` to `oar` using first row as `colnames`
// > &gt; mtx2oar([["a","b"],[1,2],[3,4],[5,6]])
// > [{"a":1,"b":2},{"a":3,"b":4},{"a":5,"b":6}]
var mtx2oar = function(mtx)
{ res = [];
  var colnames = first(mtx);
  var colli = colnames.length;
  var rowli = mtx.length;
  for (var i=1; i<rowli;  i++)
  {  obj = {};
     for (var j=0; j<colli; j++)
     { obj[colnames[j]] = mtx[i][j]}
     res.push(obj)}
  return res}

// #### oar2mtx ####
// `oar2mtx(oar)`<br />Converts object array `oar` to a matrix
// > &gt; oar2mtx([{"a":1,"b":2},{"a":3,"b":4},{"a":5,"b":6}])
// > [["a","b"],[1,2],[3,4],[5,6]]
var oar2mtx = function(oar)
{ var cols = colNames(oar);
  var oarli = oar.length;
  var rowli = cols.length;
  var res = new Array(oarli);
  for (var i = 0; i < oarli; i++)
  { var onerow = new Array(rowli);
    for (var j = 0; j < rowli; j++)
    { onerow[j] = oar[i][cols[j]]}
    res[i] = onerow}
  return cons(cols, res)}

// #### csv2mtx ####
// `csv2mtx(sep, s)`<br />Converts CSV string `s` to a matrix array using separator char `sep`
// > &gt; var csv = "a,b\n1,2\n21,22\n31,32"
// > &gt; csv2mtx(",",csv)
// > [["a","b"],[1,2],[21,22],[31,32]]
var csv2mtx = function(sep, s)
{ if (sep == undefined) var sep = ",";
  var splitRow = function(res,row)
  { res.push(map(strimNumber, row.split(sep)));
    return res}
  return s.split("\n").reduce(splitRow, [])}

// #### csv2oar ####
// `csv2oar(sep, s)`<br />Converts CSV string `s` to a dataset object using separator char `sep`
// > &gt; var csv = "a,b\n1,2\n21,22\n31,32"
// > &gt; csv2oar(",",csv)
// > [{"a":1,"b":2},{"a":21,"b":22},{"a":31,"b":32}]
var csv2oar = function(sep, s)
{ return mtx2oar(csv2mtx(sep,s))}

// #### oar2csv ####
// `oar2csv(sep, obj)`<br />Converts object `obj` to a CSV string using separator char `sep`
// > &gt; var ar = [{a:1,b:2},{a:21,b:22},{a:31,b:32}];
// > &gt; oar2csv(",", ar)
// > "a,b\n1,2\n21,22\n31,32"
var oar2csv = function(sep, oar)
{ var iposeVals = comp("->>", vals, [interpose, sep]);
  var csvAr = cons(colNames(oar), map(iposeVals, oar));
  return interpose("\\n",csvAr)}




// ## Statistical ##

var stat =  {

    // #### stat.max ####
    // `stat.max(ar)`<br />Largest value of an array, returns a number
    // > &gt; stat.max([1,2,3,4,5])
    // > 5
    max: function(ar)
    { return Math.max.apply(null, ar)},

    // #### stat.min ####
    // `stat.min(ar)`<br />Smallest value of an array
    // > &gt; stat.min([1,2,3,4,5])
    // > 1
    min: function(ar)
    { return Math.min.apply(null, ar)},

    // #### stat.sum ####
    // `stat.sum(ar)`<br />Sum of an array, returns a number
    // > &gt; stat.sum([1,2,3,4,5])
    // > 15
    sum: function(ar)
    { return ar.reduce(ops.plus)},

    // #### stat.sumsq ####
    // `stat.sumsq(ar)`<br />Sum of squares of an array, returns a number
    // > &gt; stat.sumsq([1,2,3,4,5])
    // > 55
    sumsq: function(ar)
    { return map(ops.square, ar).reduce(ops.plus)},

    // #### stat.mean ####
    // `stat.mean(ar)`<br />Arithmetic mean of an array, returns a number
    // > &gt; stat.mean([1,2,3,4,5])
    // > 3
    mean: function(ar)
    { var arl = ar.length;
      if (arl == 0)
      { return 0}
      else
      { return stat.sum(ar) / arl}},

    // #### stat.mult ####
    // `stat.mult(ar,arb)`<br />Multiplication of two arrays, returns an array
    // > &gt; stat.mult([1,2,3,4,5],[1,2,3,4,5])
    // > [1,4,9,16,25]
    mult: function(ar,arb)
    { var arli = ar.length;
      var res = new Array(arli);
      for (var i=0; i<arli;  i++)
      { res[i] = ar[i] * arb[i]}
      return res},

    // #### stat.wmean ####
    // `stat.wmean(ar,war)`<br />Weighted mean of an array, returns a number
    // > &gt; stat.wmean([1,2,3,4,5],[1,2,3,4,5])
    // > 3.6666666666666665
    wmean: function(ar, war)
    { var sumwar = stat.sum(war);
      if (sumwar == 0)
      { return 0}
      else
      { return stat.sum(stat.mult(ar, war)) / sumwar}},



}



// ## Set theory ##

// #### difference ####
// `difference(ar,arb)`<br />Difference of two arrays, (ar - arb), returns an array
// > &gt; difference([1,2,3],[2,3,4])
// > [1]
// > &gt; difference([2,3,4],[1,2,3])
// > [4]
var difference = function(ar,arb)
{ return ar.filter(function(x)
		  { return arb.indexOf(x) < 0 })}

// #### union ####
// `union(ar,arb)`<br />Union of two arrays, returns an array
// > &gt; union([1,2,3],[2,3,4])
// > [1,2,3,4]
var union = function(ar,arb)
{ return uniq(ar.concat(arb))}


// #### intersection ####
// `intersection(ar,arb)`<br />Intersection of two arrays, returns an array
// > &gt; intersection([1,2,3],[2,3,4])
// > [2,3]
var intersection = function(ar,arb)
{   return ar.filter(function (x)
		     { if (arb.indexOf(x) !== -1)
		      return true })
}


// #### contains ####
// `contains(ar,v)`<br />Returns true if array `ar` contains value `v`
// > &gt; contains([1,2,3,4],1)
// > true
var contains = function(ar,v)
{ return ops.in(v,ar)}


// ## Sort ##

// #### moreOrLess ####
// `moreOrLess(x,y)`<br />Comparison helper function, returns a number
// > &gt; moreOrLess(1,2)
// > -1
// > &gt; moreOrLess(2,1)
// > 1
// > &gt; moreOrLess(1,1)
// > 0
var moreOrLess = function(x, y)
{ var res = 0;
  if (x > y) res = 1;
  if (x < y) res = -1;
  return res}

// #### byKeyAsc ####
// `byKeyAsc(k)`<br />Returns a sort object helper function, result in ascending order of object key `k`
// > &gt; var oar = [{"a":3,"b":5},{"a":1,"b":6},{"a":2,"b":7}];
// > &gt; **oar.sort(byKeyAsc('a'))** 
// > _[{"a":1,"b":6},{"a":2,"b":7},{"a":3,"b":5}]_
// > &gt; **oar.sort(byKeyAsc('b'))**
// > _[{"a":3,"b":5},{"a":1,"b":6},{"a":2,"b":7}]_
var byKeyAsc = function(k)
{ return function (x, y)
  { return moreOrLess(x[k], y[k])}}

// #### byKeyDesc ####
// `byKeyDesc(k)`<br />Returns a sort object helper function, result in descending order of object key `k`
// > &gt; var ar = [{"a":3,"b":5},{"a":1,"b":6},{"a":2,"b":7}];
// > &gt; ar.sort(byKeyDesc('a'))
// > [{"a":3,"b":5},{"a":2,"b":7},{"a":1,"b":6}]
// > &gt; ar.sort(byKeyDesc('b'))
// > [{"a":2,"b":7},{"a":1,"b":6},{"a":3,"b":5}]
var byKeyDesc = function(k)
{ return function (x,y)
  { return moreOrLess(y[k], x[k])}}

// #### byAsc ####
// `byAsc(x,y)`<br />Returns a sort array helper function, result in ascending order
// > &gt; [4,1,2].sort(byAsc)
// > [1, 2, 4]
var byAsc = function(x, y) { return moreOrLess(x, y)}

// `byDesc(x,y)`<br />Returns a sort array helper function, result in descending order
// > &gt; [4,1,2].sort(byDesc)
// > [4, 2, 1]
var byDesc = function(x, y) { return moreOrLess(y, x)}

// #### wsortv ####
// `wsortv(x,w,wavg,maxw)`<br />Weighted sort value calculation formula, returns a number
// > &gt; wsortv(1,2,3,4)
// > 2
var wsortv = function(x, w, wavg, maxw)
{ return (wavg + (x - wavg) * w / maxw || 0)}


// #### wsort ####
// `wsort(ar,war)`<br />Weighted sort values of an array
// > &gt; wsort([1,2,3],[3,2,1])
// > [1, 1.8888888888888888, 2.111111111111111]
var wsort = function(ar,war)
{ var wavg = stat.wmean(ar,war);
  var maxw = stat.max(war);
  if (maxw == 0)
  { maxw = 1}
  var res = [];
  var kli = ar.length;
  for (var k=0; k<kli;  k++)
  { res.push(wsortv(ar[k], war[k], wavg, maxw))}
  return res}


// #### tsort ####
// `tsort(mtx)`<br />Topological sort
// Returns a vector that represents the reverse topological order
// > &gt; tsort([[3,2],[2,1]])
// > [1, 2, 3]
var tsort = function(mtx)
{ var toposort = function(nds, eds)
  { var ndsli = nds.length;
    var res = new Array(ndsli);
    var visited = {};
    var i = ndsli;
    var visit = function(nd, j, prs)
    { if (prs.indexOf(nd) >= 0)
      { throw new Error('Cyclic dependency error')}
      if (visited[j]) return;
      visited[j] = true;
      var outgoing = eds.filter(function(edge)
				{ return edge[0] === nd})
      if (j = outgoing.length)
      { var preds = prs.concat(nd)
	do
	{ var child = outgoing[--j][1];
          visit(child, nds.indexOf(child), preds)}
	while (j)}
      res[--ndsli] = nd}
    while (i--)
    { if (!visited[i]) visit(nds[i], i, [])}
    return res}
  return toposort(flatuniq(mtx),mtx).reverse()}
