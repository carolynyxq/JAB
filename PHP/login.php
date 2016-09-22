<?php
	$uname=$_REQUEST['loginname'];
	$pwd=$_REQUEST['loginpwd'];
	//查询数据库判断【待补充】
	//伪操作
	if($uname=="admin"&&$pwd=='123456'){
		echo "0";
	}else if($uname==""||$pwd==""){
		echo "1";
	}else{
		echo "2";
	}
?>