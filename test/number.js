(function() {

    QUnit.module('Number');
    test('is.Number',
	 function(assert)
	 { assert.equal(is.Number(42),
			true,
			'number fn call ok');

	   assert.equal(is.Number('42'),
			true,
			'string number fn call ok');

	   assert.equal(is.Number([42]),
			true,
			'array number fn call ok');

	   assert.equal(is.Number(['42']),
			true,
			'string in array number fn call ok');
	   
	   assert.equal(is.Number({a: 42}),
			false,
			'object fn call ok');

	 });
        test('moreOrLess',
	 function(assert)
	 { assert.equal(moreOrLess(1,2),
			-1,
			'less fn call ok');
	   assert.equal(moreOrLess(2,1),
			1,
			'more fn call ok');
	   assert.equal(moreOrLess(1,1),
			0,
			'same fn call ok');


	 });

    


    
}());
