var express = require('express');
var http = require('http');
var app = express()
var mysql = require('mysql')
var myConnection  = require('express-myconnection')
/**
 * 加载config.js,配置数据库连接
 */ 
var config = require('./config')
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
app.use(myConnection(mysql, dbOptions, 'pool'))

var index = require('./routes/index')
var tasks = require('./routes/tasks')

 
var expressValidator = require('express-validator')
app.use(expressValidator())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())
//允许跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Access-Control-Allow-Headers, Content-Type, Accept");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","POST, PUT, GET, OPTIONS, DELETE");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
app.use('/', index)
app.use('/tasks', tasks)

app.listen(config.server.port, function(){
	console.log('Server running at http://'+config.server.host+':'+config.server.port+'/');
})


