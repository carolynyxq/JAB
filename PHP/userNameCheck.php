<?php
	$uname=$_REQUEST["uname"];
	if($uname=="admin"){
		echo "error";	
	}else{
		echo "success";
	}
	/*
	//�������ݿ�,$link=mysqli_connect($host,$user,$pwd,$dbname,$port);
	$link=mysqli_connect('127.0.0.1','root','','userLogin',3306);
	//������ݿ������Ƿ�ɹ�
	if(mysqli_connect_errno()){
		die('���ݿ�����ʧ��').mysqli_connect_error();
	}

	//ִ��sql
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