<?php
  $contents = file_get_contents('php://input');
  $filename = $_SERVER['HTTP_FILENAME'];
  file_put_contents('uploads/' . $filename, $contents);
  exit('File saved'); 
?>  

