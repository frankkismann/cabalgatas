angular.module('app').controller('header', function($scope, $http, $state) {
    $scope.usuarioConectado = JSON.parse(localStorage.getItem('usuarioConectado'));
    if($scope.usuarioConectado==null){
        $state.go('login');
    }
    console.log('header');
    $scope.cerrar_sesion = function() {
        $http({
            url: 'api/Welcome/cerrar_sesion',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function() {
            localStorage.setItem('usuarioConectado', null);
            $state.go('login');
        });
    };
    $scope.collapse_nav = function() {
      $('body').data('supr').toggleSidebar();
    };
});
