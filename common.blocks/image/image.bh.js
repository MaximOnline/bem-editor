module.exports = function(bh){
	bh.match('image', function(ctx) {
		ctx.tag('img');
	});
	bh.apply({block: 'image'});
}