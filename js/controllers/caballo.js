angular.module('app').controller('ingreso_caballo', function ($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_clase_caballo = function () {
        $http({
            url: 'api/Welcome/listar_clase_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.clase_caballos = response.data;
        });

    };
    $scope.listar_clase_caballo();
    // End: Complementos
    $scope.caballo = {};
    $scope.guardando = false;
    $scope.ingresar_caballo = function () {
        $scope.guardando = true;
        $http({
            url: 'api/Welcome/ingresar_caballo',
            method: "POST",
            data: $scope.serialize($scope.caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            //$state.go('main.listado_caballo');
            $http({
                url: 'api/Welcome/listar_ultimo_caballo',
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.guardando = false;
                response.data[0].ingresado = true;
                localStorage.setItem('caballo', JSON.stringify(response.data[0]));
                $state.go('main.detalle_caballo');
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
});

angular.module('app').controller('detalle_caballo', function ($scope, $http, $state, Upload) {
    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top},
                'slow');
    }

    // Begin: Complementos
    $scope.listar_clase_caballo = function () {
        $http({
            url: 'api/Welcome/listar_clase_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.clase_caballos = response.data;
        });

    };
    $scope.listar_clase_caballo();
    $scope.listar_pesebrera = function () {
        $http({
            url: 'api/Welcome/listar_pesebrera',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.pesebreras = response.data;
            $scope.pesebrerasAnterior = response.data;
        });

    };
    $scope.listar_pesebrera();
    // End: Complementos
    $scope.detalle_pesebrera = function (pesebrera) {
        localStorage.setItem('pesebrera', JSON.stringify(pesebrera));
        $state.go('main.detalle_pesebrera');
    };
    $scope.detalle_tratamiento = function (tratamiento) {
        localStorage.setItem('tratamiento', JSON.stringify(tratamiento));
        $state.go('main.detalle_tratamiento');
    };
    $scope.listar_caballo_pesebrera = function () {
        $scope.caballo_pesebreras = [];
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/listar_caballo_pesebrera_filtrado',
            method: "POST",
            data: serialize($scope.caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.caballo_pesebreras = response.data;
            quitar_pesebrera_listado();
        }, function (response) {
            console.log(response);
        });
    };

    $scope.listar_tratamientos = function () {
        $scope.tratamientos = [];
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/listar_tratamiento_filtrado',
            method: "POST",
            data: serialize($scope.caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            console.log(response.data);
            $scope.tratamientos = response.data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.listar_galeria = function () {
        if (!$scope.arrGalerias)
            $scope.arrGalerias = [];
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/listar_galeria_caballo',
            method: "POST",
            data: serialize($scope.caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.arrGalerias = response.data;
        });
    };
    $scope.caballo = JSON.parse(localStorage.getItem('caballo'));
    if ($scope.caballo.ingresado) {
        setTimeout(
                function () {
                    goToByScroll('foto_principal');
                    $scope.caballo.ingresado = false;
                    localStorage.setItem('caballo', $scope.caballo);
                }, 1000);
    }
    $scope.listar_caballo_pesebrera();
    $scope.listar_galeria();
    $scope.caballo.valorCaballo = parseInt($scope.caballo.valorCaballo);
    $scope.caballo.pesoCaballo = parseFloat($scope.caballo.pesoCaballo);
    $scope.editado = false;
    $scope.editar_caballo = function () {
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/editar_caballo',
            method: "POST",
            data: serialize($scope.caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.editado = true;
            localStorage.setItem('caballo', JSON.stringify($scope.caballo));
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

    $scope.eliminar = function (caballo) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'http://estanciacerropaine.com/sistema/api/Welcome/eliminar_caballo',
                method: "POST",
                data: serialize(caballo),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_caballo');
            });
        }
    };

    function quitar_pesebrera_listado() {
        $scope.pesebrerasAux = [];
        $scope.pesebreras = $scope.pesebrerasAnterior;
        if ($scope.pesebreras)
            for (var i = 0; i < $scope.pesebreras.length; i++) {
                var existe = false;
                for (var j = 0; j < $scope.caballo_pesebreras.length; j++) {
                    if ($scope.pesebreras[i].idPesebrera == $scope.caballo_pesebreras[j].pesebrera_idPesebrera) {
                        existe = true;
                    }
                }
                if (!existe) {
                    $scope.pesebrerasAux.push($scope.pesebreras[i]);
                }
            }
        $scope.pesebreras = $scope.pesebrerasAux;
    }

    $scope.ingresar_caballo_pesebrera = function () {
        $scope.caballo_pesebrera.caballo_idCaballo = $scope.caballo.idCaballo;
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/ingresar_caballo_pesebrera',
            method: "POST",
            data: serialize($scope.caballo_pesebrera),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_caballo_pesebrera();
        });

    };

    $scope.tratamiento = {};
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.ingresar_tratamiento = function () {
        $scope.tratamiento.caballo_idCaballo = $scope.caballo.idCaballo;
        $scope.tratamiento.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/ingresar_tratamiento',
            method: "POST",
            data: serialize($scope.tratamiento),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_tratamientos();
        });

    };
    $scope.listar_tratamientos();

    $scope.quitar_pesebrera = function (caballo_pesebrera) {
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/eliminar_caballo_pesebrera',
            method: "POST",
            data: serialize(caballo_pesebrera),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_caballo_pesebrera();
        });

    };

    $scope.quitar_tratamiento = function (tratamiento) {
        var r = confirm('Está seguro de eliminar este tratamiento?');
        if (r) {
            $http({
                url: 'http://estanciacerropaine.com/sistema/api/Welcome/eliminar_tratamiento',
                method: "POST",
                data: serialize(tratamiento),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.listar_tratamientos();
            });
        }
    };

    $scope.subir_foto_principal = function () {
        $scope.disabledFoto_principal = true;
        Upload.upload({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/foto_caballo',
            data: {
                foto_principal: $scope.foto_principal,
                idCaballo: $scope.caballo.idCaballo
            }
        }).then(function (response) {
            $scope.disabledFoto_principal = false;
            if (response.data) {
                if (response.data.charAt(0) == '"')
                    $scope.caballo.fotoCaballo = response.data.slice(1, -1);
                else
                    $scope.caballo.fotoCaballo = response.data;
                localStorage.setItem('caballo', JSON.stringify($scope.caballo));
            } else
                $scope.error_foto_principal = true;
        }, function (response) {
            $scope.disabledFoto_principal = false;
            $scope.error_foto_principal = true;
            console.log(response);
        });
    };

    $scope.subir_foto_galeria = function () {
        console.log($scope.foto_galeria);
        $scope.disabledFoto_galeria = true;
        Upload.upload({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/galeria_caballo',
            data: {
                foto_galeria: $scope.foto_galeria,
                idCaballo: $scope.caballo.idCaballo,
                descripcionGaleria: $scope.descripcionGaleria
            }
        }).then(function (response) {
            $scope.disabledFoto_galeria = false;
            if (response.data)
                $scope.listar_galeria();
            else
                $scope.error_foto_galeria = true;
        }, function (response) {
            $scope.disabledFoto_galeria = false;
            $scope.error_foto_galeria = true;
        });
    };

    $scope.quitar_galeria = function (galeria) {
        $http({
            url: 'http://estanciacerropaine.com/sistema/api/Welcome/quitar_galeria',
            method: "POST",
            data: serialize(galeria),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.listar_galeria();
        });
    };

});

