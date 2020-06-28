<?php
header("Access-Control-Allow-Origin: *");
 //建立数据库连接
 $link= mysqli_connect('127.0.0.1','root','','huan');
 if(!$link) die('连接失败');
 mysqli_query($link,"set names 'utf8'");
//获取传递值
  $fn = $_GET['callback'];
  $userid=$_GET['userid'];
  $goodsid=$_GET['goodsid'];
  $goodsnum=$_GET['goodsnum'];
  $imgsrc=$_GET['imgsrc'];
//准备sql语句
  $sql="select * from cartlist where userid=$userid";
  $res=mysqli_query($link,$sql);
  if (mysqli_num_rows($res) > 0) {
      //有数据
    //    echo 1;
    //判断此商品是否存在
       $sql = "select * from cartlist where goodsid=$goodsid and userid=$userid";
       $res=mysqli_query($link,$sql);
       if(mysqli_num_rows($res) > 0){
           //此商品已经存在
           $sql="update cartlist set goodsnum=goodsnum+'$goodsnum' where goodsid=$goodsid";
           $res=mysqli_query($link,$sql);
        //    $sql1="update goodslist join cartlist on goodslist.id=cartlist.goodsid set goodslist.gnum=cartlist.goodsnum where goodslist.id=$goodsid";
        //    $res1=mysqli_query($link,$sql1);
           if ($res) {
                // 修改成功
                // code 1成功，0失败
                $str = json_encode(array(
                    "code" => 2,
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
            
       }else{
           //此商品不存在
           $sql="insert into cartlist values(null,$userid,$goodsid,'$goodsnum','$imgsrc',1)";
           $res=mysqli_query($link,$sql);
           if ($res) {
                // 插入成功
                // code 1成功，0失败
                $str = json_encode(array(
                    "code" => 1,
                    "msg" => "插入成功"
                ));
                echo $fn."($str)";
                }else{
                $str =  json_encode(array(
                        "code" => 0,
                        "msg" => "插入失败"
                ));
                echo $fn."($str)";
            };
       }
       
  }else{
      //没有数据
    //    echo 2;
     $sql="insert into cartlist values(null,$userid,$goodsid,'$goodsnum','$imgsrc',1)";
     $res=mysqli_query($link,$sql);
    if ($res) {
        // 插入成功
        // code 1成功，0失败
        $str = json_encode(array(
            "code" => 1,
            "msg" => "插入成功"
        ));
        echo $fn."($str)";
    }else{
        $str =  json_encode(array(
                "code" => 0,
                "msg" => "插入失败"
        ));
        echo $fn."($str)";
    };
        
  }
?>