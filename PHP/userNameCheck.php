<?php
	$uname=$_REQUEST["uname"];
	if($uname=="admin"){
		echo "error";	
	}else{
		echo "success";
	}
	/*
	//连接数据库,$link=mysqli_connect($host,$user,$pwd,$dbname,$port);
	$link=mysqli_connect('127.0.0.1','root','','userLogin',3306);
	//检查数据库连接是否成功
	if(mysqli_connect_errno()){
		die('数据库连接失败').mysqli_connect_error();
	}

	//执行sql
	$sql="SELECT * FROM users WHERE uname='$uname'";
	//$sql2="INSERT INTO users (uname) VALUES ('$uname')";
	mysqli_query($link,'SET NAMES utf8');
	$result=mysqli_query($link,$sql);
	***if(mysql_affected_rows==1){
		echo "true";
	}
	echo "false";
	exit();***
	while(true){
		$arr=mysqli_fetch_array($result,MYSQLI_ASSOC);
		if($arr===NULL){
			echo "true";
			//mysqli_query($link,$sql2);
		}else{
			echo "false";
		}
	}*/
?>