module.exports = function(bh){
	bh.match('text', function(ctx) {
		ctx.tag('p');
	});
	bh.apply({block: 'text'});
}