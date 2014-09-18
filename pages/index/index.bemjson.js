({
	block: 'page',
	title: 'Editor',
	head: [
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'css', url: '_index.css' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
	content:[{
		block: 'header',
		content:[
			{
				block : 'icon',
	    		mods : { social : 'twitter' }
			}
			,
			{
				elem: 'title',
				tag: 'h1',
				content: 'Maximum Editor'
			}
		]
	},
	{
		block: 'content',
		content: [
			{block: 'left', content:[
				{block: 'article-list', content:[{
					block: 'article-item',
					content: [{
						elem: 'title',
						content: 'Удой скота в РК удвоился'
					},{
						elem: 'desc',
						content: 'Доярки Республики рапортуют о невиданном доселе удое скота.'
					}]
				},{
					block: 'article-item',
					content: [{
						elem: 'title',
						content: 'Ksenia'
					},{
						elem: 'desc',
						content: 'Доярки Республики рапортуют о невиданном доселе удое скота.'
					}]
				},{
					block: 'article-item',
					content: [{
						elem: 'title',
						content: 'Roxas'
					},{
						elem: 'desc',
						content: 'Доярки Республики рапортуют о невиданном доселе удое скота.'
					}]
				}]}
			]},
			{block: 'right', content:['Here is description']}
		]
	}
	]
})