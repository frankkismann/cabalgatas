angular.module('app').controller('ingreso_tipo_usuario', function($scope, $http, $state) {
    $scope.tipo_usuario = {};
    $scope.ingresar_tipo_usuario = function() {
        $http({
            url: 'api/Welcome/ingresar_tipo_usuario',
            method: "POST",
            data: $scope.serialize($scope.tipo_usuario),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $state.go('main.listado_tipo_usuario');
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

angular.module('app').controller('detalle_tipo_usuario', function($scope, $http, $state) {
    $scope.tipo_usuario = JSON.parse(localStorage.getItem('tipo_usuario'));
    $scope.editado = false;
    $scope.editar_tipo_usuario = function() {
        $http({
            url: 'api/Welcome/editar_tipo_usuario',
            method: "POST",
            data: serialize($scope.tipo_usuario),
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

    $scope.eliminar = function(tipo_usuario) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_tipo_usuario',
                method: "POST",
                data: serialize(tipo_usuario),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                $state.go('main.listado_tipo_usuario');
            });
        }
    };

});

angular.module('app').controller('listado_tipo_usuario', function($scope, $http, $state, NgTableParams) {
    $scope.tipo_usuarios = {};
    $scope.listar_tipo_usuario = function() {
        $http({
            url: 'api/Welcome/listar_tipo_usuario',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionTipo_usuario).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.tipo_usuarios = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.tipo_usuarios
            });

        });

    };
    $scope.listar_tipo_usuario();
    $scope.detalle = function(tipo_usuario) {
        localStorage.setItem('tipo_usuario', JSON.stringify(tipo_usuario));
        $state.go('main.detalle_tipo_usuario');
    };
});
