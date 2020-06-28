<?php
header("Access-Control-Allow-Origin: *");
   //建立数据库连接
 $link= mysqli_connect('127.0.0.1','root','','huan');
 if(!$link) die('连接失败');
 mysqli_query($link,"set names 'utf8'");
//获取传递值
  $fn = $_GET['callback'];
  //第几页
  $psize = $_GET['psize'];
  //每页显示条数
  $num = $_GET['num'];
  $userid=$_GET['userid'];
  //  准备sql语句
  $sql2 = "select count(*) cou from cartlist where userid=$userid";
  $res2=mysqli_query($link,$sql2);
  $arr2 = [];
  while($row2 = mysqli_fetch_assoc($res2)){
    $arr2[]= $row2;
  }
  //获取总条数
  $count=$arr2[0]['cou'];
  //获取总页数
  $pageCount = ceil($count/$num);
  //起使位置
  $start = ($psize-1)*$num;
  // echo $start,$num;
  // order by id limit $start,$num
  $sql1 = "select * from cartlist left join goodslist on cartlist.goodsid = goodslist.id  where cartlist.userid=$userid order by cartlist.id limit $start,$num";
  
  $res1=mysqli_query($link,$sql1);
  $arr1 = [];
  while($row1 = mysqli_fetch_assoc($res1)){
    $arr1[]= $row1;
  }
  $res = ['pageData'=>$arr1,'pcount'=>$pageCount];
  if (mysqli_num_rows($res1) > 0) {
        $str = json_encode(array(
            "status" => 1,
            "errmsg" => '成功',
            "DataStatus" => 200,
            "datas"=>$res
        ));
        echo $fn."($str)";
  }else{
        $str = json_encode(array(
            "status" => 0,
            "errmsg" => "没有数据",
            "DataStatus" => 500,
            "datas"=>$res
        ));
        echo $fn."($str)";
  }
?>