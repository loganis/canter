// # Object tests 
(function()
 {QUnit.module('Object');
  var arr = [1,2,3,4,5];
  var obj0 = {kpia: 1, date:"2015-01-01", gender: "f"};
  var csvdata = "name, age\nAlice, 41\nBob, 42";
  var obj1 = [{kpia: 1, date:"2015-01-01", gender: "f"},
	      {kpia: 3, date:"2015-01-03", gender: "f"},
	      {kpia: 101, date:"2015-01-01", gender: "m"},
	      {kpia: 103, date:"2015-01-03", gender: "m"},
	      {kpia: 2, date:"2015-01-02", gender: "f"},
	      {kpia: 4, date:"2015-01-04", gender: "f"},
	      {kpia: 5, date:"2015-01-05", gender: "f"}];

  var obj1u = [{kpia: 1, date:"2015-01-01", gender: "f"},
	       {kpia: 3, date:"2015-01-03", gender: "f"},
	       {kpia: 2, date:"2015-01-02", gender: "f"},
	       {kpia: 4, date:"2015-01-04", gender: "f"},
	       {kpia: 5, date:"2015-01-05", gender: "f"}];
  
  var obj2 = [{kpib: 11, date:"2015-01-01", gender: "f"},
	      {kpib: 12, date:"2015-01-02", gender: "f"},
	      {kpib: 211, date:"2015-01-01", gender: "m"},
	      {kpib: 212, date:"2015-01-02", gender: "m"},
	      {kpib: 14, date:"2015-01-04", gender: "f"},
	      {kpib: 13, date:"2015-01-03", gender: "f"},
	      {kpib: 15, date:"2015-01-05", gender: "f"}];
  
  var obj2u = [{kpib: 11, date:"2015-01-01", gender: "f"},
	       {kpib: 12, date:"2015-01-02", gender: "f"},
	       {kpib: 14, date:"2015-01-04", gender: "f"},
	       {kpib: 13, date:"2015-01-03", gender: "f"},
	       {kpib: 15, date:"2015-01-05", gender: "f"}];

  var obj3 = [{kpic: 21, date:"2015-01-01", gender: "f"},
	      {kpic: 22, date:"2015-01-02", gender: "f"},
	      {kpic: 321, date:"2015-01-01", gender: "m"},
	      {kpic: 322, date:"2015-01-02", gender: "m"},
	      {kpic: 23, date:"2015-01-03", gender: "f"},
	      {kpic: 25, date:"2015-01-05", gender: "f"},
	      {kpic: 24, date:"2015-01-04", gender: "f"}];
  
  var obj3u = [{kpic: 21, date:"2015-01-01", gender: "f"},
	       {kpic: 22, date:"2015-01-02", gender: "f"},
	       {kpic: 23, date:"2015-01-03", gender: "f"},
	       {kpic: 25, date:"2015-01-05", gender: "f"},
	       {kpic: 24, date:"2015-01-04", gender: "f"}];
  var oar = [{"a":3,"b":5},{"a":1,"b":6},{"a":2,"b":7}];
// is.Object
  test('is.Object',
       function(assert)
       { assert.equal(is.Object(arr),
		      true, 
		      'array fn call ok');
	 assert.equal(is.Object(obj0),
		      true,
		      'obj fn call ok');
	 assert.equal(is.Object(obj1),
		      true,
		      'array object fn call ok');
	 assert.equal(is.Object("string"),
		      false,
		      'string fn call ok');
       });

// is.Array  
  test('is.Array',
       function(assert)
       { assert.equal(is.Array(arr),
		      true,
		      'array fn call ok'),
	 assert.equal(is.Array(obj0),
		      false,
		      'obj fn call ok');
	 assert.equal(is.Array(obj1),
		      true,
		      'array object fn call ok'),
	 assert.equal(is.Array("string"),
		      false,
		      'string fn call ok');
    });

// is.Undefined  
  test('is.Undefined',
       function(assert)
       { assert.equal(is.Undefined(obj0.abc),
		      true,
		      'obj0 nek fn call ok'),
	  assert.equal(is.Undefined(obj0.kpia),
		      false,
		      'obj ek fn call ok');
    });

// is.notUndefined  
  test('is.notUndefined',
       function(assert)
       { assert.equal(is.notUndefined(obj0.kpia),
		      true,
		      'obj0 ek fn call ok'),
	  assert.equal(is.notUndefined(obj0.abc),
		      false,
		      'obj nek fn call ok');
    });


// comp  
  test('comp',
       function(assert)
       { var sqIncMinDec1 = comp("->",  ops.square,  ops.inc,  [ops.minus, 20],  ops.dec);
	 var sqIncMinDec2 = comp("->>",  ops.square,  ops.inc,  [ops.minus, 20],  ops.dec);
	 assert.equal(sqIncMinDec1(2),
			   -16,
			   'thread-first fn call ok'),
	 assert.equal(sqIncMinDec2(2),
			   14,
			   'thread-last fn call ok');
    });

// byKeyAsc
   test('byKeyAsc',
	 function(assert)
	 { 
	     assert.deepEqual(oar.sort(byKeyAsc('a')),
			    [{"a":1,"b":6},{"a":2,"b":7},{"a":3,"b":5}],
			    'oar fn call ok');
	 });

// byKeyDesc
   test('byKeyDesc',
	 function(assert)
	 { 
	     assert.deepEqual(oar.sort(byKeyDesc('a')),
			      [{"a":3,"b":5},{"a":2,"b":7},{"a":1,"b":6}],
			    'oar fn call ok');
	 });


// keys
    test('keys',
	 function(assert)
	 { assert.deepEqual(keys(arr),
			    ["0","1","2","3","4"],
			    'array fn call ok');
	   assert.deepEqual(keys(obj0),
			    ["kpia","date","gender"],
			    'obj fn call ok');
	 });

// vals
    test('vals',
	 function(assert)
	 { assert.deepEqual(vals(arr),
			    arr,
			    'array fn call ok');
	   assert.deepEqual(vals(obj0),
			    [1,"2015-01-01","f"],
			    'obj fn call ok');
    });

// getv
    test('getv',
	 function(assert)
	 { assert.equal(getv({a: 1},"a"),
			    1,
			    'obj fn call ok');
    });

// getkv
    test('getkv',
	 function(assert)
	 { assert.deepEqual(getkv({a: 1},"a"),
			    {a:1},
			    'obj fn call ok');
    });


// getkv
    test('getkv',
	 function(assert)
	 { assert.deepEqual(getkv({a: 1},"a"),
			    {a:1},
			    'obj fn call ok');
    });

// selectKeys
    test('selectKeys',
	 function(assert)
	 { assert.deepEqual(selectKeys({a:1,b:2,c:3}, ["a","b"]),
			    {a: 1, b: 2},
			    'obj fn call ok');
    });



// colNames
    test('colNames',
	 function(assert)
	 { assert.deepEqual(colNames(arr),
			    [],
			    'array fn call ok');
	   assert.deepEqual(colNames(obj0),
			    [],
			    'obj fn call ok');
	   assert.deepEqual(colNames(obj1),
			    ["kpia","date","gender"],
			    'array object fn call ok');
	 });

// count
    test('count',
	 function(assert)
	 { assert.equal(count(arr),
			5,
			'array fn call ok');
	   assert.equal(count(obj0),
			3,
			'obj fn call ok');
	   assert.equal(count(obj1),
			7,
			'array object fn call ok');
	   assert.equal(count("123456"),
			6,
			'string fn call ok');
	 });

// clone

  test('clone',
       function(assert)
       { assert.deepEqual(cloneObject({a: 1, b: 2}),
			  {a: 1, b: 2},
			  'obj fn call ok');
       });

// selectColumn    
    test('selectColumn',
	 function(assert)
	 { assert.deepEqual(selectColumn(["kpia"],obj1),
			    [{"kpia": 1},
			     {"kpia": 3}, 
			     {"kpia": 101},
			     {"kpia": 103},
			     {"kpia": 2},
			     {"kpia": 4},
			     {"kpia": 5}],
			    'select 1 key ret obj fn call ok');
	   
	 

	   assert.deepEqual(selectColumn(["kpia","gender"],obj1),
			    [{"gender": "f","kpia": 1},
			     {"gender": "f","kpia": 3},
			     {"gender": "m","kpia": 101},
			     {"gender": "m","kpia": 103},
			     {"gender": "f","kpia": 2},
			     {"gender": "f","kpia": 4},
			     {"gender": "f","kpia": 5}],
			    'select 2 keys ret obj fn call ok');

	 
	 });

// pluck
    test('pluck',
	 function(assert)
	 { assert.deepEqual(pluck("gender",obj1),
			    ["f","f","m","m","f","f","f"],
			    '1 string colname and array object fn call ok');
	   
	   assert.deepEqual(pluck(["gender"],obj1),
			    ["f","f","m","m","f","f","f"],
			    '1 length array colname and array object fn call ok');
	   
	   assert.deepEqual(pluck("gender,kpia",obj1),
			    [["f",1],
			     ["f",3],
			     ["m",101],
			     ["m",103],
			     ["f",2],
			     ["f",4],
			     ["f",5]],
			    '2 string colnames and array object fn call ok');
	   
	   assert.deepEqual(pluck(["gender","kpia"],obj1),
			    [["f",1],["f",3],["m",101],["m",103],["f",2],["f",4],["f",5]],
			    '2 length array colnames and array object fn call ok');
	 });
    
    // addColumn
    test('addColumn',
	 function(assert)
	 { assert.deepEqual(addColumn("abc",[1,2,3,4,5,6,7],obj1),
			    [{"kpia":1,"date":"2015-01-01","gender":"f","abc":1},
			     {"kpia":3,"date":"2015-01-03","gender":"f","abc":2},
			     {"kpia":101,"date":"2015-01-01","gender":"m","abc":3},
			     {"kpia":103,"date":"2015-01-03","gender":"m","abc":4},
			     {"kpia":2,"date":"2015-01-02","gender":"f","abc":5},
			     {"kpia":4,"date":"2015-01-04","gender":"f","abc":6},
			     {"kpia":5,"date":"2015-01-05","gender":"f","abc":7}],
			    ' fn call ok');
	 });

// queryObj
    test('queryObj',
	 function(assert)
	 { assert.equal(queryObj(obj1[0],{gender: "f"}),
			true, 
			' simple eq fn call ok');
	   assert.equal(queryObj(obj1[0],{gender: {eq: "f"}}), 
			true,
			' explicit eq fn call ok');
	   assert.equal(queryObj(obj1[0],{gender: {neq: "m"}}),
			true,
			' explicit neq fn call ok');
	   assert.equal(queryObj(obj1[0],{gender: {in: ["f", "female"]}}),
			true,
			' eq and in fn call ok');
	   assert.equal(queryObj(obj1[0],{gender: {nin: ["m", "male"]}}),
			true,
			' eq and nin fn call ok');
	   assert.equal(queryObj(obj1[0],{kpia: {lt: 2}}),
			true,
			' lt fn call ok');
	   assert.equal(queryObj(obj1[0],{kpia: {lte: 1}}),
			true,
			' lte fn call ok');
	   assert.equal(queryObj(obj1[0],{kpia: {gt: 0}}),
			true,
			' gt fn call ok');
	   assert.equal(queryObj(obj1[0],{kpia: {gte: 1}}),
			true,
			' gte fn call ok');
    });

// queryOar
    test('queryOar',
	 function(assert)
	 { assert.deepEqual(queryOar(obj1,{gender: "m", kpia: {lte: 103}}),
			    [{"kpia":101,"date":"2015-01-01","gender":"m"},
			     {"kpia":103,"date":"2015-01-03","gender":"m"}],
			    ' a semi complex fn call ok');
    });

// filterObj
    test('filterObj',
	 function(assert)
	 { assert.deepEqual(filterObj({a: 1, b: "b", c: [], d: {}, f: "11"}, is.Number),
			    {a: 1, f: "11"},
			    ' obj and fn call ok');
    });

// mergeObjects
  test('mergeObjects',
       function(assert)
       { assert.deepEqual(mergeObjects(obj0,{abc: 1}),
			  {kpia: 1, date:"2015-01-01", gender: "f", abc: 1},
			  ' a simple fn call ok');
       });
// indexBy
    test('indexBy',
	 function(assert)
	 { assert.deepEqual(indexBy(obj1u,'date'), 
			    { "2015-01-01": 0,
			      "2015-01-02": 2,
			      "2015-01-03": 1,
			      "2015-01-04": 3,
			      "2015-01-05": 4},
			    ' a simple fn call ok');
    });

// joinObjects
    test('joinObjects',
	 function(assert)
	 { assert.deepEqual(joinObjects([obj1u,obj2u,obj3u],'date'), 
			    [{ "date": "2015-01-01", "gender": "f", "kpia": 1, "kpib": 11, "kpic": 21 },
			     { "date": "2015-01-03", "gender": "f", "kpia": 3, "kpib": 13, "kpic": 23 },
			     { "date": "2015-01-02", "gender": "f", "kpia": 2, "kpib": 12, "kpic": 22 },
			     { "date": "2015-01-04", "gender": "f", "kpia": 4, "kpib": 14, "kpic": 24 },
			     { "date": "2015-01-05", "gender": "f", "kpia": 5, "kpib": 15, "kpic": 25 }],
			    ' 3 objs join by date fn call ok');
	 });

// csv2mtx
  test('csv2mtx',
	 function(assert)
	 { assert.deepEqual(csv2mtx(',', csvdata), 
			    [["name", "age"],
			     ["Alice", 41],
			     ["Bob", 42]],
			    ' csv data fn call ok');
	 });





  
  var funs = { "Page": function(row) { return row['kpia'] * 2 },
	       "Bounce": function(row) { return row['Page'] * 2 }}



}());
