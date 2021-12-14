<?php
header('Content-type: application/json');

$path = $_GET['kbdCode'];

$handle = fopen('../Data/keyboards/'.$path.'.txt', "r");
$result = array(array(),array(),array());
//$array = array();
$i = 0;
if ($handle) {
    while (($line = fgets($handle)) !== false) {
      if (strlen($line)>2) {
        array_push($result[$i],$line);
      }else if(strlen($line)<=2){
        $i+=1;
      }
    }
    fclose($handle);
} else {

}
echo json_encode($result);
?>
