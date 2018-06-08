/// <reference path="../../Utils/autentication.js" />
function inicioNav() {
    $("#navIniciar").hide();
    $("#navUsuario").show();
    $('#crearCuentaPanel').hide();
    $('#iniciarSesionPanel').show();
}
function cierroNav() {
    $("#navIniciar").show();
    $("#navUsuario").hide();
    $('#crearCuentaPanel').show();
    $('#iniciarSesionPanel').hide();
}

function getUser(Email) {
    var idUsuario;
    $.ajax({
        type: 'GET',
        url: '/api/users/GetIdUser?Email='+Email,
        contentType: 'json',
        dataType: 'json',
        async: false,
        success: function (data) {
            idUsuario = data.IdUsuario;
        },
        error: function (xhr) {
            alert('Problemas al recuperar datos');
        }
    });
    return idUsuario;
}

function crearCuentaHide() {
    $('.crearCuentaTxt').hide();
    $('#formCrearCuenta').hide();
    $('#formYaTienesCuenta').show();
}
function crearCuentaShow() {
    $('.crearCuentaTxt').show();
    $('#formCrearCuenta').show();
    $('#formYaTienesCuenta').hide();
}

function cambioPaneles(){
    $('#gracias').hide();
    $('#formularioCrear').show();
    $('#nombreNuevo').val('');
    $('#correoNuevo').val('');
    $('#claveNuevo').val('');
}

function login(usuario, clave) {
    var dataUser = {
        Mail: usuario,
        Password: clave
    }
    $.ajax({
        type: 'POST',
        url: '/api/users/Auth',
        dataType: 'json',
        data: JSON.stringify(dataUser),
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            if (data.Entra == true) {
                $("#btnIniciarSesion").button('reset');
                crearCuentaHide();
                inicioNav();
                Cookies.set('usuario', usuario);
                Cookies.set('nombre', data.Nombre);
                $('#txtNombreUsuario').text(data.Nombre);
                Cookies.set('iniciado', true);
                window.location.replace("/especialistas");
            } else {
                alert('Usuario o clave incorrecto');
            }
        },
        error: function (xhr) {
            $("#btnIniciarSesion").button('reset');
            alert('Usuario o clave incorrecto');
        }
    });
};

$(document).ready(function () {
    esconderBar();
    $('#formYaTienesCuenta').hide();
    $('#btnRecuperarContrasena').hide();
    if (window.location.pathname == '/') {
        $('.nosotrosBar').show();
        
    } else {
        $('.preguntaBar').show();
    }
    var user = Cookies.get('usuario');
    if (user != null) {
        inicioNav();
        var nombreU = Cookies.get('nombre');
        $('#txtNombreUsuario').text(nombreU);
        crearCuentaHide();

    } else {
       cierroNav();
    }
    
    $(".busqueda").click(function () {
        window.location.replace("/newhome/search?query=" + $("#txtPregunta").val());
    });

    $(".busquedaNav").click(function () {
        window.location.replace("/newhome/search?query=" + $("#txtPreguntaNav").val());
    });

    $("#btnIniciarSesion").click(function () {
        var $this = $(this);
        $this.button('loading');
        var user = $("#emailUser").val();
        var pass = $("#passwordUser").val();
        login(user, pass);
    });
   

    //inicio de funcion iniciar asistencia
    //SignalR
    // Declare a proxy to reference the hub.
    //End SignalR
    //fin inicio asistencia
    $('.cerrarSesion').click(function () {
        cierroNav();
        
        $("#emailUser").val('');
        $("#passwordUser").val('');
        Cookies.remove('usuario');
        Cookies.remove('nombre');
        Cookies.remove('pago');
        Cookies.set('iniciado', false);
        crearCuentaShow();
        cambioPaneles();
    });
    
    $('.btnOlvidaste').click(function () {
        $('#btnIniciarSesion').hide();
        $('#passwordUser').hide();
        $('.btnOlvidaste').hide();
        $('#btnRecuperarContrasena').show('slow');
    });
    $(document).keypress(function (e) {
        if (e.which == 13 && $("#passwordUser").is(":focus")) {
            $('#btnIniciarSesion').click();
        }
    });
    $('#btnRecuperarContrasena').click(function () {
        var email = $('#emailUser').val();
        var dataUser = {
            Mail: email
        }
        $.ajax({
            type: 'POST',
            url: '/api/users/RememberPassword',
            dataType: 'json',
            data: JSON.stringify(dataUser),
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (data) {
                    volverLogin();
                    $('#emailUser').val('');
                    alert('Correo de recuperación enviado.');
            },
            error: function (xhr) {
                alert('Problemas al enviar correo de recuperación');
            }
        });
    });
    function volverLogin() {
        $('#btnIniciarSesion').show();
        $('#passwordUser').show();
        $('.btnOlvidaste').show();
        $('#btnRecuperarContrasena').hide();
    }
    function esconderBar(){
        $('.preguntaBar').hide();
        $('.nosotrosBar').hide();
    }

    
});