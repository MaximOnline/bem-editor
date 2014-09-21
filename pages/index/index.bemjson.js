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
				elem: 'title',
				tag: 'h1',
				content: 'Maximum Editor'
			}
		]
	},
	{
		block: 'editer',
		content: [
			{
				block: 'panel', 
				content: [
					{
						block: 'button',
						js: {'add':'text'},
						mods: {theme: 'normal', size: 'xl', type: 'maxim'},
						text: 'T'
					},
					{
						block: 'button',
						js: {'add':'image'},
						mods: {theme: 'normal', size: 'xl', type: 'maxim'},
						text: 'I'
					},
					{
						block: 'button',
						js: {'add':'video'},
						mods: {theme: 'normal', size: 'xl', type: 'maxim'},
						text: 'V'
					},
					{
						block: 'button',
						js: {'add':'template'},
						mods: {theme: 'normal', size: 'xl', type: 'maxim'},
						text: 'TPL'
					}
				]
			},
			{
				block: 'content'
			}
		]
	}
	]
})