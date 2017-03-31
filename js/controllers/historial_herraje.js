angular.module('app').controller('ingreso_historial_herraje', function($scope, $http, $state) {
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
    // End: Complementos
    $scope.historial_herraje = {};
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.ingresar_historial_herraje = function() {
        $scope.historial_herraje.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/ingresar_historial_herraje',
            method: "POST",
            data: $scope.serialize($scope.historial_herraje),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $state.go('main.listado_historial_herraje');
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

angular.module('app').controller('detalle_historial_herraje', function($scope, $http, $state) {
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
    // End: Complementos
    $scope.historial_herraje = JSON.parse(localStorage.getItem('historial_herraje'));
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.editado = false;
    $scope.editar_historial_herraje = function() {
        $scope.historial_herraje.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/editar_historial_herraje',
            method: "POST",
            data: serialize($scope.historial_herraje),
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

    $scope.eliminar = function(historial_herraje) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_historial_herraje',
                method: "POST",
                data: serialize(historial_herraje),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                $state.go('main.listado_historial_herraje');
            });
        }
    };

});

angular.module('app').controller('listado_historial_herraje', function($scope, $http, $state, NgTableParams) {
    $scope.historial_herrajes = {};
    $scope.listar_historial_herraje = function() {
        $http({
            url: 'api/Welcome/listar_historial_herraje',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].nombre_peso = response.data[i].nombreCaballo + ' - ' + response.data[i].pesoCaballo + 'Kg';
                response.data[i].creado_por = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario + ' / ' + response.data[i].rutUsuario;
                response.data[i].creacion = moment(response.data[i].creacionHistorial_herraje).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.historial_herrajes = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.historial_herrajes
            });
        });
    };
    $scope.listar_historial_herraje();
    $scope.detalle = function(historial_herraje) {
        localStorage.setItem('historial_herraje', JSON.stringify(historial_herraje));
        $state.go('main.detalle_historial_herraje');
    };
});
