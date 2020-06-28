<?php
header("Access-Control-Allow-Origin: *");
  //获取传递值
  $foo = $_GET['foo'];
  $foo();
  function del(){
    //建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
    $fn = $_GET['callback'];
    $goodsid=$_GET['goodsid'];
    $sql="delete from cartlist where goodsid=$goodsid";
    $res=mysqli_query($link,$sql);
    if ($res) {
        // 删除成功
        // code 1成功，0失败
        $str = json_encode(array(
            "code" => 1,
            "msg" => "删除成功"
        ));
        echo $fn."($str)";
    }else{
        $str =  json_encode(array(
                "code" => 0,
                "msg" => "删除失败"
        ));
        echo $fn."($str)";
    };
  }
  function update(){
    // //建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
    $fn = $_GET['callback1'];
    $goodsid=$_GET['goodsid'];
    $goodsnum=$_GET['goodsnum'];
    $sql="update cartlist set goodsnum='$goodsnum' where goodsid=$goodsid";
    $res=mysqli_query($link,$sql);
    if ($res) {
        // 删除成功
        // code 1成功，0失败
        $str = json_encode(array(
            "code" => 1,
            "msg" => "修改成功"
        ));
        echo $fn."($str)";
    }else{
        $str =  json_encode(array(
                "code" => 0,
                "msg" => "修改失败"
        ));
        echo $fn."($str)";
    };
  }
?>