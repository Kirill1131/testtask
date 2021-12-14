<?php
header('Content-type: application/json');

// header('Content-type: application/json');
// $array = array();
// //get_recursive_dir("Data\\lessons", $array);
//
// get_recursive_dir("..\\Data\\lessons", $array);
//
// function get_recursive_dir($start_dir, &$array)
// {
//   $sub_array = array();
//   foreach (glob($start_dir."\\*") as $filename) {
//    //echo $filename." ".filetype($filename)."<br />";
//    array_push($array, $filename);
//    get_recursive_dir($start_dir.get_after_last_slash($filename), $array);
//   }
// }
// function get_after_last_slash($str)
// {
//   $index = 0;
//   for ($i=strlen($str)-1; $i > 0; $i--) {
//
//     if ($str[$i]=="\\") {
//       $index = $i;
//       break;
//     }
//   }
//   return mb_substr($str,$index,strlen($str));
// }
// echo json_encode($array);

$array = array();
//get_recursive_dir("Data\\lessons", $array);
get_recursive_dir("..\\Data\\lessons", $array);

function get_recursive_dir($start_dir, &$array)
{
  $sub_array = array();
//  echo $start_dir."%<br/>";


  foreach (glob($start_dir."\\*") as $filename) {
   //echo "===========".$filename." ".filetype($filename)."|+2+|<br/>";
   $fileShowName;
   $dirShowName = "";
   $langName = "";

   if (filetype($filename)=='dir') {
     foreach (glob($filename."\\*") as $sub_file_name){
       //echo "$$".$sub_file_name."$$<br/>";
       if (filetype($sub_file_name)=='file') {
         if (get_after_last_slash($sub_file_name)[0]=="$") {
           $handle = fopen($sub_file_name, "r");
           $dirShowName = fgets($handle);
           try {
             $langName = fgets($handle);
           } catch (\Exception $e) {

           }

           fclose($handle);
           //echo $dirShowName."|-1-|<br/>";
           //$fileShowName = $dirShowName;
         }
       }
     }
   }

   //array_push($array, $filename);
   if (filetype($filename)=='file') {
     if (get_after_last_slash($filename)[0]=='1$') {
       //$handle = fopen($filename, "r");
       //$dirShowName = fgets($handle);
     }else{
       $handle = fopen($filename, "r");
       $fileShowName = fgets($handle);
       fclose($handle);
     }
   }

   if (filetype($filename)=='dir') {
     $fileShowName = $dirShowName;
   }
   //echo $fileShowName."|~3~|<br/>";
   $item_array = array($filename,filetype($filename), get_after_last_slash($filename),$fileShowName);

   if (strlen($langName)>0) {
     array_push($item_array, $langName);
   }
   //print_r($item_array);
   //echo "<br/>";
   //array_push($sub_array, $filename);
   array_push($sub_array, $item_array);
   get_recursive_dir($start_dir."\\".get_after_last_slash($filename), $sub_array);
  }



  if (count($sub_array)>0) {
    array_push($array, $sub_array);
  }
}
function get_after_last_slash($str)
{
  $index = 0;
  for ($i=strlen($str)-1; $i > 0; $i--) {

    if ($str[$i]=="\\") {
      $index = $i+1;
      break;
    }
  }
  return mb_substr($str,$index,strlen($str));
}
echo json_encode($array);
?>
