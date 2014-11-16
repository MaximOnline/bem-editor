var express = require('express');
var app = express();
var fs = require('fs');
var vow = require('vow');
var vfs = require('vow-fs');
var bodyParser = require('body-parser');
var mkdirp = require('mkdirp');
//var serverMiddleware = require('node_modules/end/lib/server/server-middleware');
//var dropRequireCache = require('node_modules/enb/lib/fs/drop-require-cache');
//var enbBuilder = serverMiddleware.createBuilder({cdir = process.cwd(), noLog: false});

app.use(express.static(__dirname + '/public/'));


app.use(bodyParser.json());

app
	.post('/make_article', function(req, res){
		var data = req.body.data;
		var id = req.body.id;
		var bhFilePath = __dirname+'/pages/article/article.bh.js';
		mkdirp.sync('storage/'+id);
		fs.writeFileSync('storage/'+id+'/article.bemjson', JSON.stringify(data), {encoding: 'utf8'});
		var bh = require(bhFilePath);
		var html = bh.apply(data);
		fs.writeFileSync('storage/'+id+'/article.html', html, {encoding: 'utf8'});
		res.status(200).send('ok');
	});
app
	.get('/article/:id', function(req, res){
		var file = 'storage/'+req.params.id+'/article.html';
		if (fs.existsSync(file)){
			var start = '<html><head><title>Article</title></head><body>';
			var content = fs.readFileSync('storage/'+req.params.id+'/article.html');
			var end = '</body></html';
			res.status(200).send(start+content+end);	
		} else {
			res.status(404).send('not found');
		}
	});


app.listen(1234);
