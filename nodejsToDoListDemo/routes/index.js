var express = require('express')
var app = express()

app.get('/', function(req, res) {
	
	res.render('index', {title: '��ӭʹ��'})
})

module.exports = app;
