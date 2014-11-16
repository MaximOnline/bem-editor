/**
 * Created by nikolaymendyaev on 15.11.14.
 */

var express = require('express');
var app = express();
//var enb = require('enb');

app.use(express.static(__dirname + '/public/'));

app.listen(80);