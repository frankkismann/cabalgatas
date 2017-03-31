angular.module('app').controller('ingreso_clase_caballo', function ($scope, $http, $state) {
    $scope.clase_caballo = {};
    $scope.ingresar_clase_caballo = function () {
        $http({
            url: 'api/Welcome/ingresar_clase_caballo',
            method: "POST",
            data: $scope.serialize($scope.clase_caballo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_clase_caballo');
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

angular.module('app').controller('detalle_clase_caballo', function ($scope, $http, $state) {
    $scope.clase_caballo = JSON.parse(localStorage.getItem('clase_caballo'));
    $scope.editado = false;
    $scope.editar_clase_caballo = function () {
        $http({
            url: 'api/Welcome/editar_clase_caballo',
            method: "POST",
            data: serialize($scope.clase_caballo),
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

    $scope.eliminar = function (clase_caballo) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_clase_caballo',
                method: "POST",
                data: serialize(clase_caballo),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_clase_caballo');
            });
        }
    };

});

angular.module('app').controller('listado_clase_caballo', function ($scope, $http, $state, NgTableParams) {
    $scope.clase_caballos = {};
    $scope.listar_clase_caballo = function () {
        $http({
            url: 'api/Welcome/listar_clase_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionClase_caballo).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.clase_caballos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.clase_caballos
            });
        });

    };
    $scope.listar_clase_caballo();
    $scope.detalle = function (clase_caballo) {
        localStorage.setItem('clase_caballo', JSON.stringify(clase_caballo));
        $state.go('main.detalle_clase_caballo');
    };
});
