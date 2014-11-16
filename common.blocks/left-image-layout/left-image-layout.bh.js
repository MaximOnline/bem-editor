module.exports = function(bh){
	bh.match('left-image-layout', function(ctx) {
		ctx.tag('div');
	});
	bh.apply({block: 'left-image-layout'});
}