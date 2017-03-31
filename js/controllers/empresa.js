angular.module('app').controller('ingreso_empresa', function ($scope, $http, $state) {
    $scope.empresa = {};
    $scope.ingresar_empresa = function () {
        $http({
            url: 'api/Welcome/ingresar_empresa',
            method: "POST",
            data: $scope.serialize($scope.empresa),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_empresa');
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

angular.module('app').controller('detalle_empresa', function ($scope, $http, $state) {
    $scope.empresa = JSON.parse(localStorage.getItem('empresa'));
    $scope.editado = false;
    $scope.editar_empresa = function () {
        $http({
            url: 'api/Welcome/editar_empresa',
            method: "POST",
            data: serialize($scope.empresa),
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
    
    $scope.eliminar = function (empresa) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_empresa',
                method: "POST",
                data: serialize(empresa),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_empresa');
            });
        }
    };

});

angular.module('app').controller('listado_empresa', function ($scope, $http, $state) {
    $scope.empresas = {};
    $scope.listar_empresa = function () {
        $http({
            url: 'api/Welcome/listar_empresa',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.empresas = response.data;
        });

    };
    $scope.listar_empresa();
    $scope.detalle = function (empresa) {
        localStorage.setItem('empresa', JSON.stringify(empresa));
        $state.go('main.detalle_empresa');
    };
});




