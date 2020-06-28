<?php
header("Access-Control-Allow-Origin: *");
//建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
//    echo "11";
    $fn = $_GET['callback'];
    $id = $_GET['id'];
    // $userid = $_GET['userid'];
// 准备sql语句
   $sql="select * from goodslist where id=$id";
//    $sql="select * from cartlist left join goodslist on cartlist.goodsid = goodslist.id where cartlist.userid=$userid";
//    echo $sql;
    $res=mysqli_query($link,$sql);
    $row = mysqli_fetch_assoc($res);
 if (mysqli_num_rows($res) > 0) {
        $str = json_encode(array(
            "status" => 1,
            "errmsg" => '成功',
            "DataStatus" => 200,
            "datas"=>$row
        ));
        echo $fn."($str)";
 }else{
    $sql1="select * from conlist where id=$id";
    $res1=mysqli_query($link,$sql1);
    $row1 = mysqli_fetch_assoc($res1);
    if(mysqli_num_rows($res1) > 0){
        $str1 = json_encode(array(
            "status" => 1,
            "errmsg" => '成功',
            "DataStatus" => 200,
            "datas"=>$row1
        ));
        echo $fn."($str1)";
    }else{
        $str = json_encode(array(
            "status" => 0,
            "errmsg" => "没有数据",
            "DataStatus" => 500,
            "datas"=>$row1
        ));
        echo $fn."($str1)";
    }
       
 }
?>