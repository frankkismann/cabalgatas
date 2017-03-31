angular.module('app').controller('ingreso_usuario', function($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_tipo_usuario = function() {
        $http({
            url: 'api/Welcome/listar_tipo_usuario',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.tipo_usuarios = response.data;
        });

    };
    $scope.listar_tipo_usuario();
    $scope.listar_empresa = function() {
        $http({
            url: 'api/Welcome/listar_empresa',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.empresas = response.data;
        });

    };
    $scope.listar_empresa();
    // End: Complementos
    $scope.usuario = {};
    $scope.ingresar_usuario = function() {
        $http({
            url: 'api/Welcome/ingresar_usuario',
            method: "POST",
            data: $scope.serialize($scope.usuario),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $state.go('main.listado_usuario');
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

angular.module('app').controller('detalle_usuario', function($scope, $http, $state) {
    // Begin: Complementos
    $scope.listar_tipo_usuario = function() {
        $http({
            url: 'api/Welcome/listar_tipo_usuario',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.tipo_usuarios = response.data;
        });

    };
    $scope.listar_tipo_usuario();
    $scope.listar_empresa = function() {
        $http({
            url: 'api/Welcome/listar_empresa',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            $scope.empresas = response.data;
        });

    };
    $scope.listar_empresa();
    // End: Complementos
    $scope.usuario = JSON.parse(localStorage.getItem('usuario'));
    $scope.usuario.valorUsuario = parseInt($scope.usuario.valorUsuario);
    $scope.usuario.pesoUsuario = parseFloat($scope.usuario.pesoUsuario);
    $scope.editado = false;
    $scope.editar_usuario = function() {
        $http({
            url: 'api/Welcome/editar_usuario',
            method: "POST",
            data: serialize($scope.usuario),
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

    $scope.eliminar = function(usuario) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_usuario',
                method: "POST",
                data: serialize(usuario),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                $state.go('main.listado_usuario');
            });
        }
    };

});

angular.module('app').controller('listado_usuario', function($scope, $http, $state, NgTableParams) {
    $scope.usuarios = {};
    $scope.listar_usuario = function() {
        $http({
            url: 'api/Welcome/listar_usuario',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].nombre_completo = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario;
                response.data[i].creacion = moment(response.data[i].creacionUsuario).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.usuarios = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.usuarios
            });
        });

    };
    $scope.listar_usuario();
    $scope.detalle = function(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        $state.go('main.detalle_usuario');
    };
});
