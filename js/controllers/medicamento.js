angular.module('app').controller('ingreso_medicamento', function ($scope, $http, $state) {
    $scope.medicamento = {};
    $scope.ingresar_medicamento = function () {
        $http({
            url: 'api/Welcome/ingresar_medicamento',
            method: "POST",
            data: $scope.serialize($scope.medicamento),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $state.go('main.listado_medicamento');
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

angular.module('app').controller('detalle_medicamento', function ($scope, $http, $state) {
    $scope.medicamento = JSON.parse(localStorage.getItem('medicamento'));
    $scope.editado = false;
    $scope.editar_medicamento = function () {
        $http({
            url: 'api/Welcome/editar_medicamento',
            method: "POST",
            data: serialize($scope.medicamento),
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

    $scope.eliminar = function (medicamento) {
        var r = confirm('Está seguro de eliminar esta entidad?');
        if (r) {
            $http({
                url: 'api/Welcome/eliminar_medicamento',
                method: "POST",
                data: serialize(medicamento),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $state.go('main.listado_medicamento');
            });
        }
    };

});

angular.module('app').controller('listado_medicamento', function ($scope, $http, $state, NgTableParams) {
    $scope.medicamentos = {};
    $scope.listar_medicamento = function () {
        $http({
            url: 'api/Welcome/listar_medicamento',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].creacion = moment(response.data[i].creacionMedicamento).format('DD/MM/YYYY HH:mm:ss');
            }
            $scope.medicamentos = response.data;
            $scope.tableParams = new NgTableParams({}, {
                dataset: $scope.medicamentos
            });
        });

    };
    $scope.listar_medicamento();
    $scope.detalle = function (medicamento) {
        localStorage.setItem('medicamento', JSON.stringify(medicamento));
        $state.go('main.detalle_medicamento');
    };
});
