<?php
header("Access-Control-Allow-Origin: *");
//建立数据库连接
    $link= mysqli_connect('127.0.0.1','root','','huan');
    if(!$link) die('连接失败');
    mysqli_query($link,"set names 'utf8'");
//    echo "11";
    $fn = $_GET['callback'];
    $userid = $_GET['userid'];


    // $sql1 = "select * from cartlist left join conlist on cartlist.goodsid = conlist.id  where cartlist.userid=$userid";
    $sql2 = "select count(*) cou from cartlist left join user on cartlist.userid = user.id where cartlist.userid=$userid";
    // echo $sql2;
    $res2=mysqli_query($link,$sql2);
    while($row2 = mysqli_fetch_assoc($res2)){
        $arr2[]= $row2;
      }
    //获取总条数
    $count=$arr2[0]['cou'];
    if(mysqli_num_rows($res2) > 0){
        $count=$arr2[0]['cou'];
    }else{
        $count=0;
    }

// 准备sql语句
$sql="select * from goodslist";
//    echo $sql;
$res=mysqli_query($link,$sql);

 $arr = [];
 while($row = mysqli_fetch_assoc($res)){
    $arr[]= $row;
}
 if (mysqli_num_rows($res) > 0) {
        $str = ['cartnum'=>$count,"datainfo"=>$arr];
        $str1 = json_encode(array(
            "status" => 1,
            "errmsg" => '成功',
            "DataStatus" => 200,
            "datas"=>$str 
        ));
        echo $fn."($str1)";
 }else{
       $str = ['cartnum'=>$count,"datainfo"=>$arr];
       $str1 = json_encode(array(
            "status" => 0,
            "errmsg" => "没有数据",
            "DataStatus" => 500,
            "datas"=>$str 
        ));
        echo $fn."($str1)";
 }
 

?>