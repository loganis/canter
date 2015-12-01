(function() {
    QUnit.module('String');

    // is.String
    test('is.String', function(assert) {
	assert.equal(is.String("abc"), true, 'string fn call ok');
	assert.equal(is.String(1), false, 'number fn call ok');
	assert.equal(is.String([]), false, 'array fn call ok');
	assert.equal(is.String({}), false, 'object fn call ok');
    });

    // strim
    test('strim', function(assert) {
	assert.equal(strim(" abc def  "), "abc def", 'string fn call ok');
    });

    // stringToNumber
    test('stringToNumber', function(assert) {
	assert.equal(stringToNumber(" 42 "), 42, 'string number fn call ok');
	assert.equal(stringToNumber("42.0"), 42, 'string float fn call ok');
	assert.equal(stringToNumber(["42.0"]), 42, 'string in array fn call ok');
    });

    // strimNumber
    test('strimNumber', function(assert) {
	assert.equal(strimNumber(" 42 "), 42, 'string number fn call ok');
	assert.equal(strimNumber(" name "), "name", 'string string fn call ok');
	assert.equal(strimNumber("42.0"), 42, 'string float fn call ok');
    });

    // interpose
    test('interpose', function(assert) {
	assert.equal(interpose(",",["a","b","c"]), "a,b,c", 'string number fn call ok');
    });

    
}());
