angular.module('app').controller('blank', function ($state, $scope, $http) {
    $scope.filtro = {
        fecha_inicioDestino: '',
        fecha_finDestino: ''
    };
    
    $scope.filtrar = function () {
        $scope.listar_destino_filtrado();
    };
    
    $scope.listar_caballo_destino = function (destino) {
        $http({
            url: 'api/Welcome/listar_caballo_destino_filtrado',
            method: "POST",
            data: serialize(destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            destino.caballo_destinos = response.data;
        });
    };

    $scope.listar_caballo_destino = function (destino) {
        $http({
            url: 'api/Welcome/listar_caballo_destino_filtrado',
            method: "POST",
            data: serialize(destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            destino.caballo_destinos = response.data;
        });
    };

    $scope.listar_usuario_destino = function (destino) {
        $http({
            url: 'api/Welcome/listar_usuario_destino_filtrado',
            method: "POST",
            data: serialize(destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            destino.usuario_destinos = response.data;
        });
    };

    $scope.listar_cliente_destino = function (destino) {
        $http({
            url: 'api/Welcome/listar_cliente_destino_filtrado',
            method: "POST",
            data: serialize(destino),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            destino.cliente_destinos = response.data;
        });
    };

    $scope.listar_destino = function () {
        $http({
            url: 'api/Welcome/listar_pocos_destinos',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.destinos = response.data;
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].fecha_inicio = moment(response.data[i].fecha_inicioDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].fecha_fin = moment(response.data[i].fecha_finDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].creacion = moment(response.data[i].creacionDestino).format('DD/MM/YYYY HH:mm:ss');
                switch (response.data[i].concretadoDestino) {
                    case '0':
                        response.data[i].concretado = 'En proceso';
                        break;
                    case '1':
                        response.data[i].concretado = 'Concretado';
                        break;
                    case '2':
                        response.data[i].concretado = 'Anulado';
                        break;
                    default:
                        response.data[i].concretado = '';
                }
                $scope.listar_caballo_destino(response.data[i]);
                $scope.listar_usuario_destino(response.data[i]);
                $scope.listar_cliente_destino(response.data[i]);
            }
            $scope.destinos = response.data;
        });
    };
    
    $scope.listar_destino_filtrado = function () {
        $http({
            url: 'api/Welcome/listar_destino_filtrado',
            method: "POST",
            data: serialize($scope.filtro),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            $scope.destinos = response.data;
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].fecha_inicio = moment(response.data[i].fecha_inicioDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].fecha_fin = moment(response.data[i].fecha_finDestino).format('DD/MM/YYYY HH:mm:ss');
                response.data[i].creacion = moment(response.data[i].creacionDestino).format('DD/MM/YYYY HH:mm:ss');
                switch (response.data[i].concretadoDestino) {
                    case '0':
                        response.data[i].concretado = 'En proceso';
                        break;
                    case '1':
                        response.data[i].concretado = 'Concretado';
                        break;
                    case '2':
                        response.data[i].concretado = 'Anulado';
                        break;
                    default:
                        response.data[i].concretado = '';
                }
                $scope.listar_caballo_destino(response.data[i]);
                $scope.listar_usuario_destino(response.data[i]);
                $scope.listar_cliente_destino(response.data[i]);
            }
            $scope.destinos = response.data;
        });
    };
    
    $scope.listar_destino();
    $scope.disponibilizar_caballos = function () {
        $state.go('main.disponibilizar_caballos');
    };
    $scope.ingresar_caballo = function () {
        $state.go('main.ingreso_caballo');
    };
    $scope.listar_caballos = function () {
        $state.go('main.listado_caballo');
    };

    $scope.trabajando = 0;
    $scope.repetido = 0;
    $scope.descansando = 0;
    $scope.enfermo = 0;
    $scope.perdido = 0;
    $scope.listar_caballo = function () {
        $http({
            url: 'api/Welcome/listar_caballo',
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].bloqueadoCaballo == 1) {
                    response.data[i].disponible = 'Trabajando';
                    $scope.trabajando++;
                }
                if (response.data[i].bloqueadoCaballo == 2) {
                    response.data[i].disponible = 'Repetido';
                    $scope.repetido++;
                }
                if (response.data[i].bloqueadoCaballo == 3) {
                    response.data[i].disponible = 'Descansando';
                    $scope.descansando++;
                }
                if (response.data[i].bloqueadoCaballo == 4) {
                    response.data[i].disponible = 'Enfermo';
                    $scope.enfermo++;
                }
                if (response.data[i].bloqueadoCaballo == 5) {
                    response.data[i].disponible = 'Perdido';
                    $scope.perdido++;
                }
            }
            $scope.cargar_grafico();
        });
    };

    $scope.listar_caballo();
    $scope.cargar_grafico = function () {
        $(function () {
            Highcharts.chart('container', {
                title: {
                    text: 'Estado de caballos',
                    x: -20 //center
                },
                subtitle: {
                    text: 'Disponibilidad de caballos',
                    x: -20
                },
                xAxis: {
                    categories: ['Trabajando', 'Repetido', 'Descansando', 'Enfermo', 'Perdido']
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de caballos'
                    },
                    plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                        name: 'Caballos',
                        data: [
                            $scope.trabajando,
                            $scope.repetido,
                            $scope.descansando,
                            $scope.enfermo,
                            $scope.perdido
                        ]
                    }]
            });
        });
        cargar_grafico_2();
    };

    function cargar_grafico_2() {
        Highcharts.chart('container2', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Estado de caballos'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Caballos',
                    colorByPoint: true,
                    data: [{
                            name: 'Trabajando',
                            y: $scope.trabajando
                        }, {
                            name: 'Repetido',
                            y: $scope.repetido,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Descansando',
                            y: $scope.descansando
                        }, {
                            name: 'Enfermo',
                            y: $scope.enfermo
                        }, {
                            name: 'Perdido',
                            y: $scope.perdido
                        }]
                }]
        });
    }

    function serialize(obj, prefix) {
        var str = [];
        for (var p in obj) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
            str.push(typeof v == "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    }

    $scope.MaysPrimera = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

});
