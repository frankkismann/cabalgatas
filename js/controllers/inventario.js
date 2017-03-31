angular.module('app').controller('ingreso_inventario', function ($scope, $http, $state) {
    $scope.inventario = {};
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.ingresar_inventario = function () {
        $scope.inventario.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/ingresar_inventario',
            method: "POST",
            data: $scope.serialize($scope.inventario),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_inventario');
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

angular.module('app').controller('detalle_inventario', function ($scope, $http, $state, Upload) {
    $scope.inventario = JSON.parse(localStorage.getItem('inventario'));
    $scope.inventario.cantidad_itemInventario = parseInt($scope.inventario.cantidad_itemInventario);
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    $scope.editado = false;
    $scope.editar_inventario = function () {
        $scope.inventario.usuario_idUsuario = $scope.usuarioConectado.idUsuario;
        $http({
            url: 'api/Welcome/editar_inventario',
            method: "POST",
            data: serialize($scope.inventario),
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

    $scope.eliminar = function (inventario) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_inventario',
                method: "POST",
                data: serialize(inventario),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_inventario');
            });
        }
    };

    $scope.subir_foto_inventario = function() {
        $scope.disabledFoto_inventario = true;
        Upload.upload({
            url: 'api/Welcome/foto_inventario',
            data: {
                foto_inventario: $scope.foto_inventario,
                idInventario: $scope.inventario.idInventario
            }
        }).then(function(response) {
            $scope.disabledFoto_inventario = false;
            if (response.data) {
                if (response.data.charAt(0) == '"') $scope.inventario.fotoInventario = response.data.slice(1, -1);
                else $scope.inventario.fotoInventario = response.data;
                localStorage.setItem('inventario', JSON.stringify($scope.inventario));
            } else $scope.error_foto_inventario = true;
        }, function(response) {
            $scope.disabledFoto_inventario = false;
            $scope.error_foto_inventario = true;
            console.log(response);
        });
    };

});

angular.module('app').controller('listado_inventario', function ($scope, $http, $state, NgTableParams) {
    $scope.inventarios = {};
    $scope.listar_inventario = function () {
        $http({
            url: 'api/Welcome/listar_inventario',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creado_por = response.data[i].nombre1Usuario + ' ' + response.data[i].apellido1Usuario + ' / ' + response.data[i].rutUsuario;
                response.data[i].creacion = moment(response.data[i].creacionInventario).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.inventarios = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.inventarios
            });
        });

    };
    $scope.listar_inventario();
    $scope.detalle = function (inventario) {
        localStorage.setItem('inventario', JSON.stringify(inventario));
        $state.go('main.detalle_inventario');
    };
});
