var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngTable', 'ngFileUpload', 'ui.bootstrap', 'angularjs-datetime-picker']);
app.run(function ($rootScope, $state, $timeout) {
    $rootScope.$state = $state;
    $rootScope.$on('$viewContentLoaded', function (event) {
        //$('body').removeData('supr');
        $('body').data('supr').init();
        //$('body').data('supr').centerModal();
        $('body').data('supr').stickyFooter();
        $('body').data('supr').hideRightSidebar();
    });
});
app.config(function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        modules: [{
                name: 'mainModule',
                files: ['js/controllers/wrapper.js', 'js/controllers/header.js', 'js/controllers/sidebar.js', 'js/controllers/right-sidebar.js', 'js/controllers/footer.js', 'js/controllers/blank.js', 'js/moment.js']
            }]
    });
});
app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('core', {
        url: '/',
        resolve: {
            isAuthenticated: ['$state', '$timeout', '$http', function ($state, $timeout, $http) {
                    $http.post('http://estanciacerropaine.com/sistema/api/Welcome/sesion_activa').then(function (response) {
                        if (response.data) {
                            $state.go('main');
                        } else {
                            $state.go('login');
                        }
                    });
                }]
        }
    }).state('login', {
        url: '/login',
        views: {
            'wrapper': {
                controller: 'login',
                templateUrl: 'views/login.html'
            },
            'header': {
                templateUrl: 'views/header-login.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/login.js');
                }]
        }
    }).state('main', {
        url: '/main',
        views: {
            'wrapper': {
                controller: 'wrapper',
                templateUrl: 'views/wrapper.html'
            },
            'header': {
                controller: 'header',
                templateUrl: 'views/header.html'
            },
            'sidebar@main': {
                controller: 'sidebar',
                templateUrl: 'views/sidebar.html'
            },
            // 'right-sidebar@main': {
            //     controller: 'right-sidebar',
            //     templateUrl: 'views/right-sidebar.html'
            // },
            'footer@main': {
                controller: 'footer',
                templateUrl: 'views/footer.html'
            },
            'content@main': {
                controller: 'blank',
                templateUrl: 'views/blank.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('mainModule');
                }]
        }
    }).state('main.test1', {
        url: '/test1',
        views: {
            'content': {
                controller: 'test1',
                templateUrl: 'views/test1.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/test1.js');
                }]
        }
    }).state('main.test2', {
        url: '/test2',
        views: {
            'content': {
                controller: 'test2',
                templateUrl: 'views/test2.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/test2.js');
                }]
        }
    }).state('main.ingreso_empresa', {// Empresas
        url: '/ingreso_empresa',
        views: {
            'content': {
                controller: 'ingreso_empresa',
                templateUrl: 'views/empresa/ingreso_empresa.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/empresa.js');
                }]
        }
    }).state('main.listado_empresa', {
        url: '/listado_empresa',
        views: {
            'content': {
                controller: 'listado_empresa',
                templateUrl: 'views/empresa/listado_empresa.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/empresa.js');
                }]
        }
    }).state('main.detalle_empresa', {
        url: '/detalle_empresa',
        views: {
            'content': {
                controller: 'detalle_empresa',
                templateUrl: 'views/empresa/detalle_empresa.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/empresa.js');
                }]
        }
    }).state('main.ingreso_pesebrera', {// Pesebreras
        url: '/ingreso_pesebrera',
        views: {
            'content': {
                controller: 'ingreso_pesebrera',
                templateUrl: 'views/pesebrera/ingreso_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/pesebrera.js');
                }]
        }
    }).state('main.listado_pesebrera', {
        url: '/listado_pesebrera',
        views: {
            'content': {
                controller: 'listado_pesebrera',
                templateUrl: 'views/pesebrera/listado_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/pesebrera.js');
                }]
        }
    }).state('main.detalle_pesebrera', {
        url: '/detalle_pesebrera',
        views: {
            'content': {
                controller: 'detalle_pesebrera',
                templateUrl: 'views/pesebrera/detalle_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/pesebrera.js');
                }]
        }
    }).state('main.ingreso_tipo_usuario', {// Tipo_usuarios
        url: '/ingreso_tipo_usuario',
        views: {
            'content': {
                controller: 'ingreso_tipo_usuario',
                templateUrl: 'views/tipo_usuario/ingreso_tipo_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_usuario.js');
                }]
        }
    }).state('main.listado_tipo_usuario', {
        url: '/listado_tipo_usuario',
        views: {
            'content': {
                controller: 'listado_tipo_usuario',
                templateUrl: 'views/tipo_usuario/listado_tipo_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_usuario.js');
                }]
        }
    }).state('main.detalle_tipo_usuario', {
        url: '/detalle_tipo_usuario',
        views: {
            'content': {
                controller: 'detalle_tipo_usuario',
                templateUrl: 'views/tipo_usuario/detalle_tipo_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_usuario.js');
                }]
        }
    }).state('main.ingreso_caballo', {// Caballos
        url: '/ingreso_caballo',
        views: {
            'content': {
                controller: 'ingreso_caballo',
                templateUrl: 'views/caballo/ingreso_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo.js');
                }]
        }
    }).state('main.listado_caballo', {
        url: '/listado_caballo',
        views: {
            'content': {
                controller: 'listado_caballo',
                templateUrl: 'views/caballo/listado_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo.js');
                }]
        }
    }).state('main.detalle_caballo', {
        url: '/detalle_caballo',
        views: {
            'content': {
                controller: 'detalle_caballo',
                templateUrl: 'views/caballo/detalle_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo.js');
                }]
        }
    }).state('main.disponibilizar_caballos', {
        url: '/disponibilizar_caballos',
        views: {
            'content': {
                controller: 'disponibilizar_caballos',
                templateUrl: 'views/caballo/disponibilizar_caballos.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo.js');
                }]
        }
    }).state('main.disponibilizar_caballos2', {
        url: '/disponibilizar_caballos2',
        views: {
            'content': {
                controller: 'disponibilizar_caballos2',
                templateUrl: 'views/caballo/disponibilizar_caballos2.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo.js');
                }]
        }
    }).state('main.ingreso_cliente', {// Clientes
        url: '/ingreso_cliente',
        views: {
            'content': {
                controller: 'ingreso_cliente',
                templateUrl: 'views/cliente/ingreso_cliente.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente.js');
                }]
        }
    }).state('main.listado_cliente', {
        url: '/listado_cliente',
        views: {
            'content': {
                controller: 'listado_cliente',
                templateUrl: 'views/cliente/listado_cliente.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente.js');
                }]
        }
    }).state('main.detalle_cliente', {
        url: '/detalle_cliente',
        views: {
            'content': {
                controller: 'detalle_cliente',
                templateUrl: 'views/cliente/detalle_cliente.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente.js');
                }]
        }
    }).state('main.ingreso_caballo_destino', {// Caballo_destinos
        url: '/ingreso_caballo_destino',
        views: {
            'content': {
                controller: 'ingreso_caballo_destino',
                templateUrl: 'views/caballo_destino/ingreso_caballo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_destino.js');
                }]
        }
    }).state('main.listado_caballo_destino', {
        url: '/listado_caballo_destino',
        views: {
            'content': {
                controller: 'listado_caballo_destino',
                templateUrl: 'views/caballo_destino/listado_caballo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_destino.js');
                }]
        }
    }).state('main.detalle_caballo_destino', {
        url: '/detalle_caballo_destino',
        views: {
            'content': {
                controller: 'detalle_caballo_destino',
                templateUrl: 'views/caballo_destino/detalle_caballo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_destino.js');
                }]
        }
    }).state('main.ingreso_caballo_pesebrera', {// Caballo_pesebreras
        url: '/ingreso_caballo_pesebrera',
        views: {
            'content': {
                controller: 'ingreso_caballo_pesebrera',
                templateUrl: 'views/caballo_pesebrera/ingreso_caballo_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_pesebrera.js');
                }]
        }
    }).state('main.listado_caballo_pesebrera', {
        url: '/listado_caballo_pesebrera',
        views: {
            'content': {
                controller: 'listado_caballo_pesebrera',
                templateUrl: 'views/caballo_pesebrera/listado_caballo_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_pesebrera.js');
                }]
        }
    }).state('main.detalle_caballo_pesebrera', {
        url: '/detalle_caballo_pesebrera',
        views: {
            'content': {
                controller: 'detalle_caballo_pesebrera',
                templateUrl: 'views/caballo_pesebrera/detalle_caballo_pesebrera.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/caballo_pesebrera.js');
                }]
        }
    }).state('main.ingreso_clase_caballo', {// Clase_caballos
        url: '/ingreso_clase_caballo',
        views: {
            'content': {
                controller: 'ingreso_clase_caballo',
                templateUrl: 'views/clase_caballo/ingreso_clase_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/clase_caballo.js');
                }]
        }
    }).state('main.listado_clase_caballo', {
        url: '/listado_clase_caballo',
        views: {
            'content': {
                controller: 'listado_clase_caballo',
                templateUrl: 'views/clase_caballo/listado_clase_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/clase_caballo.js');
                }]
        }
    }).state('main.detalle_clase_caballo', {
        url: '/detalle_clase_caballo',
        views: {
            'content': {
                controller: 'detalle_clase_caballo',
                templateUrl: 'views/clase_caballo/detalle_clase_caballo.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/clase_caballo.js');
                }]
        }
    }).state('main.ingreso_cliente_destino', {// Cliente_destinos
        url: '/ingreso_cliente_destino',
        views: {
            'content': {
                controller: 'ingreso_cliente_destino',
                templateUrl: 'views/cliente_destino/ingreso_cliente_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente_destino.js');
                }]
        }
    }).state('main.listado_cliente_destino', {
        url: '/listado_cliente_destino',
        views: {
            'content': {
                controller: 'listado_cliente_destino',
                templateUrl: 'views/cliente_destino/listado_cliente_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente_destino.js');
                }]
        }
    }).state('main.detalle_cliente_destino', {
        url: '/detalle_cliente_destino',
        views: {
            'content': {
                controller: 'detalle_cliente_destino',
                templateUrl: 'views/cliente_destino/detalle_cliente_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/cliente_destino.js');
                }]
        }
    }).state('main.ingreso_destino', {// Destinos
        url: '/ingreso_destino',
        views: {
            'content': {
                controller: 'ingreso_destino',
                templateUrl: 'views/destino/ingreso_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/destino.js');
                }]
        }
    }).state('main.listado_destino', {
        url: '/listado_destino',
        views: {
            'content': {
                controller: 'listado_destino',
                templateUrl: 'views/destino/listado_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/destino.js');
                }]
        }
    }).state('main.detalle_destino', {
        url: '/detalle_destino',
        views: {
            'content': {
                controller: 'detalle_destino',
                templateUrl: 'views/destino/detalle_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/destino.js');
                }]
        }
    }).state('main.ingreso_galeria', {// Galerias
        url: '/ingreso_galeria',
        views: {
            'content': {
                controller: 'ingreso_galeria',
                templateUrl: 'views/galeria/ingreso_galeria.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/galeria.js');
                }]
        }
    }).state('main.listado_galeria', {
        url: '/listado_galeria',
        views: {
            'content': {
                controller: 'listado_galeria',
                templateUrl: 'views/galeria/listado_galeria.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/galeria.js');
                }]
        }
    }).state('main.detalle_galeria', {
        url: '/detalle_galeria',
        views: {
            'content': {
                controller: 'detalle_galeria',
                templateUrl: 'views/galeria/detalle_galeria.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/galeria.js');
                }]
        }
    }).state('main.ingreso_historial_herraje', {// Historial_herrajes
        url: '/ingreso_historial_herraje',
        views: {
            'content': {
                controller: 'ingreso_historial_herraje',
                templateUrl: 'views/historial_herraje/ingreso_historial_herraje.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_herraje.js');
                }]
        }
    }).state('main.listado_historial_herraje', {
        url: '/listado_historial_herraje',
        views: {
            'content': {
                controller: 'listado_historial_herraje',
                templateUrl: 'views/historial_herraje/listado_historial_herraje.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_herraje.js');
                }]
        }
    }).state('main.detalle_historial_herraje', {
        url: '/detalle_historial_herraje',
        views: {
            'content': {
                controller: 'detalle_historial_herraje',
                templateUrl: 'views/historial_herraje/detalle_historial_herraje.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_herraje.js');
                }]
        }
    }).state('main.ingreso_historial_salud', {// Historial_saludes
        url: '/ingreso_historial_salud',
        views: {
            'content': {
                controller: 'ingreso_historial_salud',
                templateUrl: 'views/historial_salud/ingreso_historial_salud.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud.js');
                }]
        }
    }).state('main.listado_historial_salud', {
        url: '/listado_historial_salud',
        views: {
            'content': {
                controller: 'listado_historial_salud',
                templateUrl: 'views/historial_salud/listado_historial_salud.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud.js');
                }]
        }
    }).state('main.detalle_historial_salud', {
        url: '/detalle_historial_salud',
        views: {
            'content': {
                controller: 'detalle_historial_salud',
                templateUrl: 'views/historial_salud/detalle_historial_salud.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud.js');
                }]
        }
    }).state('main.ingreso_historial_salud_medica', {// Historial_salud_medicas
        url: '/ingreso_historial_salud_medica',
        views: {
            'content': {
                controller: 'ingreso_historial_salud_medica',
                templateUrl: 'views/historial_salud_medica/ingreso_historial_salud_medica.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud_medica.js');
                }]
        }
    }).state('main.listado_historial_salud_medica', {
        url: '/listado_historial_salud_medica',
        views: {
            'content': {
                controller: 'listado_historial_salud_medica',
                templateUrl: 'views/historial_salud_medica/listado_historial_salud_medica.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud_medica.js');
                }]
        }
    }).state('main.detalle_historial_salud_medica', {
        url: '/detalle_historial_salud_medica',
        views: {
            'content': {
                controller: 'detalle_historial_salud_medica',
                templateUrl: 'views/historial_salud_medica/detalle_historial_salud_medica.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/historial_salud_medica.js');
                }]
        }
    }).state('main.ingreso_inventario', {// Inventarios
        url: '/ingreso_inventario',
        views: {
            'content': {
                controller: 'ingreso_inventario',
                templateUrl: 'views/inventario/ingreso_inventario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/inventario.js');
                }]
        }
    }).state('main.listado_inventario', {
        url: '/listado_inventario',
        views: {
            'content': {
                controller: 'listado_inventario',
                templateUrl: 'views/inventario/listado_inventario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/inventario.js');
                }]
        }
    }).state('main.detalle_inventario', {
        url: '/detalle_inventario',
        views: {
            'content': {
                controller: 'detalle_inventario',
                templateUrl: 'views/inventario/detalle_inventario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/inventario.js');
                }]
        }
    }).state('main.ingreso_medicamento', {// Medicamentos
        url: '/ingreso_medicamento',
        views: {
            'content': {
                controller: 'ingreso_medicamento',
                templateUrl: 'views/medicamento/ingreso_medicamento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/medicamento.js');
                }]
        }
    }).state('main.listado_medicamento', {
        url: '/listado_medicamento',
        views: {
            'content': {
                controller: 'listado_medicamento',
                templateUrl: 'views/medicamento/listado_medicamento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/medicamento.js');
                }]
        }
    }).state('main.detalle_medicamento', {
        url: '/detalle_medicamento',
        views: {
            'content': {
                controller: 'detalle_medicamento',
                templateUrl: 'views/medicamento/detalle_medicamento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/medicamento.js');
                }]
        }
    }).state('main.ingreso_punto', {// Puntos
        url: '/ingreso_punto',
        views: {
            'content': {
                controller: 'ingreso_punto',
                templateUrl: 'views/punto/ingreso_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/punto.js');
                }]
        }
    }).state('main.listado_punto', {
        url: '/listado_punto',
        views: {
            'content': {
                controller: 'listado_punto',
                templateUrl: 'views/punto/listado_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/punto.js');
                }]
        }
    }).state('main.detalle_punto', {
        url: '/detalle_punto',
        views: {
            'content': {
                controller: 'detalle_punto',
                templateUrl: 'views/punto/detalle_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/punto.js');
                }]
        }
    }).state('main.ingreso_tipo_destino', {// Tipo_destinos
        url: '/ingreso_tipo_destino',
        views: {
            'content': {
                controller: 'ingreso_tipo_destino',
                templateUrl: 'views/tipo_destino/ingreso_tipo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino.js');
                }]
        }
    }).state('main.listado_tipo_destino', {
        url: '/listado_tipo_destino',
        views: {
            'content': {
                controller: 'listado_tipo_destino',
                templateUrl: 'views/tipo_destino/listado_tipo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino.js');
                }]
        }
    }).state('main.detalle_tipo_destino', {
        url: '/detalle_tipo_destino',
        views: {
            'content': {
                controller: 'detalle_tipo_destino',
                templateUrl: 'views/tipo_destino/detalle_tipo_destino.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino.js');
                }]
        }
    }).state('main.ingreso_tipo_destino_punto', {// Tipo_destino_puntos
        url: '/ingreso_tipo_destino_punto',
        views: {
            'content': {
                controller: 'ingreso_tipo_destino_punto',
                templateUrl: 'views/tipo_destino_punto/ingreso_tipo_destino_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino_punto.js');
                }]
        }
    }).state('main.listado_tipo_destino_punto', {
        url: '/listado_tipo_destino_punto',
        views: {
            'content': {
                controller: 'listado_tipo_destino_punto',
                templateUrl: 'views/tipo_destino_punto/listado_tipo_destino_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino_punto.js');
                }]
        }
    }).state('main.detalle_tipo_destino_punto', {
        url: '/detalle_tipo_destino_punto',
        views: {
            'content': {
                controller: 'detalle_tipo_destino_punto',
                templateUrl: 'views/tipo_destino_punto/detalle_tipo_destino_punto.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tipo_destino_punto.js');
                }]
        }
    }).state('main.ingreso_tratamiento', {// Tratamientos
        url: '/ingreso_tratamiento',
        views: {
            'content': {
                controller: 'ingreso_tratamiento',
                templateUrl: 'views/tratamiento/ingreso_tratamiento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tratamiento.js');
                }]
        }
    }).state('main.listado_tratamiento', {
        url: '/listado_tratamiento',
        views: {
            'content': {
                controller: 'listado_tratamiento',
                templateUrl: 'views/tratamiento/listado_tratamiento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tratamiento.js');
                }]
        }
    }).state('main.detalle_tratamiento', {
        url: '/detalle_tratamiento',
        views: {
            'content': {
                controller: 'detalle_tratamiento',
                templateUrl: 'views/tratamiento/detalle_tratamiento.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/tratamiento.js');
                }]
        }
    }).state('main.ingreso_usuario', {// Usuarios
        url: '/ingreso_usuario',
        views: {
            'content': {
                controller: 'ingreso_usuario',
                templateUrl: 'views/usuario/ingreso_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/usuario.js');
                }]
        }
    }).state('main.listado_usuario', {
        url: '/listado_usuario',
        views: {
            'content': {
                controller: 'listado_usuario',
                templateUrl: 'views/usuario/listado_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/usuario.js');
                }]
        }
    }).state('main.detalle_usuario', {
        url: '/detalle_usuario',
        views: {
            'content': {
                controller: 'detalle_usuario',
                templateUrl: 'views/usuario/detalle_usuario.html'
            }
        },
        resolve: {
            loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('js/controllers/usuario.js');
                }]
        }
    });
});
