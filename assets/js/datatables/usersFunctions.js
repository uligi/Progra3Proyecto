//*****************************************************************
//Inyección de eventos en el HTML
//*****************************************************************

$(function () { //para la creación de los controles
    //agrega los eventos las capas necesarias
    $("#enviar").click(function () {
        addOrUpdateUsers();
    });
    //agrega los eventos las capas necesarias
    $("#cancelar").click(function () {
        cancelAction();
    });    //agrega los eventos las capas necesarias

    $("#btMostarForm").click(function () {
        //muestra el fomurlaior
        clearFormUsers();
        $("#typeAction").val("add_users");
        $("#myModalFormulario").modal();
    });
    
    
    
});

//*********************************************************************
//cuando el documento esta cargado se procede a cargar la información
//*********************************************************************

$(document).ready(function () {
    cargarTablas();
    
});

//*********************************************************************
//Agregar o modificar la información
//*********************************************************************

function addOrUpdateUsers() {
    //Se envia la información por ajax
    if (validar()) {
        $.ajax({
            url: '../../../backend/controller/usersController.php',
            data: {
                action:                          $("#typeAction").val(),
                username:                        $("#txtusername").val(),
                name:                            $("#txtname").val(),
                last_name1:                      $("#txtlast_name1").val(),
                last_name2:                      $("#txtlast_name2").val(),
                email:                           $("#txtemail").val(),
                birth_date:                      $("#txtbirth_date").val(),
                address:                         $("#txtaddress").val(),
                work_phone:                      $("#txtwork_phone").val(),
                personal_phone:                  $("#txtpersonal_phone").val()
            },
            error: function () { //si existe un error en la respuesta del ajax
                swal("Error", "Se presento un error al enviar la informacion", "error");
            },
            success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
                var messageComplete = data.trim();
                var responseText = messageComplete.substring(2);
                var typeOfMessage = messageComplete.substring(0, 2);
                if (typeOfMessage === "M~") { //si todo esta corecto
                    swal("Confirmacion", responseText, "success");
                    clearFormUsers();
                    $("#dt_Users").DataTable().ajax.reload();
                } else {//existe un error
                    swal("Error", responseText, "error");
                }
            },
            type: 'POST'
        });
    }else{
        swal("Error de validación", "Los datos del formulario no fueron digitados, por favor verificar", "error");
    }
}

//*****************************************************************
//*****************************************************************
function validar() {
    var validacion = true;

    
    //valida cada uno de los campos del formulario
    //Nota: Solo si fueron digitados
    if ($("#txtusername").val() === "") {
        validacion = false;
    }

    if ($("#txtname").val() === "") {
        validacion = false;
    }

    if ($("#txtlast_name1").val() === "") {
        validacion = false;
    }

    if ($("#txtlast_name2").val() === "") {
        validacion = false;
    }

    if ($("#txtbirth_date").val() === "") {
        validacion = false;
    }

    if ($("#txtemail").val() === "") {
        validacion = false;
    }

    if ($("#txtaddress").val() === "") {
        validacion = false;
    }

    if ($("#txtwork_phone").val() === "") {
        validacion = false;
    } 

    if ($("#txtpersonal_phone").val() === "") {
        validacion = false;
    }

    return validacion;
}

//*****************************************************************
//*****************************************************************

function clearFormUsers() {
    $('#formUsers').trigger("reset");
}

//*****************************************************************
//*****************************************************************

function cancelAction() {
    //clean all fields of the form
    clearFormUsers();
    $("#typeAction").val("add_users");
    $("#myModalFormulario").modal("hide");
}



//*****************************************************************
//*****************************************************************

function showUsersByID(Cedula) {
    //Se envia la información por ajax
    $.ajax({
        url: '../../../backend/controller/usersController.php',
        data: {
            action: "show_users",
            Cedula: Cedula
        },
        error: function () { //si existe un error en la respuesta del ajax
            swal("Error", "Se presento un error al consultar la informacion", "error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            var objUsersJSon = JSON.parse(data);
            $("#txtusername").val(objUsersJSon.username);
            $("#txtname").val(objUsersJSon.name);
            $("#txtlast_name1").val(objUsersJSon.last_name1);
            $("#txtlast_name2").val(objUsersJSon.last_name2);
            $("#txtemail").val(objUsersJSon.email);
            $("#txtbirth_date").val(objUserssJSon.birth_date);
            $("#txtaddress").val(objUsersJSon.address);
            $("#txtwork_phone").val(objUsersJSon.work_phone);
            $("#txtpersonal_phone").val(objUsersJSon.personal_phone);
            $("#typeAction").val("update_users");
            
            swal("Confirmacion", "Los datos de la persona fueron cargados correctamente", "success");
        },
        type: 'POST'
    });
}

//*****************************************************************
//*****************************************************************

function deleteUsersByID(username) {
    //Se envia la información por ajax
    $.ajax({
        url: '../../../backend/controller/usersController.php',
        data: {
            action: "delete_users",
            username: username
        },
        error: function () { //si existe un error en la respuesta del ajax
            swal("Error", "Se presento un error al eliminar la informacion", "error");
        },
        success: function (data) { //si todo esta correcto en la respuesta del ajax, la respuesta queda en el data
            var responseText = data.trim().substring(2);
            var typeOfMessage = data.trim().substring(0, 2);
            if (typeOfMessage === "M~") { //si todo esta corecto
                swal("Confirmacion", responseText, "success");
                clearFormUsers();
                $("#dt_Users").DataTable().ajax.reload();
            } else {//existe un error
                swal("Error", responseText, "error");
            }
        },
        type: 'POST'
    });
}




//*******************************************************************************
//Metodo para cargar las tablas
//*******************************************************************************


function cargarTablas() {



    var dataTableUsers_const = function () {
        if ($("#dt_Users").length) {
            $("#dt_Users").DataTable({
                dom: "Bfrtip",
                bFilter: true,
                ordering: true,
                buttons: [
                    {
                        extend: "copy",
                        className: "btn-sm",
                        text: "Copiar"
                    },
                    {
                        extend: "csv",
                        className: "btn-sm",
                        text: "Exportar a CSV"
                    },
                    {
                        extend: "print",
                        className: "btn-sm",
                        text: "Imprimir"
                    }

                ],
                "columnDefs": [
                    {
                        targets: 6,
                        className: "dt-center",
                        render: function (data, type, row, meta) {
                            var botones = '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="showUsersByID(\''+row[0]+'\');">Cargar</button> ';
                            botones += '<button type="button" class="btn btn-default btn-xs" aria-label="Left Align" onclick="deleteUsersByID(\''+row[0]+'\');">Eliminar</button>';
                            return botones;
                        }
                    }

                ],
                pageLength: 5,
                language: dt_lenguaje_espanol,
                ajax: {
                    url: '../../../backend/controller/usersController.php',
                    type: "POST",
                    data: function (d) {
                        return $.extend({}, d, {
                            action: "showAll_Users"
                        });
                    }
                },
                drawCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('#dt_Users').DataTable().columns.adjust().responsive.recalc();
                }
            });
        }
    };



    TableManageButtons = function () {
        "use strict";
        return {
            init: function () {
                dataTableUsers_const();
                $(".dataTables_filter input").addClass("form-control input-rounded ml-sm");
            }
        };
    }();

    TableManageButtons.init();
}

//*******************************************************************************
//evento que reajusta la tabla en el tamaño de la pantall
//*******************************************************************************

window.onresize = function () {
    $('#dt_Users').DataTable().columns.adjust().responsive.recalc();
};
