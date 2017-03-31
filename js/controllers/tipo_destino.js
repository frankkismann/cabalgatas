angular.module('app').controller('ingreso_tipo_destino', function ($scope, $http, $state) {
    $scope.tipo_destino = {};
    $scope.ingresar_tipo_destino = function () {
        $http({
            url: 'api/Welcome/ingresar_tipo_destino',
            method: "POST",
            data: $scope.serialize($scope.tipo_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_tipo_destino');
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

angular.module('app').controller('detalle_tipo_destino', function ($scope, $http, $state) {
    $scope.tipo_destino = JSON.parse(localStorage.getItem('tipo_destino'));
    //$scope.tipo_destino.distanciaTipo_destino = parseInt($scope.tipo_destino.distanciaTipo_destino);
    $scope.tipo_destino.tiempo_horasTipo_destino = parseInt($scope.tipo_destino.tiempo_horasTipo_destino);
    $scope.tipo_destino.dificultadTipo_destino = parseInt($scope.tipo_destino.dificultadTipo_destino);
    $scope.editado = false;
    $scope.editar_tipo_destino = function () {
        $http({
            url: 'api/Welcome/editar_tipo_destino',
            method: "POST",
            data: serialize($scope.tipo_destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
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

    $scope.eliminar = function (tipo_destino) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_tipo_destino',
                method: "POST",
                data: serialize(tipo_destino),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_tipo_destino');
            });
        }
    };

});

angular.module('app').controller('listado_tipo_destino', function ($scope, $http, $state, NgTableParams) {
    $scope.tipo_destinos = {};
    $scope.listar_tipo_destino = function () {
        $http({
            url: 'api/Welcome/listar_tipo_destino',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionTipo_destino).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.tipo_destinos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.tipo_destinos
            });
        });

    };
    $scope.listar_tipo_destino();
    $scope.detalle = function (tipo_destino) {
        localStorage.setItem('tipo_destino', JSON.stringify(tipo_destino));
        $state.go('main.detalle_tipo_destino');
    };
});
