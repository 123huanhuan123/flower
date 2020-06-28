<?php
header("Access-Control-Allow-Origin: *");
//建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
//    echo "11";
    $phone=$_POST['phone'];
    $pwd=$_POST['pwd'];

// 准备sql语句
   $sql="select * from user where phone='$phone' and pwd='$pwd'";
//    echo $sql;
    $res=mysqli_query($link,$sql);
    
// 判断资源的长度大于0
// 登录成功
    if (mysqli_num_rows($res) > 0) {
        $str=mysqli_fetch_assoc($res);
        echo json_encode(array(
            "code" => 1,
            "msg" => "登录成功",
            "data"=>$str
        ));
    } else {
        echo json_encode(array(
            "code" => 0,
            "msg" => "手机号或密码错误",
            "data" => ''
        ));
    }

?>