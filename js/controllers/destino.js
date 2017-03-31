angular.module('app').controller('ingreso_destino', function ($scope, $http, $state, NgTableParams, $timeout) {
    // Begin: Complementos
    $scope.destino = {};
    $scope.caballos = [];
    /*var myVar = setInterval(myTimer, 1000);
     
     $scope.fecha_inicioDestino;
     $scope.fecha_finDestino;
     function myTimer() {
     if ($scope.fecha_inicioDestino != $scope.destino.fecha_inicioDestino || $scope.fecha_finDestino != $scope.destino.fecha_finDestino) {
     $scope.fecha_inicioDestino = $scope.destino.fecha_inicioDestino;
     $scope.fecha_finDestino = $scope.destino.fecha_finDestino;
     $scope.listar_caballo();
     }
     }*/
    $scope.borrar_caballos = function () {
        $scope.caballos = [];
        $scope.tableParams2 = new NgTableParams({}, {
            dataset: $scope.caballos
        });
        $scope.cargando_caballos = true;
        $scope.contador_caballos = 0;
    };
    $scope.comprueba_horario_caballo = function (caballo) {
        caballo.comprobando_horario = true;
        caballo.horario_ocupado = false;
        caballo.fecha_inicioDestino = $scope.destino.fecha_inicioDestino;
        caballo.fecha_finDestino = $scope.destino.fecha_finDestino;
        if (caballo.fecha_inicioDestino != undefined && caballo.fecha_inicioDestino != null && caballo.fecha_finDestino != undefined && caballo.fecha_finDestino != null) {
            $http({
                url: 'api/Welcome/comprueba_horario_caballo',
                method: "POST",
                data: serialize(caballo),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                caballo.comprobando_horario = false;
                $scope.contador_caballos++;
                if ($scope.contador_caballos == $scope.caballos.length) {
                    $scope.cargando_caballos = false;
                }
                if (parseInt(response.data) > 0) {
                    caballo.horario_ocupado = true;
                    caballo.cabalga = false;
                }
            });
        }

    };

    $scope.cargando_caballos = false;
    $scope.contador_caballos = 0;
    $scope.listar_caballo = function () {
        if ($scope.destino.fecha_inicioDestino == null) {
            alert('Debe ingresar una fecha de inicio');
            return false;
        }
        if ($scope.destino.fecha_finDestino == null) {
            alert('Debe ingresar una fecha de término');
            return false;
        }
        $scope.cargando_caballos = true;
        $http({
            url: 'api/Welcome/listar_caballo_disponible',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].bloqueadoCaballo == 1) {
                    response.data[i].disponible = 'Trabajando';
                }
                if (response.data[i].bloqueadoCaballo == 2) {
                    response.data[i].disponible = 'Repetido';
                }
                if (response.data[i].bloqueadoCaballo == 3) {
                    response.data[i].disponible = 'Descansando';
                }
                if (response.data[i].bloqueadoCaballo == 4) {
                    response.data[i].disponible = 'Enfermo';
                }
                if (response.data[i].bloqueadoCaballo == 5) {
                    response.data[i].disponible = 'Perdido';
                }
                response.data[i].creacion = moment(response.data[i].creacionCaballo).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.caballos = response.data;
            $scope.contador_caballos = 0;
            for (var i = 0; i < $scope.caballos.length; i++) {
                $timeout($scope.comprueba_horario_caballo($scope.caballos[i]), 500);
            }
            $scope.tableParams2 = new NgTableParams({}, {
                dataset: $scope.caballos
            });
        });

    };

    $scope.listar_cliente = function () {
        $http({
            url: 'api/Welcome/listar_cliente',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.clientes = response.data;
            $scope.clientesAnterior = response.data;
        });

    };
    $scope.listar_cliente();
    $scope.listar_tipo_destino = function () {
        $http({
            url: 'api/Welcome/listar_tipo_destino',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.tipo_destinos = response.data;
        });

    };
    $scope.listar_tipo_destino();
    $scope.listar_baqueano = function () {
        $http({
            url: 'api/Welcome/listar_baqueano',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].nombre_completo = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario;
                response.data[i].creacion = moment(response.data[i].creacionUsuario).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.usuarios = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.usuarios
            });
        });

    };
    $scope.listar_baqueano();
    // End: Complementos
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));

    var cant_caballos = 0;
    var cont_caballos = 0;
    var cant_usuarios = 0;
    var cont_usuarios = 0;
    $scope.completar_destino = function () {
        // Colocamos los totales de usuarios asociados
        for (var i = 0; i < $scope.usuarios.length; i++) {
            if ($scope.usuarios[i].trabaja) {
                cant_usuarios++;
            }
        }
        // Colocamos los totales de caballos asociados
        for (var i = 0; i < $scope.caballos.length; i++) {
            if ($scope.caballos[i].cabalga) {
                cant_caballos++;
            }
        }
        for (var i = 0; i < $scope.usuarios.length; i++) {
            if ($scope.usuarios[i].trabaja) {
                $scope.ingresar_usuario_destino($scope.usuarios[i]);
            }
        }

        /*for (var i = 0; i < $scope.caballos.length; i++) {
         if ($scope.caballos[i].cabalga) {
         $scope.ingresar_caballo_destino($scope.caballos[i]);
         }
         }*/

        //$scope.ingresar_cliente_destino($scope.cliente_destino);
    };

    $scope.ingresar_cliente_destino = function (cliente_destino) {
        cliente_destino.destino_idDestino = $scope.destino.idDestino;
        $http({
            url: 'api/Welcome/ingresar_cliente_destino',
            method: "POST",
            data: serialize(cliente_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.ingresando = true;
            $state.go('main.listado_destino');
        });

    };

    $scope.ingresar_usuario_destino = function (usuario_destino) {
        usuario_destino.destino_idDestino = $scope.destino.idDestino;
        usuario_destino.usuario_idUsuario = usuario_destino.idUsuario;
        $http({
            url: 'api/Welcome/ingresar_usuario_destino',
            method: "POST",
            data: serialize(usuario_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            cont_usuarios++;
            if (cont_usuarios == cant_usuarios) {
                for (var i = 0; i < $scope.caballos.length; i++) {
                    if ($scope.caballos[i].cabalga) {
                        $scope.ingresar_caballo_destino($scope.caballos[i]);
                    }
                }
            }
        });

    };

    $scope.ingresar_caballo_destino = function (caballo_destino) {
        caballo_destino.destino_idDestino = $scope.destino.idDestino;
        caballo_destino.caballo_idCaballo = caballo_destino.idCaballo;
        $http({
            url: 'api/Welcome/ingresar_caballo_destino',
            method: "POST",
            data: serialize(caballo_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            cont_caballos++;
            if (cont_caballos == cant_caballos) {
                $scope.ingresar_cliente_destino($scope.cliente_destino);
            }
        });

    };


    $scope.cliente_destino = {};
    $scope.ingresando = false;
    $scope.ingresar_destino = function () {
        /*var usuarios_trabajadores = 0;
        for (var i = 0; i < $scope.usuarios.length; i++) {
            if ($scope.usuarios[i].trabaja) {
                usuarios_trabajadores++;
            }
        }
        if (usuarios_trabajadores == 0) {
            alert('Debe agregar al menos un trabajador');
            return false;
        }
        var caballos_trabajadores = 0;
        for (var i = 0; i < $scope.caballos.length; i++) {
            if ($scope.caballos[i].trabaja) {
                caballos_trabajadores++;
            }
        }
        if (caballos_trabajadores == 0) {
            alert('Debe agregar al menos un caballo');
            if ($scope.caballos.length == 0) {
                $scope.listar_caballo();
            }
            return false;
        }*/
        $scope.ingresando = true;
        $scope.destino.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        if ($scope.destino.pilcheroDestino == null || $scope.destino.pilcheroDestino == undefined) {
            $scope.destino.pilcheroDestino = 0;
        } else {
            $scope.destino.pilcheroDestino = 1;
        }
        if ($scope.destino.cabalgataDestino == null || $scope.destino.cabalgataDestino == undefined) {
            $scope.destino.cabalgataDestino = 0;
        } else {
            $scope.destino.cabalgataDestino = 1;
        }
        if ($scope.destino.taxiDestino == null || $scope.destino.taxiDestino == undefined) {
            $scope.destino.taxiDestino = 0;
        } else {
            $scope.destino.taxiDestino = 1;
        }
        if ($scope.destino.trabajoDestino == null || $scope.destino.trabajoDestino == undefined) {
            $scope.destino.trabajoDestino = 0;
        } else {
            $scope.destino.trabajoDestino = 1;
        }
        if ($scope.destino.tipo_destino_idTipo_destino == null) {
            alert('Debe seleccionar un destino');
            return false;
        }
        if ($scope.cliente_destino.cliente_idCliente == null) {
            alert('Debe seleccionar un cliente');
            return false;
        }
        if ($scope.destino.fecha_inicioDestino == null) {
            alert('Debe ingresar una fecha de inicio');
            return false;
        }
        if ($scope.destino.fecha_finDestino == null) {
            alert('Debe ingresar una fecha de término');
            return false;
        }
        $http({
            url: 'api/Welcome/ingresar_destino',
            method: "POST",
            data: $scope.serialize($scope.destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $http({
                url: 'api/Welcome/listar_ultimo_destino',
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.destino = response.data[0];
                $scope.completar_destino();
            });

        });

    };

    $scope.serialize = function (obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    };

    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }
});

angular.module('app').controller('detalle_destino', function ($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_caballo = function () {
        $http({
            url: 'api/Welcome/listar_caballo_orden_alfabetico',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].bloqueadoCaballo == 1) {
                    response.data[i].disponible = 'Trabajando';
                }
                if (response.data[i].bloqueadoCaballo == 2) {
                    response.data[i].disponible = 'Repetido';
                }
                if (response.data[i].bloqueadoCaballo == 3) {
                    response.data[i].disponible = 'Descansando';
                }
                if (response.data[i].bloqueadoCaballo == 4) {
                    response.data[i].disponible = 'Enfermo';
                }
                if (response.data[i].bloqueadoCaballo == 5) {
                    response.data[i].disponible = 'Perdido';
                }
                response.data[i].creacion = moment(response.data[i].creacionCaballo).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.caballos = response.data;
            $scope.caballosAnterior = response.data;
        });

    };
    $scope.listar_caballo();
    $scope.listar_cliente = function () {
        $http({
            url: 'api/Welcome/listar_cliente',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.clientes = response.data;
            $scope.clientesAnterior = response.data;
        });

    };
    $scope.listar_cliente();
    $scope.listar_tipo_destino = function () {
        $http({
            url: 'api/Welcome/listar_tipo_destino',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.tipo_destinos = response.data;
        });

    };
    $scope.listar_tipo_destino();
    $scope.listar_baqueano = function () {
        $http({
            url: 'api/Welcome/listar_baqueano',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].nombre_completo = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario;
                response.data[i].creacion = moment(response.data[i].creacionUsuario).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.usuarios = response.data;
            $scope.usuariosAnterior = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.usuarios
            });
        });

    };
    $scope.listar_baqueano();
    // End: Complementos
    $scope.detalle_cliente = function (cliente) {
        localStorage.setItem('cliente', JSON.stringify(cliente));
        $state.go('main.detalle_cliente');
    };
    $scope.detalle_caballo = function (caballo) {
        localStorage.setItem('caballo', JSON.stringify(caballo));
        $state.go('main.detalle_caballo');
    };
    $scope.listar_caballo_destino = function () {
        $scope.caballo_destinos = [];
        $http({
            url: 'api/Welcome/listar_caballo_destino_filtrado',
            method: "POST",
            data: serialize($scope.destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.caballo_destinos = response.data;
            quitar_caballo_listado();
        });
    };
    $scope.listar_usuario_destino = function () {
        $scope.usuario_destinos = [];
        $http({
            url: 'api/Welcome/listar_usuario_destino_filtrado',
            method: "POST",
            data: serialize($scope.destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.usuario_destinos = response.data;
            quitar_usuario_listado();
        });
    };
    $scope.listar_cliente_destino = function () {
        $scope.cliente_destinos = [];
        $http({
            url: 'api/Welcome/listar_cliente_destino_filtrado',
            method: "POST",
            data: serialize($scope.destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.cliente_destinos = response.data;
            quitar_cliente_listado();
        });
    };
    $scope.destino = JSON.parse(localStorage.getItem('destino'));
    $scope.listar_caballo_destino();
    $scope.listar_usuario_destino();
    $scope.listar_cliente_destino();
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.editado = false;
    $scope.editar_destino = function () {
        $scope.destino.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/editar_destino',
            method: "POST",
            data: serialize($scope.destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.editado = true;
            localStorage.setItem('destino', $scope.destino);
        });

    };

    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }

    $scope.eliminar = function (destino) {
        if ($scope.caballo_destinos.length != 0) {
            alert('Debe eliminar todos los caballos asociados');
            return false;
        }
        if ($scope.usuario_destinos.length != 0) {
            alert('Debe eliminar todos los baqueanos asociados');
            return false;
        }
        if ($scope.cliente_destinos.length != 0) {
            alert('Debe eliminar todos los clientes asociados');
            return false;
        }
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_destino',
                method: "POST",
                data: serialize(destino),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_destino');
            });
        }

    };

    function quitar_caballo_listado() {
        $scope.caballosAux = [];
        $scope.caballos = $scope.caballosAnterior;
        for (var i = 0; i < $scope.caballos.length; i++) {
            var existe = false;
            for (var j = 0; j < $scope.caballo_destinos.length; j++) {
                if ($scope.caballos[i].idCaballo == $scope.caballo_destinos[j].caballo_idCaballo) {
                    existe = true;
                }
            }
            if (!existe) {
                $scope.caballosAux.push($scope.caballos[i]);
            }
        }
        $scope.caballos = $scope.caballosAux;
    }

    function quitar_usuario_listado() {
        $scope.usuariosAux = [];
        $scope.usuarios = $scope.usuariosAnterior;
        for (var i = 0; i < $scope.usuarios.length; i++) {
            var existe = false;
            for (var j = 0; j < $scope.usuario_destinos.length; j++) {
                if ($scope.usuarios[i].idUsuario == $scope.usuario_destinos[j].usuario_idUsuario) {
                    existe = true;
                }
            }
            if (!existe) {
                $scope.usuariosAux.push($scope.usuarios[i]);
            }
        }
        $scope.usuarios = $scope.usuariosAux;
    }

    function quitar_cliente_listado() {
        $scope.clientesAux = [];
        $scope.clientes = $scope.clientesAnterior;
        for (var i = 0; i < $scope.clientes.length; i++) {
            var existe = false;
            for (var j = 0; j < $scope.cliente_destinos.length; j++) {
                if ($scope.clientes[i].idCliente == $scope.cliente_destinos[j].cliente_idCliente) {
                    existe = true;
                }
            }
            if (!existe) {
                $scope.clientesAux.push($scope.clientes[i]);
            }
        }
        $scope.clientes = $scope.clientesAux;
    }

    $scope.ingresar_caballo_destino = function () {
        // Begin: comprueba si está ocupado
        $scope.caballo_destino.fecha_inicioDestino = $scope.destino.fecha_inicioDestino;
        $scope.caballo_destino.fecha_finDestino = $scope.destino.fecha_finDestino;
        $scope.caballo_destino.idCaballo = $scope.caballo_destino.caballo_idCaballo;
        if ($scope.caballo_destino.fecha_inicioDestino != undefined && $scope.caballo_destino.fecha_inicioDestino != null && $scope.caballo_destino.fecha_finDestino != undefined && $scope.caballo_destino.fecha_finDestino != null) {
            $http({
                url: 'api/Welcome/comprueba_horario_caballo',
                method: "POST",
                data: serialize($scope.caballo_destino),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                if (parseInt(response.data) > 0) {
                    alert('Caballo ocupado en otra cabalgata dentro de este horario.');
                } else {
                    $scope.caballo_destino.destino_idDestino = $scope.destino.idDestino;
                    $http({
                        url: 'api/Welcome/ingresar_caballo_destino',
                        method: "POST",
                        data: serialize($scope.caballo_destino),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function (response) {
                        $scope.listar_caballo_destino();
                    });
                }
            });
        }
        // End: comprueba si está ocupado
    };

    $scope.quitar_caballo = function (caballo_destino) {
        $http({
            url: 'api/Welcome/eliminar_caballo_destino',
            method: "POST",
            data: serialize(caballo_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.listar_caballo_destino();
        });

    };

    $scope.ingresar_usuario_destino = function () {
        $scope.usuario_destino.destino_idDestino = $scope.destino.idDestino;
        $http({
            url: 'api/Welcome/ingresar_usuario_destino',
            method: "POST",
            data: serialize($scope.usuario_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_usuario_destino();
        });

    };

    $scope.quitar_usuario = function (usuario_destino) {
        $http({
            url: 'api/Welcome/eliminar_usuario_destino',
            method: "POST",
            data: serialize(usuario_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.listar_usuario_destino();
        });

    };

    $scope.ingresar_cliente_destino = function () {
        $scope.cliente_destino.destino_idDestino = $scope.destino.idDestino;
        $http({
            url: 'api/Welcome/ingresar_cliente_destino',
            method: "POST",
            data: serialize($scope.cliente_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_cliente_destino();
        });

    };

    $scope.quitar_cliente = function (cliente_destino) {
        $http({
            url: 'api/Welcome/eliminar_cliente_destino',
            method: "POST",
            data: serialize(cliente_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.listar_cliente_destino();
        });

    };

});

angular.module('app').controller('listado_destino', function ($scope, $http, $state, NgTableParams) {
    $scope.destinos = {};
    $scope.listar_destino = function () {
        $http({
            url: 'api/Welcome/listar_destino',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.destinos = response.data;
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].fecha_inicio = moment(response.data[i].fecha_inicioDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].fecha_fin = moment(response.data[i].fecha_finDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].creacion = moment(response.data[i].creacionDestino).format('DD/MM/YYYY HH:mm:ss');
                switch (response.data[i].concretadoDestino) {
                    case '0':
                        response.data[i].concretado = 'En proceso';
                        break;
                    case '1':
                        response.data[i].concretado = 'Concretado';
                        break;
                    case '2':
                        response.data[i].concretado = 'Anulado';
                        break;
                    default:
                        response.data[i].concretado = '';
                }
            }
            $scope.destinos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.destinos
            });
        });

    };
    $scope.listar_destino();
    $scope.detalle = function (destino) {
        localStorage.setItem('destino', JSON.stringify(destino));
        $state.go('main.detalle_destino');
    };
});
