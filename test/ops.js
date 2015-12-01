(function() {

    QUnit.module('Ops');
    test('or', function(assert) {
	assert.equal(ops.or(true,false), true, 'fn call ok');
	assert.equal([true,false,true].reduce(ops.or), true, 'array reduce ok');
    });
    test('and', function(assert) {
	assert.equal(ops.and(true,false), false, 'fn call ok');
	assert.equal([true,false,true].reduce(ops.and), false, 'array reduce ok');
    });
    test('eq', function(assert) {
	assert.equal(ops.eq(true,true), true, 'fn call ok');
    });
    test('neq', function(assert) {
	assert.equal(ops.neq(true,true), false, 'fn call ok');
    });
    test('lt', function(assert) {
	assert.equal(ops.lt(1,2), true, 'fn call ok');
	
    });
    test('lte', function(assert) {
	assert.equal(ops.lte(1,2), true, 'fn call ok');
    });
    test('gt', function(assert) {
	assert.equal(ops.gt(1,2), false, 'fn call ok');
    });

    test('gte', function(assert) {
	assert.equal(ops.gte(1,2), false, 'fn call ok');
    });
    test('in', function(assert) {
	assert.equal(ops.in(1,[1,2,3]), true, 'fn call ok');
    });
    test('nin', function(assert) {
	assert.equal(ops.nin(1,[1,2,3]), false, 'fn call ok');
    });
    test('plus', function(assert) {
	assert.equal(ops.plus(1,2), 3, 'fn call ok');
	assert.equal([1,2,3,4,5].reduce(ops.plus),15, 'array reduce ok');
    });
    test('minus', function(assert) {
	assert.equal(ops.minus(2,1), 1, 'fn call ok');
    });
    test('mult', function(assert) {
	assert.equal(ops.mult(2,2), 4, 'fn call ok');
    });
    test('div', function(assert) {
	assert.equal(ops.div(15,3), 5, 'fn call ok');
    });
    test('inc', function(assert) {
	assert.equal(ops.inc(1), 2, 'fn call ok');
    });
    test('dec', function(assert) {
	assert.equal(ops.dec(2), 1, 'fn call ok');
    });
   test('square', function(assert) {
	assert.equal(ops.square(2), 4, 'fn call ok');
    });
  

}());
