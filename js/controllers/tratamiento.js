angular.module('app').controller('ingreso_tratamiento', function ($scope, $http, $state) {
    $scope.tratamiento = {};
    $scope.ingresar_tratamiento = function () {
        $http({
            url: 'api/Welcome/ingresar_tratamiento',
            method: "POST",
            data: $scope.serialize($scope.tratamiento),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_tratamiento');
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

angular.module('app').controller('detalle_tratamiento', function ($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_caballo = function () {
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
        });

    };
    $scope.listar_caballo();
    // End: Complementos
    $scope.control = {};
    $scope.ingresando_control = false;
    $scope.ingresar_control = function () {
        $scope.ingresando_control = true;
        $scope.control.tratamiento_idTratamiento = $scope.tratamiento.idTratamiento;
        $http({
            url: 'api/Welcome/ingresar_control',
            method: "POST",
            data: serialize($scope.control),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.ingresando_control = false;
            $scope.listar_control();
        });

    };
    $scope.listar_control = function () {
        $scope.control.tratamiento_idTratamiento = $scope.tratamiento.idTratamiento;
        $http({
            url: 'api/Welcome/listar_control',
            method: "POST",
            data: serialize($scope.control),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.controles = response.data;
        });

    };
    $scope.tratamiento = JSON.parse(localStorage.getItem('tratamiento'));
    $scope.listar_control();
    $scope.editado = false;
    $scope.editar_tratamiento = function () {
        if ($scope.tratamiento.finalizadoTratamiento == 0) {
            $http({
                url: 'api/Welcome/editar_tratamiento',
                method: "POST",
                data: serialize($scope.tratamiento),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.editado = true;
            });
        }
        if ($scope.tratamiento.finalizadoTratamiento == 1) {
            $http({
                url: 'api/Welcome/finalizar_tratamiento',
                method: "POST",
                data: serialize($scope.tratamiento),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.detalle_tratamiento();
            });
        }
    };

    $scope.detalle_tratamiento = function () {
        $http({
            url: 'api/Welcome/detalle_tratamiento',
            method: "POST",
            data: serialize($scope.tratamiento),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionTratamiento).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.tratamiento = response.data[0];
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

    $scope.eliminar = function (tratamiento) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_tratamiento',
                method: "POST",
                data: serialize(tratamiento),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_tratamiento');
            });
        }
    };

    $scope.eliminar_control = function (control) {
        var r = confirm('Está seguro de eliminar este control?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_control',
                method: "POST",
                data: serialize(control),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.listar_control();
            });
        }
    };

});

angular.module('app').controller('listado_tratamiento', function ($scope, $http, $state, NgTableParams) {
    $scope.tratamientos = {};
    $scope.listar_tratamiento = function () {
        $http({
            url: 'api/Welcome/listar_tratamiento',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionTratamiento).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.tratamientos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.tratamientos
            });
        });

    };
    $scope.listar_tratamiento();
    $scope.detalle = function (tratamiento) {
        localStorage.setItem('tratamiento', JSON.stringify(tratamiento));
        $state.go('main.detalle_tratamiento');
    };
});
