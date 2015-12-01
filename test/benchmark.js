(function() {
    QUnit.module('Benchmark');
    var arr = range(100000);
    var plus = function(x, y)  { return 1 * x  + 1 * y};
    var inc = function(x) { return 1 * x + 1};

    test('Native map, ' + arr.length + ', map inc ', function(assert) {
	
	assert.equal(arr.map(inc).length, arr.length, 'native map fn call ok');
    });

    test('Lodash map, ' + arr.length + ', map inc ', function(assert) {
	
	assert.equal(_ld.map(arr,inc).length, arr.length, 'lodash map fn call ok');
    });

    test('Underscore map, ' + arr.length + ', map inc ', function(assert) {
	
		assert.equal(_.map(arr,inc).length, arr.length, 'underscore map fn call ok');
    });


    test('Canter map, ' + arr.length + ', map inc ', function(assert) {
	assert.equal(map(inc, arr).length, arr.length, 'canter map fn call ok');

    });


    test('Lodash zip, ' + arr.length + ' ', function(assert) {
	
	assert.equal(_ld.zip(arr,arr).length , arr.length, 'lodash map fn call ok');
    });

    test('Underscore zip, ' + arr.length + '', function(assert) {
	
		assert.equal(_.zip(arr,arr).length, arr.length, 'underscore map fn call ok');
    });


    test('Canter zip, ' + arr.length + '', function(assert) {
	assert.equal(transpose([arr,arr]).length, arr.length, 'canter map fn call ok');

    });






    
}());
