<?php

    //set default file location unless proper path is provided by user
    $filesLocation = '../uploads/'; 
    //prepare to send list of files from $filesLocation only if it has an index.html file
    $filesString = "";    
    if(file_exists($filesLocation . "index.html")){
        //gather and concatenate file names except '.', '..', and index.html
        $filesArray = scandir($filesLocation);
        foreach($filesArray as $x){
            if($x != "."  and $x != ".." and $x != "index.html"){
                $filesString .= ( $x . "\n");
            }
        }
        $fileString .= "End of string\nEnd of string\n";
        //send the user the newline-seperated filename string or the original blank string
        exit($filesString);      
    }

?>