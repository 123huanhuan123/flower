<?php
header("Access-Control-Allow-Origin: *");
//建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
//    echo "11";
    $username=$_POST['username'];
    $phone=$_POST['phone'];
    $email=$_POST['email'];
    $pwd=$_POST['pwd'];

//准备sql语句
   $sql="insert into user values(null,'$username','$phone','$email','$pwd')";
//    echo $sql;
   $res=mysqli_query($link,$sql);
   if ($res) {
    // 插入成功
    // code是后端自定义的，我们这里定义1成功，0失败
    echo json_encode(array(
        "code" => 1,
        "msg" => "success",
        "data" => ''
    ));
    } else {
        echo json_encode(array(
            "code" => 0,
            "msg" => "failer",
            "data" => ''
        ));
    }

?>