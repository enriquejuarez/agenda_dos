<?php
    $id = htmlspecialchars($_GET['id']);
   
   try {
        require_once('funciones/bd_conexion.php');
        $sql = "DELETE FROM `contactos` WHERE `id` IN ({$id});";
      
        $resultado = $conn->query($sql);
   } catch (Exception $e) {
       $error = $e->getMessage();
   } 
    $conn->close();
?>

