angular.module('app').controller('login', function ($scope, $http, $state) {
    $scope.usuario = {};
    $scope.iniciar_sesion = function () {
        var aux = [];
        for (var i in $scope.usuario) {
            if ($scope.usuario.hasOwnProperty(i)) {
                console.log(i);
                aux[i] = $scope.usuario[i];
            }
        }

        $http({
            url: 'api/Welcome/iniciar_sesion',
            method: "POST",
            data: $scope.serialize($scope.usuario),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            try {
                console.log(response.data);
                localStorage.setItem('usuarioConectado', JSON.stringify(response.data));
                if (response.data != 'no_existe') {
                    $state.go('main');
                }else{
                    alert('Datos incorrectos');
                }
            } catch (err) {
                console.log('error');
                $scope.error = true;
            }
        }, function (response) {
            console.log(response);
            $scope.error = true;
        });
    }

    $scope.serialize = function (obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }
});
