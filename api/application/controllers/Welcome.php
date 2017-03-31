<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

    function __construct() {
        error_reporting(0);
// Call the Model constructor
        parent::__construct();
        //Cargar modelos
        $this->load->model("Modelo");
        //Helpers
        $this->load->helper("url");
        //librerias
        $this->load->library('session');
    }

    public function index() {
        $usuarios = $this->Modelo->seleccionar_todo('usuario');
        echo json_encode($usuarios);
    }

    public function crear_usuario() {
        $data = array(
            'nombre1Usuario' => 'Frank',
            'nombre2Usuario' => 'Amadeus',
            'apellido1Usuario' => 'Kismann',
            'apellido2Usuario' => 'Clarke',
            'rutUsuario' => '16910791-2',
            'correoUsuario' => 'kismannf@gmail.com',
            'passUsuario' => '1234',
            'tel_movilUsuario' => '1234',
            'tel_fijoUsuario' => '1234',
            'tipo_usuario_idTipo_usuario' => 1,
            'empresa_idEmpresa' => 1,
        );
        $usuarios = $this->Modelo->crear('usuario', $data);
        echo 'usuario creado';
    }

    public function seleccionar_usuario() {
        $usuarios = $this->Modelo->seleccionar_todo('usuario');
        echo json_encode($usuarios);
    }

    public function actualizar_usuario() {
        $data = array(
            'nombre2Usuario' => 'Andres'
        );
        $this->Modelo->actualizar('usuario', 1, $data);
        echo 'actualizado';
    }

    public function sesion_activa() {
        echo $this->session->userdata('idUsuario');
    }

    public function cerrar_sesion() {
        $this->session->unset_userdata('idUsuario');
        echo 0;
    }

    public function iniciar_sesion() {
        $rut = $this->input->post('rutUsuario');
        $pass = $this->input->post('passUsuario');
        $result = $this->Modelo->login($rut, $pass);
        if (count($result)) {
            $this->session->set_userdata('idUsuario', $result[0]['idUsuario']);
            echo json_encode($result[0]);
        } else {
            echo 'no_existe';
        }
    }

    // Begin: empresa
    public function ingresar_empresa() {
        $data = array(
            'rutEmpresa' => $this->input->post('rutEmpresa'),
            'nombreEmpresa' => $this->input->post('nombreEmpresa'),
            'razon_socialEmpresa' => $this->input->post('razon_socialEmpresa'),
            'direccionEmpresa' => $this->input->post('direccionEmpresa'),
            'correoEmpresa' => $this->input->post('correoEmpresa')
        );
        $this->Modelo->crear('empresa', $data);
        echo 'Empresa creada';
    }

    public function listar_empresa() {
        $empresas = $this->Modelo->seleccionar_todo('empresa');
        echo json_encode($empresas);
    }

    public function editar_empresa() {
        $data = array(
            'rutEmpresa' => $this->input->post('rutEmpresa'),
            'nombreEmpresa' => $this->input->post('nombreEmpresa'),
            'razon_socialEmpresa' => $this->input->post('razon_socialEmpresa'),
            'direccionEmpresa' => $this->input->post('direccionEmpresa'),
            'correoEmpresa' => $this->input->post('correoEmpresa')
        );
        $this->Modelo->actualizar('empresa', $this->input->post('idEmpresa'), $data);
        echo 'actualizado';
    }

    public function eliminar_empresa() {
        $data = array(
            'idEmpresa' => $this->input->post('idEmpresa')
        );
        $this->Modelo->eliminar('empresa', $data);
        echo 'eliminado';
    }

    // End: empresa
    // Begin: pesebrera
    public function ingresar_pesebrera() {
        $data = array(
            'descripcionPesebrera' => $this->input->post('descripcionPesebrera'),
            'latitudPesebrera' => $this->input->post('latitudPesebrera'),
            'longitudPesebrera' => $this->input->post('longitudPesebrera'),
            'nombrePesebrera' => $this->input->post('nombrePesebrera')
        );
        $this->Modelo->crear('pesebrera', $data);
        echo 'Pesebrera creada';
    }

    public function listar_pesebrera() {
        $pesebreras = $this->Modelo->seleccionar_todo('pesebrera');
        echo json_encode($pesebreras);
    }

    public function editar_pesebrera() {
        $data = array(
            'descripcionPesebrera' => $this->input->post('descripcionPesebrera'),
            'latitudPesebrera' => $this->input->post('latitudPesebrera'),
            'longitudPesebrera' => $this->input->post('longitudPesebrera'),
            'nombrePesebrera' => $this->input->post('nombrePesebrera')
        );
        $this->Modelo->actualizar('pesebrera', $this->input->post('idPesebrera'), $data);
        echo 'actualizado';
    }

    public function eliminar_pesebrera() {
        $data = array(
            'idPesebrera' => $this->input->post('idPesebrera')
        );
        $this->Modelo->eliminar('pesebrera', $data);
        echo 'eliminado';
    }

    // End: pesebrera
    // Begin: administrador
    public function ingresar_administrador() {
        $data = array(
            'nombreAdministrador' => $this->input->post('nombreAdministrador'),
            'passAdministrador' => $this->input->post('passAdministrador'),
            'rutAdministrador' => $this->input->post('rutAdministrador'),
            'correoAdministrador' => $this->input->post('correoAdministrador')
        );
        $this->Modelo->crear('administrador', $data);
        echo 'Administrador creada';
    }

    public function listar_administrador() {
        $administradores = $this->Modelo->seleccionar_todo('administrador');
        echo json_encode($administradores);
    }

    public function editar_administrador() {
        $data = array(
            'nombreAdministrador' => $this->input->post('nombreAdministrador'),
            'passAdministrador' => $this->input->post('passAdministrador'),
            'rutAdministrador' => $this->input->post('rutAdministrador'),
            'correoAdministrador' => $this->input->post('correoAdministrador')
        );
        $this->Modelo->actualizar('administrador', $this->input->post('idAdministrador'), $data);
        echo 'actualizado';
    }

    public function eliminar_administrador() {
        $data = array(
            'idAdministrador' => $this->input->post('idAdministrador')
        );
        $this->Modelo->eliminar('administrador', $data);
        echo 'eliminado';
    }

    // End: administrador
    // Begin: caballo
    public function ingresar_caballo() {
        $data = array(
            'valorCaballo' => $this->input->post('valorCaballo'),
            'nombreCaballo' => $this->input->post('nombreCaballo'),
            'pesoCaballo' => $this->input->post('pesoCaballo'),
            'alzadaCaballo' => $this->input->post('alzadaCaballo'),
            'marcaCaballo' => $this->input->post('marcaCaballo'),
            'descripcionCaballo' => $this->input->post('descripcionCaballo'),
            'comprado_aCaballo' => $this->input->post('comprado_aCaballo'),
            'bloqueadoCaballo' => $this->input->post('bloqueadoCaballo'),
            'clase_caballo_idClase_caballo' => $this->input->post('clase_caballo_idClase_caballo')
        );
        $this->Modelo->crear('caballo', $data);
        echo 'Caballo creada';
    }

    public function listar_caballo() {
        $query = 'SELECT * FROM caballo ';
        $query .= 'INNER JOIN clase_caballo ON clase_caballo.idClase_caballo = caballo.clase_caballo_idClase_caballo ';
        $query .= 'ORDER BY caballo.idCaballo DESC ';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballos);
    }
    
    public function listar_caballo_orden_alfabetico() {
        $query = 'SELECT * FROM caballo ';
        $query .= 'INNER JOIN clase_caballo ON clase_caballo.idClase_caballo = caballo.clase_caballo_idClase_caballo ';
        $query .= 'ORDER BY caballo.nombreCaballo ASC ';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballos);
    }

    public function listar_ultimo_caballo() {
        $query = 'SELECT * FROM caballo ';
        $query .= 'INNER JOIN clase_caballo ON clase_caballo.idClase_caballo = caballo.clase_caballo_idClase_caballo ';
        $query .= 'ORDER BY caballo.idCaballo DESC LIMIT 1 ';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballos);
    }

    public function listar_caballo_disponible() {
        $query = 'SELECT * FROM caballo ';
        $query .= 'INNER JOIN clase_caballo ON clase_caballo.idClase_caballo = caballo.clase_caballo_idClase_caballo ';
        $query .= 'WHERE caballo.bloqueadoCaballo = 1 OR caballo.bloqueadoCaballo = 2 ';
        $query .= 'ORDER BY caballo.idCaballo DESC ';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballos);
    }

    public function comprueba_horario_caballo() {
        $query = 'SELECT * FROM caballo_destino ';
        $query .= 'INNER JOIN destino ON destino.idDestino = caballo_destino.destino_idDestino ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = caballo_destino.caballo_idCaballo ';
        $query .= 'WHERE caballo_destino.caballo_idCaballo = ' . $this->input->post('idCaballo') . ' ';
        $query .= 'AND (fecha_finDestino >= \'' . $this->input->post('fecha_inicioDestino') . '\' AND fecha_inicioDestino <= \'' . $this->input->post('fecha_finDestino') . '\') ';
        $query .= 'ORDER BY caballo_destino.idCaballo_destino DESC LIMIT 1';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo count($caballos);
    }

    public function listar_caballo_no_trabajan() {
        $query = 'SELECT * FROM caballo ';
        $query .= 'INNER JOIN clase_caballo ON clase_caballo.idClase_caballo = caballo.clase_caballo_idClase_caballo ';
        $query .= 'WHERE caballo.bloqueadoCaballo = 3 OR caballo.bloqueadoCaballo = 4 OR caballo.bloqueadoCaballo = 5 ';
        $query .= 'ORDER BY caballo.idCaballo DESC ';
        $caballos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballos);
    }

    public function editar_caballo() {
        $data = array(
            'valorCaballo' => $this->input->post('valorCaballo'),
            'nombreCaballo' => $this->input->post('nombreCaballo'),
            'pesoCaballo' => $this->input->post('pesoCaballo'),
            'alzadaCaballo' => $this->input->post('alzadaCaballo'),
            'marcaCaballo' => $this->input->post('marcaCaballo'),
            'descripcionCaballo' => $this->input->post('descripcionCaballo'),
            'comprado_aCaballo' => $this->input->post('comprado_aCaballo'),
            'bloqueadoCaballo' => $this->input->post('bloqueadoCaballo'),
            'clase_caballo_idClase_caballo' => $this->input->post('clase_caballo_idClase_caballo')
        );
        $this->Modelo->actualizar('caballo', $this->input->post('idCaballo'), $data);
        echo 'actualizado';
    }

    public function eliminar_caballo() {
        // Eliminamos dependencias
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('caballo_destino', $data);
        
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('caballo_pesebrera', $data);
        
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('historial_herraje', $data);
        
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('historial_salud', $data);
        
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('historial_salud', $data);
        
        $data = array(
            'caballo_idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('tratamiento', $data);
        
        // Finalmente eliminamos al caballo
        $data = array(
            'idCaballo' => $this->input->post('idCaballo')
        );
        $this->Modelo->eliminar('caballo', $data);
        echo 'eliminado';
    }

    // End: caballo
    // Begin: clase_caballo
    public function ingresar_clase_caballo() {
        $data = array(
            'nombreClase_caballo' => $this->input->post('nombreClase_caballo')
        );
        $this->Modelo->crear('clase_caballo', $data);
        echo 'Clase_caballo creada';
    }

    public function listar_clase_caballo() {
        $clase_caballos = $this->Modelo->seleccionar_todo('clase_caballo');
        echo json_encode($clase_caballos);
    }

    public function editar_clase_caballo() {
        $data = array(
            'nombreClase_caballo' => $this->input->post('nombreClase_caballo')
        );
        $this->Modelo->actualizar('clase_caballo', $this->input->post('idClase_caballo'), $data);
        echo 'actualizado';
    }

    public function eliminar_clase_caballo() {
        $data = array(
            'idClase_caballo' => $this->input->post('idClase_caballo')
        );
        $this->Modelo->eliminar('clase_caballo', $data);
        echo 'eliminado';
    }

    // End: clase_caballo
    // Begin: caballo_destino
    public function ingresar_caballo_destino() {
        $data = array(
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->crear('caballo_destino', $data);
        echo 'Caballo_destino creado';
    }

    public function listar_caballo_destino() {
        $query = 'SELECT * FROM caballo_destino ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = destino.caballo_idCaballo ';
        $query .= 'INNER JOIN destino ON destino.idDestino = destino.destino_idDestino ';
        $query .= 'ORDER BY caballo_destino.idCaballo_destino DESC ';
        $caballo_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_destinos);
    }

    public function listar_caballo_destino_filtrado() {
        $query = 'SELECT * FROM caballo_destino ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = caballo_destino.caballo_idCaballo ';
        $query .= 'INNER JOIN destino ON destino.idDestino = caballo_destino.destino_idDestino ';
        $query .= 'WHERE destino_idDestino = ' . $this->input->post('idDestino') . ' ';
        $caballo_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_destinos);
    }

    public function editar_caballo_destino() {
        $data = array(
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->actualizar('caballo_destino', $this->input->post('idCaballo_destino'), $data);
        echo 'actualizado';
    }

    public function eliminar_caballo_destino() {
        $data = array(
            'idCaballo_destino' => $this->input->post('idCaballo_destino')
        );
        $this->Modelo->eliminar('caballo_destino', $data);

        echo 'eliminado';
    }

    // End: caballo_destino
    // Begin: usuario_destino
    public function ingresar_usuario_destino() {
        $data = array(
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->crear('usuario_destino', $data);
        echo 'Usuario_destino creado';
    }

    public function listar_usuario_destino() {
        $query = 'SELECT * FROM usuario_destino ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = destino.usuario_idUsuario ';
        $query .= 'INNER JOIN destino ON destino.idDestino = destino.destino_idDestino ';
        $query .= 'ORDER BY usuario_destino.idUsuario_destino DESC ';
        $usuario_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($usuario_destinos);
    }

    public function listar_usuario_destino_filtrado() {
        $query = 'SELECT * FROM usuario_destino ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = usuario_destino.usuario_idUsuario ';
        $query .= 'INNER JOIN destino ON destino.idDestino = usuario_destino.destino_idDestino ';
        $query .= 'WHERE destino_idDestino = ' . $this->input->post('idDestino') . ' ';
        $usuario_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($usuario_destinos);
    }

    public function editar_usuario_destino() {
        $data = array(
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->actualizar('usuario_destino', $this->input->post('idUsuario_destino'), $data);
        echo 'actualizado';
    }

    public function eliminar_usuario_destino() {
        $data = array(
            'idUsuario_destino' => $this->input->post('idUsuario_destino')
        );
        $this->Modelo->eliminar('usuario_destino', $data);
        echo 'eliminado';
    }

    // End: usuario_destino
    // Begin: caballo_pesebrera
    public function ingresar_caballo_pesebrera() {
        $data = array(
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'pesebrera_idPesebrera' => $this->input->post('pesebrera_idPesebrera')
        );
        $this->Modelo->crear('caballo_pesebrera', $data);
        echo 'Caballo_pesebrera creado';
    }

    public function listar_caballo_pesebrera() {
        $query = 'SELECT * FROM caballo_pesebrera ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = pesebrera.caballo_idCaballo ';
        $query .= 'INNER JOIN pesebrera ON pesebrera.idPesebrera = pesebrera.pesebrera_idPesebrera ';
        $query .= 'ORDER BY caballo_pesebrera.idCaballo_pesebrera DESC ';
        $caballo_pesebreras = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_pesebreras);
    }

    public function listar_caballo_pesebrera_filtrado() {
        $query = 'SELECT * FROM caballo_pesebrera ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = caballo_pesebrera.caballo_idCaballo ';
        $query .= 'INNER JOIN pesebrera ON pesebrera.idPesebrera = caballo_pesebrera.pesebrera_idPesebrera ';
        $query .= 'WHERE caballo_idCaballo = ' . $this->input->post('idCaballo') . ' ';
        $caballo_pesebreras = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_pesebreras);
    }

    public function editar_caballo_pesebrera() {
        $data = array(
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'pesebrera_idPesebrera' => $this->input->post('pesebrera_idPesebrera')
        );
        $this->Modelo->actualizar('caballo_pesebrera', $this->input->post('idCaballo_pesebrera'), $data);
        echo 'actualizado';
    }

    public function eliminar_caballo_pesebrera() {
        $data = array(
            'idCaballo_pesebrera' => $this->input->post('idCaballo_pesebrera')
        );
        $this->Modelo->eliminar('caballo_pesebrera', $data);
        echo 'eliminado';
    }

    // End: caballo_pesebrera
    // Begin: cliente_destino
    public function ingresar_cliente_destino() {
        $data = array(
            'cliente_idCliente' => $this->input->post('cliente_idCliente'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->crear('cliente_destino', $data);
        echo 'Cliente_destino creado';
    }

    public function listar_cliente_destino() {
        $query = 'SELECT * FROM cliente_destino ';
        $query .= 'INNER JOIN cliente ON cliente.idCliente = destino.cliente_idCliente ';
        $query .= 'INNER JOIN destino ON destino.idDestino = destino.destino_idDestino ';
        $query .= 'ORDER BY cliente_destino.idCliente_destino DESC ';
        $cliente_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($cliente_destinos);
    }

    public function listar_cliente_destino_filtrado() {
        $query = 'SELECT * FROM cliente_destino ';
        $query .= 'INNER JOIN cliente ON cliente.idCliente = cliente_destino.cliente_idCliente ';
        $query .= 'INNER JOIN destino ON destino.idDestino = cliente_destino.destino_idDestino ';
        $query .= 'WHERE destino_idDestino = ' . $this->input->post('idDestino') . ' ';
        $cliente_destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($cliente_destinos);
    }

    public function editar_cliente_destino() {
        $data = array(
            'cliente_idCliente' => $this->input->post('cliente_idCliente'),
            'destino_idDestino' => $this->input->post('destino_idDestino')
        );
        $this->Modelo->actualizar('cliente_destino', $this->input->post('idCliente_destino'), $data);
        echo 'actualizado';
    }

    public function eliminar_cliente_destino() {
        $data = array(
            'idCliente_destino' => $this->input->post('idCliente_destino')
        );
        $this->Modelo->eliminar('cliente_destino', $data);
        echo 'eliminado';
    }

    // End: cliente_destino
    // Begin: cliente
    public function ingresar_cliente() {
        $data = array(
            'nombreCliente' => $this->input->post('nombreCliente'),
            'rutCliente' => $this->input->post('rutCliente'),
            'tel_movilCliente' => $this->input->post('tel_movilCliente'),
            'correoCliente' => $this->input->post('correoCliente')
        );
        $this->Modelo->crear('cliente', $data);
        echo 'Cliente creada';
    }

    public function listar_cliente() {
        $clientes = $this->Modelo->seleccionar_todo('cliente');
        echo json_encode($clientes);
    }

    public function editar_cliente() {
        $data = array(
            'nombreCliente' => $this->input->post('nombreCliente'),
            'rutCliente' => $this->input->post('rutCliente'),
            'tel_movilCliente' => $this->input->post('tel_movilCliente'),
            'correoCliente' => $this->input->post('correoCliente')
        );
        $this->Modelo->actualizar('cliente', $this->input->post('idCliente'), $data);
        echo 'actualizado';
    }

    public function eliminar_cliente() {
        $data = array(
            'idCliente' => $this->input->post('idCliente')
        );
        $this->Modelo->eliminar('cliente', $data);
        echo 'eliminado';
    }

    // End: cliente
    // Begin: destino
    public function ingresar_destino() {
        $data = array(
            'pilcheroDestino' => $this->input->post('pilcheroDestino'),
            'cabalgataDestino' => $this->input->post('cabalgataDestino'),
            'taxiDestino' => $this->input->post('taxiDestino'),
            'trabajoDestino' => $this->input->post('trabajoDestino'),
            'fecha_inicioDestino' => $this->input->post('fecha_inicioDestino'),
            'fecha_finDestino' => $this->input->post('fecha_finDestino'),
            'tipo_destino_idTipo_destino' => $this->input->post('tipo_destino_idTipo_destino')
        );
        $this->Modelo->crear('destino', $data);
        echo 'Destino creada';
    }

    public function listar_destino() {
        $query = 'SELECT * FROM destino ';
        $query .= 'INNER JOIN tipo_destino ON tipo_destino.idTipo_destino = destino.tipo_destino_idTipo_destino ';
        $query .= 'ORDER BY destino.idDestino DESC ';
        $destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($destinos);
    }

    public function listar_pocos_destinos() {
        $query = 'SELECT * FROM destino ';
        $query .= 'INNER JOIN tipo_destino ON tipo_destino.idTipo_destino = destino.tipo_destino_idTipo_destino ';
        $query .= 'ORDER BY destino.idDestino DESC LIMIT 10';
        $destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($destinos);
    }

    public function listar_destino_filtrado() {
        $query = 'SELECT * FROM destino ';
        $query .= 'INNER JOIN tipo_destino ON tipo_destino.idTipo_destino = destino.tipo_destino_idTipo_destino ';
        $query .= 'WHERE fecha_finDestino <= \'' . $this->input->post('fecha_finDestino') . '\' ';
        $query .= 'AND fecha_inicioDestino >= \'' . $this->input->post('fecha_inicioDestino') . '\' ';
        $query .= 'ORDER BY destino.idDestino DESC ';
        $destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($destinos);
    }

    public function listar_ultimo_destino() {
        $query = 'SELECT * FROM destino ';
        $query .= 'ORDER BY destino.idDestino DESC LIMIT 1';
        $destinos = $this->Modelo->seleccionar_libre($query);
        echo json_encode($destinos);
    }

    public function editar_destino() {
        $data = array(
            'pilcheroDestino' => $this->input->post('pilcheroDestino'),
            'cabalgataDestino' => $this->input->post('cabalgataDestino'),
            'taxiDestino' => $this->input->post('taxiDestino'),
            'trabajoDestino' => $this->input->post('trabajoDestino'),
            'fecha_inicioDestino' => $this->input->post('fecha_inicioDestino'),
            'fecha_finDestino' => $this->input->post('fecha_finDestino'),
            'concretadoDestino' => $this->input->post('concretadoDestino'),
            'tipo_destino_idTipo_destino' => $this->input->post('tipo_destino_idTipo_destino')
        );
        $this->Modelo->actualizar('destino', $this->input->post('idDestino'), $data);
        echo 'actualizado';
    }

    public function eliminar_destino() {
        $data = array(
            'idDestino' => $this->input->post('idDestino')
        );
        $this->Modelo->eliminar('destino', $data);
        echo 'eliminado';
    }

    // End: destino
    // Begin: control
    public function ingresar_control() {
        $data = array(
            'descripcionControl' => $this->input->post('descripcionControl'),
            'proximo_controlControl' => $this->input->post('proximo_controlControl'),
            'tratamiento_idTratamiento' => $this->input->post('tratamiento_idTratamiento')
        );
        $this->Modelo->crear('control', $data);
        echo 'Control creada';
    }

    public function listar_control() {
        $query = 'SELECT * FROM control ';
        $query .= '';
        $query .= 'WHERE control.tratamiento_idTratamiento = ' . $this->input->post('tratamiento_idTratamiento') . ' ';
        $query .= 'ORDER BY control.idControl DESC ';
        $controles = $this->Modelo->seleccionar_libre($query);
        echo json_encode($controles);
    }

    public function editar_control() {
        $data = array(
            'descripcionControl' => $this->input->post('descripcionControl'),
            'proximo_controlControl' => $this->input->post('proximo_controlControl'),
            'tratamiento_idTratamiento' => $this->input->post('tratamiento_idTratamiento')
        );
        $this->Modelo->actualizar('control', $this->input->post('idControl'), $data);
        echo 'actualizado';
    }

    public function eliminar_control() {
        $data = array(
            'idControl' => $this->input->post('idControl')
        );
        $this->Modelo->eliminar('control', $data);
        echo 'eliminado';
    }

    // End: control 
    // Begin: galeria
    public function ingresar_galeria() {
        $data = array(
            'fotoGaleria' => $this->input->post('fotoGaleria'),
            'descripcionGaleria' => $this->input->post('descripcionGaleria')
        );
        $this->Modelo->crear('galeria', $data);
        echo 'Galeria creada';
    }

    public function listar_galeria() {
        $galerias = $this->Modelo->seleccionar_todo('galeria');
        echo json_encode($galerias);
    }

    public function editar_galeria() {
        $data = array(
            'fotoGaleria' => $this->input->post('fotoGaleria'),
            'descripcionGaleria' => $this->input->post('descripcionGaleria')
        );
        $this->Modelo->actualizar('galeria', $this->input->post('idGaleria'), $data);
        echo 'actualizado';
    }

    public function eliminar_galeria() {
        $data = array(
            'idGaleria' => $this->input->post('idGaleria')
        );
        $this->Modelo->eliminar('galeria', $data);
        echo 'eliminado';
    }

    // End: galeria
    // Begin: historial_herraje
    public function ingresar_historial_herraje() {
        $data = array(
            'descripcionHistorial_herraje' => $this->input->post('descripcionHistorial_herraje'),
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->crear('historial_herraje', $data);
        echo 'Historial_herraje creada';
    }

    public function listar_historial_herraje() {
        $query = 'SELECT * FROM historial_herraje ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = historial_herraje.caballo_idCaballo ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = historial_herraje.usuario_idUsuario ';
        $query .= 'ORDER BY historial_herraje.idHistorial_herraje DESC ';
        $historial_herrajes = $this->Modelo->seleccionar_libre($query);
        echo json_encode($historial_herrajes);
    }

    public function editar_historial_herraje() {
        $data = array(
            'descripcionHistorial_herraje' => $this->input->post('descripcionHistorial_herraje'),
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->actualizar('historial_herraje', $this->input->post('idHistorial_herraje'), $data);
        echo 'actualizado';
    }

    public function eliminar_historial_herraje() {
        $data = array(
            'idHistorial_herraje' => $this->input->post('idHistorial_herraje')
        );
        $this->Modelo->eliminar('historial_herraje', $data);
        echo 'eliminado';
    }

    // End: historial_herraje
    // Begin: historial_salud
    public function ingresar_historial_salud() {
        $data = array(
            'descripcionHistorial_salud' => $this->input->post('descripcionHistorial_salud'),
            'fecha_proximaHistorial_salud' => $this->input->post('fecha_proximaHistorial_salud'),
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'tratamiento_idTratamiento' => $this->input->post('tratamiento_idTratamiento'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->crear('historial_salud', $data);
        echo 'Historial_salud creada';
    }

    public function listar_historial_salud() {
        $query = 'SELECT * FROM historial_salud ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = historial_salud.caballo_idCaballo ';
        $query .= 'INNER JOIN tratamiento ON tratamiento.idTratamiento = historial_salud.tratamiento_idTratamiento ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = historial_salud.usuario_idUsuario ';
        $query .= 'ORDER BY historial_salud.idHistorial_salud DESC ';
        $historial_saludes = $this->Modelo->seleccionar_libre($query);
        echo json_encode($historial_saludes);
    }

    public function editar_historial_salud() {
        $time = strtotime($this->input->post('fecha_proximaHistorial_salud'));
        if ($time != false) {
            $new_date = date('Y-m-d', $time);
        } else {
            exit();
        }
        $data = array(
            'descripcionHistorial_salud' => $this->input->post('descripcionHistorial_salud'),
            'fecha_proximaHistorial_salud' => $new_date,
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'tratamiento_idTratamiento' => $this->input->post('tratamiento_idTratamiento'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->actualizar('historial_salud', $this->input->post('idHistorial_salud'), $data);
        echo 'actualizado';
    }

    public function eliminar_historial_salud() {
        $data = array(
            'idHistorial_salud' => $this->input->post('idHistorial_salud')
        );
        $this->Modelo->eliminar('historial_salud', $data);
        echo 'eliminado';
    }

    // End: historial_salud
    // Begin: inventario
    public function ingresar_inventario() {
        $data = array(
            'itemInventario' => $this->input->post('itemInventario'),
            'cantidad_itemInventario' => $this->input->post('cantidad_itemInventario'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->crear('inventario', $data);
        echo 'Inventario creada';
    }

    public function listar_inventario() {
        $query = 'SELECT * FROM inventario ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = inventario.usuario_idUsuario ';
        $query .= 'ORDER BY inventario.idInventario DESC ';
        $inventarios = $this->Modelo->seleccionar_libre($query);
        echo json_encode($inventarios);
    }

    public function editar_inventario() {
        $data = array(
            'itemInventario' => $this->input->post('itemInventario'),
            'cantidad_itemInventario' => $this->input->post('cantidad_itemInventario'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->actualizar('inventario', $this->input->post('idInventario'), $data);
        echo 'actualizado';
    }

    public function eliminar_inventario() {
        $data = array(
            'idInventario' => $this->input->post('idInventario')
        );
        $this->Modelo->eliminar('inventario', $data);
        echo 'eliminado';
    }

    // End: inventario
    // Begin: medicamento
    public function ingresar_medicamento() {
        $data = array(
            'nombreMedicamento' => $this->input->post('nombreMedicamento'),
            'descripcionMedicamento' => $this->input->post('descripcionMedicamento')
        );
        $this->Modelo->crear('medicamento', $data);
        echo 'Medicamento creada';
    }

    public function listar_medicamento() {
        $medicamentos = $this->Modelo->seleccionar_todo('medicamento');
        echo json_encode($medicamentos);
    }

    public function editar_medicamento() {
        $data = array(
            'nombreMedicamento' => $this->input->post('nombreMedicamento'),
            'descripcionMedicamento' => $this->input->post('descripcionMedicamento')
        );
        $this->Modelo->actualizar('medicamento', $this->input->post('idMedicamento'), $data);
        echo 'actualizado';
    }

    public function eliminar_medicamento() {
        $data = array(
            'idMedicamento' => $this->input->post('idMedicamento')
        );
        $this->Modelo->eliminar('medicamento', $data);
        echo 'eliminado';
    }

    // End: medicamento
    // Begin: punto
    public function ingresar_punto() {
        $data = array(
            'refPunto' => $this->input->post('refPunto'),
            'latitudPunto' => $this->input->post('latitudPunto'),
            'longitudPunto' => $this->input->post('longitudPunto')
        );
        $this->Modelo->crear('punto', $data);
        echo 'Punto creada';
    }

    public function listar_punto() {
        $puntos = $this->Modelo->seleccionar_todo('punto');
        echo json_encode($puntos);
    }

    public function editar_punto() {
        $data = array(
            'refPunto' => $this->input->post('refPunto'),
            'latitudPunto' => $this->input->post('latitudPunto'),
            'longitudPunto' => $this->input->post('longitudPunto')
        );
        $this->Modelo->actualizar('punto', $this->input->post('idPunto'), $data);
        echo 'actualizado';
    }

    public function eliminar_punto() {
        $data = array(
            'idPunto' => $this->input->post('idPunto')
        );
        $this->Modelo->eliminar('punto', $data);
        echo 'eliminado';
    }

    // End: punto
    // Begin: tipo_destino
    public function ingresar_tipo_destino() {
        $data = array(
            'distanciaTipo_destino' => $this->input->post('distanciaTipo_destino'),
            'tiempo_horasTipo_destino' => $this->input->post('tiempo_horasTipo_destino'),
            'dificultadTipo_destino' => $this->input->post('dificultadTipo_destino'),
            'nombreTipo_destino' => $this->input->post('nombreTipo_destino')
        );
        $this->Modelo->crear('tipo_destino', $data);
        echo 'Tipo_destino creada';
    }

    public function listar_tipo_destino() {
        $tipo_destinos = $this->Modelo->seleccionar_todo('tipo_destino');
        echo json_encode($tipo_destinos);
    }

    public function editar_tipo_destino() {
        $data = array(
            'distanciaTipo_destino' => $this->input->post('distanciaTipo_destino'),
            'tiempo_horasTipo_destino' => $this->input->post('tiempo_horasTipo_destino'),
            'dificultadTipo_destino' => $this->input->post('dificultadTipo_destino'),
            'nombreTipo_destino' => $this->input->post('nombreTipo_destino')
        );
        $this->Modelo->actualizar('tipo_destino', $this->input->post('idTipo_destino'), $data);
        echo 'actualizado';
    }

    public function eliminar_tipo_destino() {
        $data = array(
            'idTipo_destino' => $this->input->post('idTipo_destino')
        );
        $this->Modelo->eliminar('tipo_destino', $data);
        echo 'eliminado';
    }

    // End: tipo_destino
    // Begin: tipo_usuario
    public function ingresar_tipo_usuario() {
        $data = array(
            'nombreTipo_usuario' => $this->input->post('nombreTipo_usuario')
        );
        $this->Modelo->crear('tipo_usuario', $data);
        echo 'Tipo_usuario creada';
    }

    public function listar_tipo_usuario() {
        $tipo_usuarios = $this->Modelo->seleccionar_todo('tipo_usuario');
        echo json_encode($tipo_usuarios);
    }

    public function editar_tipo_usuario() {
        $data = array(
            'nombreTipo_usuario' => $this->input->post('nombreTipo_usuario')
        );
        $this->Modelo->actualizar('tipo_usuario', $this->input->post('idTipo_usuario'), $data);
        echo 'actualizado';
    }

    public function eliminar_tipo_usuario() {
        $data = array(
            'idTipo_usuario' => $this->input->post('idTipo_usuario')
        );
        $this->Modelo->eliminar('tipo_usuario', $data);
        echo 'eliminado';
    }

    // End: tipo_usuario
    // Begin: tratamiento
    public function ingresar_tratamiento() {
        $data = array(
            'nombreTratamiento' => $this->input->post('nombreTratamiento'),
            'descripcionTratamiento' => $this->input->post('descripcionTratamiento'),
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo'),
            'usuario_idUsuario' => $this->input->post('usuario_idUsuario')
        );
        $this->Modelo->crear('tratamiento', $data);
        echo 'Tratamiento creada';
    }

    public function listar_tratamiento() {
        $tratamientos = $this->Modelo->seleccionar_todo('tratamiento');
        echo json_encode($tratamientos);
    }

    public function detalle_tratamiento() {
        $query = 'SELECT * FROM tratamiento ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = tratamiento.caballo_idCaballo ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = tratamiento.usuario_idUsuario ';
        $query .= 'WHERE tratamiento.idTratamiento = ' . $this->input->post('idTratamiento') . ' ';
        $caballo_pesebreras = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_pesebreras);
    }

    public function listar_tratamiento_filtrado() {
        $query = 'SELECT * FROM tratamiento ';
        $query .= 'INNER JOIN caballo ON caballo.idCaballo = tratamiento.caballo_idCaballo ';
        $query .= 'INNER JOIN usuario ON usuario.idUsuario = tratamiento.usuario_idUsuario ';
        $query .= 'WHERE tratamiento.caballo_idCaballo = ' . $this->input->post('idCaballo') . ' ';
        $query .= 'ORDER BY tratamiento.idTratamiento DESC ';
        $caballo_pesebreras = $this->Modelo->seleccionar_libre($query);
        echo json_encode($caballo_pesebreras);
    }

    public function editar_tratamiento() {
        $data = array(
            'nombreTratamiento' => $this->input->post('nombreTratamiento'),
            'descripcionTratamiento' => $this->input->post('descripcionTratamiento'),
            'finalizadoTratamiento' => $this->input->post('finalizadoTratamiento'),
            'caballo_idCaballo' => $this->input->post('caballo_idCaballo')
        );
        $this->Modelo->actualizar('tratamiento', $this->input->post('idTratamiento'), $data);
        echo 'actualizado';
    }

    public function finalizar_tratamiento() {
        $data = array(
            'finalizadoTratamiento' => $this->input->post('finalizadoTratamiento'),
            'fecha_finTratamiento' => date("Y-m-d")
        );
        $this->Modelo->actualizar('tratamiento', $this->input->post('idTratamiento'), $data);
        echo 'actualizado';
    }

    public function eliminar_tratamiento() {
        $data = array(
            'idTratamiento' => $this->input->post('idTratamiento')
        );
        $this->Modelo->eliminar('tratamiento', $data);
        echo 'eliminado';
    }

    // End: tratamiento
    // Begin: usuario
    public function ingresar_usuario() {
        $data = array(
            'nombre1Usuario' => $this->input->post('nombre1Usuario'),
            'nombre2Usuario' => $this->input->post('nombre2Usuario'),
            'apellido1Usuario' => $this->input->post('apellido1Usuario'),
            'apellido2Usuario' => $this->input->post('apellido2Usuario'),
            'rutUsuario' => $this->input->post('rutUsuario'),
            'correoUsuario' => $this->input->post('correoUsuario'),
            'passUsuario' => $this->input->post('passUsuario'),
            'tel_movilUsuario' => $this->input->post('tel_movilUsuario'),
            'tel_fijoUsuario' => $this->input->post('tel_fijoUsuario'),
            'fotoUsuario' => $this->input->post('fotoUsuario'),
            'tipo_usuario_idTipo_usuario' => $this->input->post('tipo_usuario_idTipo_usuario'),
            'empresa_idEmpresa' => $this->input->post('empresa_idEmpresa')
        );
        $this->Modelo->crear('usuario', $data);
        echo 'Usuario creada';
    }

    public function listar_usuario() {
        $query = 'SELECT * FROM usuario ';
        $query .= 'INNER JOIN tipo_usuario ON tipo_usuario.idTipo_usuario = usuario.tipo_usuario_idTipo_usuario ';
        $query .= 'ORDER BY usuario.idUsuario DESC ';
        $usuarios = $this->Modelo->seleccionar_libre($query);
        echo json_encode($usuarios);
    }

    public function listar_baqueano() {
        $query = 'SELECT * FROM usuario ';
        $query .= 'INNER JOIN tipo_usuario ON tipo_usuario.idTipo_usuario = usuario.tipo_usuario_idTipo_usuario ';
        $query .= 'WHERE nombreTipo_usuario = \'Baqueano\' ';
        $query .= 'ORDER BY usuario.idUsuario DESC ';
        $usuarios = $this->Modelo->seleccionar_libre($query);
        echo json_encode($usuarios);
    }

    public function editar_usuario() {
        $data = array(
            'nombre1Usuario' => $this->input->post('nombre1Usuario'),
            'nombre2Usuario' => $this->input->post('nombre2Usuario'),
            'apellido1Usuario' => $this->input->post('apellido1Usuario'),
            'apellido2Usuario' => $this->input->post('apellido2Usuario'),
            'rutUsuario' => $this->input->post('rutUsuario'),
            'correoUsuario' => $this->input->post('correoUsuario'),
            'passUsuario' => $this->input->post('passUsuario'),
            'tel_movilUsuario' => $this->input->post('tel_movilUsuario'),
            'tel_fijoUsuario' => $this->input->post('tel_fijoUsuario'),
            'fotoUsuario' => $this->input->post('fotoUsuario'),
            'tipo_usuario_idTipo_usuario' => $this->input->post('tipo_usuario_idTipo_usuario'),
            'empresa_idEmpresa' => $this->input->post('empresa_idEmpresa')
        );
        $this->Modelo->actualizar('usuario', $this->input->post('idUsuario'), $data);
        echo 'actualizado';
    }

    public function eliminar_usuario() {
        $data = array(
            'idUsuario' => $this->input->post('idUsuario')
        );
        $this->Modelo->eliminar('usuario', $data);
        echo 'eliminado';
    }

    // End: usuario

    public function foto_caballo() {
        $config['upload_path'] = '../img/caballo/';
        $config['allowed_types'] = '*';
        $config['file_name'] = $this->input->post('idCaballo') . '_' . time();
        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('foto_principal')) {
            $error = $this->upload->display_errors();
        } else {
            $file_name = $this->upload->data()['file_name'];
            $data = array(
                'fotoCaballo' => $file_name
            );
            $this->Modelo->actualizar('caballo', $this->input->post('idCaballo'), $data);
        }
        echo json_encode($file_name);
        // $info = pathinfo($_FILES['foto_principal']['name']);
        // $ext = $info['extension']; // get the extension of the file
        // $newname = $this->input->post('idCaballo') . '_' . time() . '.' .$ext;
        //
        // $target =  '../img/caballo/' . $newname;
        // move_uploaded_file($_FILES['foto_principal']['tmp_name'], $target);
        //
        // $data = array(
        //   'fotoCaballo' => $newname
        // );
        // $this->Modelo->actualizar('caballo', $this->input->post('idCaballo'), $data);
        // echo $newname;
    }

    public function galeria_caballo() {
        $config['upload_path'] = '../img/caballo_galeria/';
        $config['allowed_types'] = '*';
        $config['file_name'] = $this->input->post('idCaballo') . '_' . time();
        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('foto_galeria')) {
            $error = $this->upload->display_errors();
        } else {
            $file_name = $this->upload->data()['file_name'];
            $data = array(
                'fotoGaleria' => $file_name,
                'descripcionGaleria' => $this->input->post('descripcionGaleria'),
                'caballo_idCaballo' => $this->input->post('idCaballo'),
                'estadoGaleria' => 1
            );
            $this->Modelo->crear('galeria', $data);
        }
        echo json_encode($file_name);
    }

    public function listar_galeria_caballo() {
        $query = 'SELECT * FROM galeria ';
        $query .= 'WHERE estadoGaleria = 1 AND caballo_idCaballo = ' . $this->input->post('idCaballo');
        $galerias = $this->Modelo->seleccionar_libre($query);
        echo json_encode($galerias);
    }

    public function quitar_galeria() {
        $data = array(
            'estadoGaleria' => 0,
            'modificacionGaleria' => date("Y-m-d H:i:s")
        );
        $this->Modelo->actualizar('galeria', $this->input->post('idGaleria'), $data);
    }

    public function foto_inventario() {
        $config['upload_path'] = '../img/inventario/';
        $config['allowed_types'] = '*';
        $config['file_name'] = $this->input->post('idInventario') . '_' . time();
        $this->load->library('upload', $config);
        if (!$this->upload->do_upload('foto_inventario')) {
            $error = $this->upload->display_errors();
        } else {
            $file_name = $this->upload->data()['file_name'];
            $data = array(
                'fotoInventario' => $file_name
            );
            $this->Modelo->actualizar('inventario', $this->input->post('idInventario'), $data);
        }
        echo json_encode($file_name);
    }

}
