<?php

    //session_start();
    
    $indexContents = '
<!doctype html>
<html>
  <head>
    <!-- Do not delete this file. -->     
    <meta charset="utf-8">
    <title>Redirect to Parent Directory</title>
    <script>
      window.location.assign("/");
    </script>
  </head>
  <body> 
  </body>
</html>'
;
/*
    if($_SESSION["accessLevel"] !== "high"){
        die($_SESSION["accessLevel"]);
    }
*/
    
    //first, reduce file upload restrictions
    ini_set("file_uploads", "On");    
    ini_set("memory_limit", "512M");
    ini_set("upload_max_filesize", "50M");
    ini_set("post_max_size", "100M");
    ini_set("max_execution_time", "60");

    if(isset($_POST["uploadPath"])){
        $filesLocation = $_POST["uploadPath"];
    }
    else{
        $filesLocation = '../uploads/';  
    }
    /**
    attempt to create the filepath if it doesn't exist
    */
    if(!file_exists($filesLocation ."index.html")){
        mkdir($filesLocation, 0777, true);        
        chmod($filesLocation, 0777);
        file_put_contents($filesLocation . "index.html", $indexContents);        
        chmod($filesLocation . "index.html", 0777);        
    }

    //get and save file contents to server
    $contents = file_get_contents($_POST['contents']);
    file_put_contents($filesLocation . $_POST['filename'], $contents);

    //collect all the filenames to send back:
    $filesArray = scandir($filesLocation);
    $filesString = "";
    foreach($filesArray as $x){
        if($x != "."  and $x != ".." and $x != "index.html"){
            $filesString .= ( $x . "\n");
        }
    }
    //send back one string of all the file names (separated by newlines)
    exit($filesString);
?>