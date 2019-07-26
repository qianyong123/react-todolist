var express = require('express')
var app = express()
//列表查询
app.post('/list/(:status)', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM task where status ='+req.params.status+'  ORDER BY '+(req.params.status==0?'createTime':'finishTime')+' DESC',function(err, rows, fields) {
			returnJSON(res,err,null,rows)
		})
	})
})
//新增
app.post('/add', function(req, res, next){	
	req.assert('content', '内容不可为空').notEmpty()   
    var errors = req.validationErrors()
    if( !errors ) { 
		var task = {
			content: req.sanitize('content').escape().trim(),
			createTime:new Date()
		}
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO task SET ?', task, function(err, result) {
				returnJSON(res,err,null,result.insertId)
			})
		})
	}else {  
		 returnJSON(res,null,errors)
    }
})
//编辑
app.post('/edit/(:id)', function(req, res, next) {
	req.assert('content', '内容不可为空').notEmpty()  
    var errors = req.validationErrors()
    if( !errors ) {
       var task = {
			content: req.sanitize('content').escape().trim(),
			updateTime:new Date()
		}	
		req.getConnection(function(error, conn) {
			conn.query('UPDATE task SET ? WHERE id = ' +req.params.id, task, function(err, result) {
				returnJSON(res,err)
			})
		})
	}
	else {  
		returnJSON(res,null,errors)
    }
})
//完成
app.post('/finish/(:id)', function(req, res, next) {
	var task = {
			status: 1,
            finishTime:new Date()
		}	
		req.getConnection(function(error, conn) {
			conn.query('UPDATE task SET ? WHERE id = ' +req.params.id, task, function(err, result) {
				returnJSON(res,err)
			})
		})
})

// 删除
app.post('/delete/(:id)', function(req, res, next) {
	var task = { id: req.params.id }
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM task WHERE id = ' + req.params.id, task, function(err, result) {
			returnJSON(res,err)
		})
	})
})
//相应数据封装
function returnJSON(res,err,errors,data){
   var resJson={};
	if (err || errors) {//失败信息设置
		 resJson.code=500;//状态码：200成功500失败
		if(err){//提示信息
			if(typeof err == 'string' )
			   resJson.msg=err;
			else
			   resJson.msg=JSON.stringify(err);
		}else{//校验的错误对象数组信息拼接
		   var error_msg = ''
			errors.forEach(function(error) {
				if(error_msg.length>0)
				   error_msg += ';'
				error_msg += error.msg 
			})
		   resJson.msg=error_msg;//提示信息
		}
	} else {
		resJson.code=200;//状态码：200成功500失败
		resJson.msg='ok';//提示信息
	}
	if(data){
	  resJson.data=data;//返回前端的数据对象
	}
	res.header("Content-Type", "application/json; charset=utf-8")
	res.json(resJson);
}


module.exports = app
