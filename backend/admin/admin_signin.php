<?php


session_start();

error_reporting(0);
if (!($_SESSION['admin'] == null || $_SESSION['admin'] == "")) {
    //$arreglo = $_SESSION['admin'];
} else {
    //header("Location:admin_signin.php");
}


$page_title = 'Ingreso';


?>





<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Easy Travel <?php if (isset($page_title)) {
                            echo '- ' . $page_title;
                        } ?> </title>
    <link rel="icon" type="image/x-icon" href="../../assets/img/icons/png/36x36.png">
    <meta name="description" content="Agencia de Viajes">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS -->
    <link href="../../assets/css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/css/custom.css" rel="stylesheet" type="text/css" />

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

    <!-- JavaScript -->
    <script src="../../assets/js/jquery-3.6.0.min.js"></script>
    <script src="../../assets/js/bootstrap.js"></script>
    <script src="../../assets/js/custom.js"></script>


</head>





<body>


    <?php

    require_once('admin_navbar.php');
    
    ?>



    <br><br>


    <!-- SIGN IN -->
    <div class="my-auto signup-form2 shadow text-center" style="max-width:350px !important;">

        
        

        <form action="../../backend/controller/admin_loginValidation_session.php" method="POST"  onsubmit="return true;">

        <h2>Ingreso</h2>
        <p>Por favor llene los datos para ingresar como administrador</p>
        <hr>


            <!-- usuario -->
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-user"> </i></span>
                    <input id="login" name="login" type="text" class="form-control" placeholder="Usuario" required="required">
                </div>
            </div>

            <!-- contraseña -->
            <div class="form-group">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    <input id="password" name="password" type="password" class="form-control" placeholder="Contraseña" required="required">
                </div>
            </div>

            <!-- botón registrarse -->
            <div class="form-group col-6 mx-auto">
                <button type="submit" class="btn btn-primary btn-lg">Ingresar</button>
            </div>



        </form>
    </div>
    <!-- SIGN IN -->


    <br><br>


</body>

</html>