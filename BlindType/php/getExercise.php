<?php
header('Content-type: application/json');

$path = $_GET['path'];

$handle = fopen($path, "r");
$array = array();
if ($handle) {
  fgets($handle);
    while (($line = fgets($handle)) !== false) {

        array_push($array,$line);
    }

    fclose($handle);
} else {

}

echo json_encode($array);
?>
