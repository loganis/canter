(function() {
    QUnit.module('Array');
    var arr = [1,2,3,4,5];
    var arrA = [1,2,3,4,5];
    var arrB = [2, 4, 5, 7, 9];
    var nonuniqarr = ['a', 'a', 1, 1, 'b', 1, 'b', 'b', 'c'];
    var arr2 = [[1],[2],[3],[4],[5]];
    var arr3 = [[1,2],[3,4],[5,6],[7,8],[9,10]];
    var arr4 = [1,2,3,4,5,6,7,8,9,10];
    test('stat.max', function(assert) {
	assert.equal(stat.max(arr), 5, 'fn call ok');
    });
    test('stat.min', function(assert) {
	assert.equal(stat.min(arr), 1, 'fn call ok');
    });
    test('stat.sum', function(assert) {
	assert.equal(stat.sum(arr), 15, 'fn call ok');
    });
    test('stat.sumsq', function(assert) {
	assert.equal(stat.sumsq(arr), 55, 'fn call ok');
    });
    test('stat.mean', function(assert) {
	assert.equal(stat.mean(arr), 3, 'fn call ok');
	assert.equal(stat.mean([]), 0, 'empty array fn call ok');
    });
    test('stat.mult', function(assert) {
	assert.deepEqual(stat.mult(arr,arr), [1,4,9,16,25], 'fn call ok');
	assert.deepEqual(stat.mult([]), [], 'empty array fn call ok');
    });
    test('stat.wmean', function(assert) {
	assert.equal(stat.wmean(arr,arr), 3.6666666666666665, 'fn call ok');
	assert.equal(stat.wmean(arr,[0,0,0,0,0]), 0, 'zero weights array fn call ok');
    });
    test('wsortv', function(assert) {
	assert.equal(wsortv(1,2,3,4), 2, 'fn call ok');

    });

    test('wsort', function(assert) {
	assert.deepEqual(wsort(arr,arr), [3.1333333333333333, 3, 3.2666666666666666, 3.933333333333333, 5], 'fn call ok');
	assert.deepEqual(wsort(arr,[0,0,0,0,0]), [0,0,0,0,0], 'zero weights array fn call ok');
    });
    test('flatten', function(assert) {
	assert.deepEqual(flatten(arr2), arr, 'arr2 fn call ok');
	assert.deepEqual(flatten(arr3), arr4, 'arr3 fn call ok');

    });

    test('flatuniq', function(assert) {
	assert.deepEqual(flatuniq([[1,2],[2,3],[3,4]]), [1,2,3,4], 'ar fn call ok');


    });


    // is.Indexed
    test('is.Indexed',
	 function(assert)
	 { assert.equal(is.Indexed(42),
			false,
			'number fn call ok');

	   assert.equal(is.Indexed('42'),
			true,
			'string number fn call ok');

	   assert.equal(is.Indexed([42]),
			true,
			'array number fn call ok');

	   assert.equal(is.Indexed(['42']),
			true,
			'string in array number fn call ok');
	   
	   assert.equal(is.Indexed({a: 42}),
			false,
			'object fn call ok');

	 });

    // is.Unique
    test('is.Unique',
	 function(assert)
	 { assert.deepEqual([1, 2, 2, 3, 4].filter(is.Unique),
			[1, 2, 3, 4],
			'array filter fn call ok');


	 });

    test('range',
	 function(assert)
	 { assert.deepEqual(range(5),
			    [0,1,2,3,4],
			    ' number fn call ok');
   	 });

    test('nth',
	 function(assert)
	 { assert.equal(nth(arr,0),
			1,
			' first element fn call ok');
   	 });

    test('first',
	 function(assert)
	 { assert.equal(first(arr),
			1,
			' first element fn call ok');
   	 });

    test('second',
	 function(assert)
	 { assert.equal(second(arr),
			2,
			' second element fn call ok');
   	 });

    test('rest',
	 function(assert)
	 { assert.deepEqual(rest(arr),
			    [2,3,4,5],
			    ' rest elements fn call ok');
   	 });
// last
    test('last',
	 function(assert)
	 { assert.equal(last(arr),
			5,
			' second element fn call ok');
   	 });
 // uniq   
    test('uniq',
	 function(assert)
	 { assert.deepEqual(uniq(nonuniqarr),
			    ['a',1,'b','c'],
			    ' simple fn call ok');
   	 });

// difference
    test('difference',
	 function(assert)
	 { assert.deepEqual(difference(arrA, arrB),
			    [1, 3],
			    ' simple A-B fn call ok');
	   
	   assert.deepEqual(difference(arrB, arrA),
			    [7, 9],
			    ' simple B-A fn call ok');

   	 });

// union
    test('union',
	 function(assert)
	 { assert.deepEqual(union(arrA, arrB),
			    [1,2,3,4,5,7,9],
			    ' simple A-B fn call ok');
	   
	   assert.deepEqual(union(arrB, arrA),
			    [2, 4, 5, 7, 9, 1, 3],
			    ' simple B-A fn call ok');

   	 });

// intersection
    test('intersection',
	 function(assert)
	 { assert.deepEqual(intersection(arrA, arrB),
			    [2, 4, 5],
			    ' simple A-B fn call ok');
	   
	   assert.deepEqual(intersection(arrB, arrA),
			    [2, 4, 5],
			    ' simple B-A fn call ok');

   	 });

// contains
    test('contains',
	 function(assert)
	 { assert.deepEqual(contains(arrA, 1),
			    true,
			    ' simple arrA fn call ok');
	   
	   assert.deepEqual(contains(arrB, 1),
			    false,
			    ' simple arrB fn call ok');

   	 });

// map
    test('map',
	 function(assert)
	 { assert.deepEqual(map(ops.inc, [1,2,3]),
			    [2, 3, 4],
			    ' arr fn call ok');
	   
   	 });

// transpose
    test('transpose',
	 function(assert)
	 { assert.deepEqual(transpose([[1,2,3],[4,5,6]]),
			    [[1,4],[2,5],[3,6]],
			    ' mtx fn call ok');
	   
   	 });

// cons
    test('cons',
	 function(assert)
	 { assert.deepEqual(cons(10, [1, 2, 3]),
			    [10, 1, 2, 3],
			    ' arr fn call ok');
      	 });

// conj
    test('conj',
	 function(assert)
	 { assert.deepEqual(conj([1, 2, 3], 10),
			    [1, 2, 3, 10],
			    ' arr fn call ok');
      	 });

// merge
    test('merge',
	 function(assert)
	 { assert.deepEqual(merge([1, 2],[3, 4]),
			    [1, 2, 3, 4],
			    ' arr fn call ok');
      	 });

// byAsc
    test('byAsc',
	 function(assert)
	 { assert.deepEqual([4,1,3,2].sort(byAsc),
			    [1, 2, 3, 4],
			    'arr fn call ok');
      	 });

// byDesc
    test('byDesc',
	 function(assert)
	 { assert.deepEqual([4,1,3,2].sort(byDesc ),
			    [4, 3, 2, 1],
			    'arr fn call ok');
      	 });
 
    var tasks = [["3", '2']
		 , ["2", "1"]
		 , ["6", "5"]
		 , ["5", "2"]
		 , ["5", "4"]
		 , ["5", "1"]
		 , ["4", "1"]
		];

// tsort
  test('tsort', function(assert)
       { assert.deepEqual(tsort(tasks), 
			  [ "1",  "4",  "2",  "5",  "6",  "3"],
			  'arr fn call ok');
  });


}());