angular.module('app').controller('listado_caballo', function ($scope, $http, $state, NgTableParams) {
    $scope.caballos = {};
    $scope.listar_caballo = function () {
        $http({
            url: 'api/Welcome/listar_caballo',
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
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.caballos
            });
        });
    };
    $scope.listar_caballo();
    $scope.detalle = function (caballo) {
        localStorage.setItem('caballo', JSON.stringify(caballo));
        $state.go('main.detalle_caballo');
    };
});

angular.module('app').controller('disponibilizar_caballos', function ($scope, $http, $state, NgTableParams) {
    $scope.caballos = {};
    $scope.listar_caballo = function () {
        $http({
            url: 'api/Welcome/listar_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].disponible = parseInt(response.data[i].bloqueadoCaballo) ? 'Disponible' : 'No disponible';
                response.data[i].creacion = moment(response.data[i].creacionCaballo).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.caballos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.caballos
            });
        });
    };
    $scope.listar_caballo();
    $scope.detalle = function (caballo) {
        localStorage.setItem('caballo', JSON.stringify(caballo));
        $state.go('main.detalle_caballo');
    };

    $scope.todos_trabajan;
    $scope.trabajan = function () {
        $scope.ninguno_trabaja = false;
        for (var i = 0; i < $scope.caballos.length; i++) {
            $scope.caballoAux = $scope.caballos[i];
            if ($scope.todos_trabajan) {
                $scope.caballoAux.trabaja = true;
                $scope.caballoAux.no_trabaja = false;
            } else {
                $scope.caballoAux.trabaja = false;
            }
        }
    };
    $scope.ninguno_trabaja;
    $scope.no_trabajan = function () {
        $scope.todos_trabajan = false;
        for (var i = 0; i < $scope.caballos.length; i++) {
            $scope.caballoAux = $scope.caballos[i];
            if ($scope.ninguno_trabaja) {
                $scope.caballoAux.no_trabaja = true;
                $scope.caballoAux.trabaja = false;
            } else {
                $scope.caballoAux.no_trabaja = false;
            }
        }
    };

    $scope.trabaja = function (caballo) {
        if (caballo.trabaja) {
            caballo.no_trabaja = false;
            $scope.ninguno_trabaja = false;
        }
    };

    $scope.no_trabaja = function (caballo) {
        if (caballo.no_trabaja) {
            caballo.trabaja = false;
            $scope.todos_trabajan = false;
        }
    };

    $scope.previsualizados = false;
    $scope.disponibilizar_caballos = function () {
        for (var i = 0; i < $scope.caballos.length; i++) {
            var caballoAux = $scope.caballos[i];
            if (caballoAux.trabaja && caballoAux.bloqueadoCaballo != 1 && caballoAux.bloqueadoCaballo != 2) {
                caballoAux.bloqueadoCaballo = 1;
            } else if (caballoAux.trabaja && (caballoAux.bloqueadoCaballo == 1 || caballoAux.bloqueadoCaballo == 2)) {
                caballoAux.bloqueadoCaballo = 2;
            } else if (caballoAux.no_trabaja) {
                caballoAux.bloqueadoCaballo = 3;
            } else if (!caballoAux.no_trabaja && !caballoAux.trabaja) {
                caballoAux.bloqueadoCaballo = 5;
            }
            $scope.previsualizados = true;
        }
    };

    $scope.total_caballos = 0;
    $scope.contador_caballos = 0;
    $scope.continuando = false;
    $scope.continuar = function () {
        var r = confirm('Está a punto de cambiar los estados de sus caballos. Desea continuar?');
        if (r) {
            $scope.continuando = true;
            $scope.total_caballos = $scope.caballos.length;
            for (var i = 0; i < $scope.caballos.length; i++) {
                var caballoAux = $scope.caballos[i];
                $http({
                    url: 'http://estanciacerropaine.com/sistema/api/Welcome/editar_caballo',
                    method: "POST",
                    data: serialize(caballoAux),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    $scope.contador_caballos++;
                    if ($scope.contador_caballos == $scope.total_caballos) {
                        $scope.continuando = false;
                        $state.go('main.disponibilizar_caballos2');
                    }
                });
            }
        }
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

    $scope.actualiza = function () {
        location.reload();
    };

});
angular.module('app').controller('disponibilizar_caballos2', function ($scope, $http, $state, NgTableParams) {
    $scope.caballos = {};
    $scope.listar_caballo = function () {
        $http({
            url: 'api/Welcome/listar_caballo_no_trabajan',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].disponible = parseInt(response.data[i].bloqueadoCaballo) ? 'Disponible' : 'No disponible';
                response.data[i].creacion = moment(response.data[i].creacionCaballo).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.caballos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.caballos
            });
        });
    };
    $scope.listar_caballo();
    $scope.detalle = function (caballo) {
        localStorage.setItem('caballo', JSON.stringify(caballo));
        $state.go('main.detalle_caballo');
    };

    $scope.estados = [
        {
            'id': '1',
            'nombre': 'Trabajando'
        }, {
            'id': '2',
            'nombre': 'Repetido'
        }, {
            'id': '3',
            'nombre': 'Descansando'
        }, {
            'id': '4',
            'nombre': 'Enfermo'
        }, {
            'id': '5',
            'nombre': 'Perdido'
        }
    ];

    $scope.total_caballos = 0;
    $scope.contador_caballos = 0;
    $scope.continuando = false;
    $scope.continuar = function () {
        var r = confirm('Está a punto de cambiar los estados de sus caballos. Desea continuar?');
        if (r) {
            $scope.continuando = true;
            $scope.total_caballos = $scope.caballos.length;
            $scope.contador_caballos = 0;
            for (var i = 0; i < $scope.caballos.length; i++) {
                var caballoAux = $scope.caballos[i];
                $http({
                    url: 'http://estanciacerropaine.com/sistema/api/Welcome/editar_caballo',
                    method: "POST",
                    data: serialize(caballoAux),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    $scope.contador_caballos++;
                    if ($scope.contador_caballos == $scope.total_caballos) {
                        $scope.continuando = false;
                        alert('Estados cambiados');
                    }
                });
            }
        }
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

    $scope.actualiza = function () {
        location.reload();
    };

});
