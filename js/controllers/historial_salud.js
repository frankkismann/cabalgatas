angular.module('app').controller('ingreso_historial_salud', function($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_caballo = function() {
        $http({
            url: 'api/Welcome/listar_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.caballos = response.data;
        });

    };
    $scope.listar_caballo();
    $scope.listar_tratamiento = function() {
        $http({
            url: 'api/Welcome/listar_tratamiento',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.tratamientos = response.data;
        });

    };
    $scope.listar_tratamiento();
    // End: Complementos
    $scope.historial_salud = {};
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.ingresar_historial_salud = function() {
        $scope.historial_salud.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/ingresar_historial_salud',
            method: "POST",
            data: $scope.serialize($scope.historial_salud),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $state.go('main.listado_historial_salud');
        });

    };

    $scope.serialize = function(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    };
});

angular.module('app').controller('detalle_historial_salud', function($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_caballo = function() {
        $http({
            url: 'api/Welcome/listar_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.caballos = response.data;
        });

    };
    $scope.listar_caballo();
    $scope.listar_tratamiento = function() {
        $http({
            url: 'api/Welcome/listar_tratamiento',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.tratamientos = response.data;
        });

    };
    $scope.listar_tratamiento();
    // End: Complementos
    $scope.historial_salud = JSON.parse(localStorage.getItem('historial_salud'));
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.editado = false;
    $scope.editar_historial_salud = function() {
        $scope.historial_salud.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/editar_historial_salud',
            method: "POST",
            data: serialize($scope.historial_salud),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.editado = true;
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

    $scope.eliminar = function(historial_salud) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_historial_salud',
                method: "POST",
                data: serialize(historial_salud),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                $state.go('main.listado_historial_salud');
            });
        }
    };

    $scope.comparar_fechas = function(fecha_proximaHistorial_salud) {
        var dateB = moment();
        var dateC = moment(fecha_proximaHistorial_salud);
        if (dateB.diff(dateC) > 0) {
            return true;
        } else {
            return false;
        }
    };

});

angular.module('app').controller('listado_historial_salud', function($scope, $http, $state, NgTableParams) {
    $scope.historial_saludes = {};
    $scope.listar_historial_salud = function() {
        $http({
            url: 'api/Welcome/listar_historial_salud',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].nombre_peso = response.data[i].nombreCaballo + ' - ' + response.data[i].pesoCaballo + 'Kg';
                response.data[i].creado_por = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario + ' / ' + response.data[i].rutUsuario;
                response.data[i].creacion = moment(response.data[i].creacionHistorial_salud).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].fecha_proxima = moment(response.data[i].fecha_proximaHistorial_salud).format('DD/MM/YYYY');
            }
            $scope.historial_saludes = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.historial_saludes
            });
        });

    };
    $scope.listar_historial_salud();
    $scope.detalle = function(historial_salud) {
        localStorage.setItem('historial_salud', JSON.stringify(historial_salud));
        $state.go('main.detalle_historial_salud');
    };

    $scope.comparar_fechas = function(fecha_proximaHistorial_salud) {
        var dateB = moment();
        var dateC = moment(fecha_proximaHistorial_salud);
        if (dateB.diff(dateC) > 0) {
            return true;
        } else {
            return false;
        }
    };


});
