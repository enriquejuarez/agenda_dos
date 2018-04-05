<?php 
    //$conn = new mysqli('localhost', 'root','hostserver119/','contactos');
    $conn = new mysqli('localhost', 'root','','contactos');
    
    if($conn->connect_error) {
      echo $error = $conn->connect_error;
    }

    function peticion_ajax(){
    	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
  }
?>