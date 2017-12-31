<?php 
$url = "https://icepointcloud.com/login.jsp?redirect=https://icepointcloud.com/dashboard.jsp"; 
$contents = file_get_contents($url); 
//如果出现中文乱码使用下面代码 
//$getcontent = iconv("gb2312", "utf-8",$contents); 
echo $contents; 
?>