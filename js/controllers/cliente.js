angular.module('app').controller('ingreso_cliente', function ($scope, $http, $state) {
    $scope.cliente = {};
    $scope.ingresar_cliente = function () {
        $http({
            url: 'api/Welcome/ingresar_cliente',
            method: "POST",
            data: $scope.serialize($scope.cliente),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_cliente');
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

angular.module('app').controller('detalle_cliente', function ($scope, $http, $state) {
    $scope.cliente = JSON.parse(localStorage.getItem('cliente'));
    $scope.editado = false;
    $scope.editar_cliente = function () {
        $http({
            url: 'api/Welcome/editar_cliente',
            method: "POST",
            data: serialize($scope.cliente),
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

    $scope.eliminar = function (cliente) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_cliente',
                method: "POST",
                data: serialize(cliente),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_cliente');
            });
        }
    };

});

angular.module('app').controller('listado_cliente', function ($scope, $http, $state, NgTableParams) {
    $scope.clientes = {};
    $scope.listar_cliente = function () {
        $http({
            url: 'api/Welcome/listar_cliente',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionCliente).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.clientes = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.clientes
            });
        });

    };
    $scope.listar_cliente();
    $scope.detalle = function (cliente) {
        localStorage.setItem('cliente', JSON.stringify(cliente));
        $state.go('main.detalle_cliente');
    };
});
