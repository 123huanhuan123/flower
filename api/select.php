<?php
header("Access-Control-Allow-Origin: *");
//建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
//    echo "11";
    $fn = $_GET['callback1'];
    $keyword=$_GET['keyword'];

// 准备sql语句
$sql="select * from conlist where instro like '%$keyword%' or cpmc like '%$keyword%'";
$res=mysqli_query($link,$sql);

 $arr = [];
 while($row = mysqli_fetch_assoc($res)){
    $arr[]= $row;
}
 if (mysqli_num_rows($res) > 0) {
        $str = json_encode(array(
            "status" => 1,
            "errmsg" => '成功',
            "DataStatus" => 200,
            "datas"=>$arr
        ));
        echo $fn."($str)";
 }else{
       $str = json_encode(array(
            "status" => 0,
            "errmsg" => "没有数据",
            "DataStatus" => 500,
            "datas"=>$arr 
        ));
        echo $fn."($str)";
 }
 

?>
