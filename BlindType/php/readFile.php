<?php
header('Content-type: application/json');

$path = $_GET['path'];

$handle = fopen($path, "r");
$result = '';
if ($handle) {
    while (($line = fgets($handle)) !== false) {
        $result.=$line;
    }

    fclose($handle);
} else {

}

echo json_encode($result);
?>
