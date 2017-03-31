angular.module('app').controller('ingreso_pesebrera', function ($scope, $http, $state) {
    $scope.pesebrera = {};
    $scope.ingresar_pesebrera = function () {
        $http({
            url: 'api/Welcome/ingresar_pesebrera',
            method: "POST",
            data: $scope.serialize($scope.pesebrera),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_pesebrera');
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

angular.module('app').controller('detalle_pesebrera', function ($scope, $http, $state) {
    $scope.pesebrera = JSON.parse(localStorage.getItem('pesebrera'));
    $scope.editado = false;
    $scope.editar_pesebrera = function () {
        $http({
            url: 'api/Welcome/editar_pesebrera',
            method: "POST",
            data: serialize($scope.pesebrera),
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
    
    $scope.eliminar = function (pesebrera) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_pesebrera',
                method: "POST",
                data: serialize(pesebrera),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_pesebrera');
            });
        }
    };

});

angular.module('app').controller('listado_pesebrera', function ($scope, $http, $state) {
    $scope.pesebreras = {};
    $scope.listar_pesebrera = function () {
        $http({
            url: 'api/Welcome/listar_pesebrera',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.pesebreras = response.data;
        });

    };
    $scope.listar_pesebrera();
    $scope.detalle = function (pesebrera) {
        localStorage.setItem('pesebrera', JSON.stringify(pesebrera));
        $state.go('main.detalle_pesebrera');
    };
});




