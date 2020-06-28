<?php
header("Access-Control-Allow-Origin: *");
  //建立数据库连接
 $link= mysqli_connect('127.0.0.1','root','','huan');
 if(!$link) die('连接失败');
 mysqli_query($link,"set names 'utf8'");
 $fn = $_GET['callback'];
 $psize = $_GET['psize'];
 $num = $_GET['num'];
//  准备sql语句
 $sql2 = 'select count(*) cou from conlist';
 $res2=mysqli_query($link,$sql2);
 $arr2 = [];
 while($row2 = mysqli_fetch_assoc($res2)){
    $arr2[]= $row2;
}
 $count=$arr2[0]['cou'];
$pageCount = ceil($count/$num);
$start = ($psize-1)*$num;

$sql1 = "select * from conlist order by id limit $start,$num";
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