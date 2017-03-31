<?php

class Modelo extends CI_Model {

    function __construct() {
// Call the Model constructor
        parent::__construct();
        $this->load->database();
    }

    // Create
    function crear($table, $data) {
        /* $data = array(
          'title' => 'My title',
          'name' => 'My Name',
          'date' => 'My date'
          ); */
        $this->db->insert($table, $data);
    }

    // Update
    function actualizar($table, $id, $data) {
        /* $data = array(
          'title' => $title,
          'name' => $name,
          'date' => $date
          ); */

        $this->db->where('id' . ucwords($table), $id);
        $this->db->update($table, $data);
    }

    // Read
    function seleccionar_libre($query) {
        $query = $this->db->query($query);
        return $query->result_array();
    }
    
    function query($query) {
        $query = $this->db->query($query);
    }

    function seleccionar_todo($tabla) {
        $this->db->order_by('id' . ucwords($tabla), 'desc');
        $query = $this->db->get($tabla);
        return $query->result_array();
    }

    // Delete
    function eliminar($tabla, $data) {
        $this->db->delete($tabla, $data);
    }

    function login($rut, $pass) {
        $this->db->where('rutUsuario', $rut);
        $this->db->where('passUsuario', $pass);
        $query = $this->db->get('usuario');
        return $query->result_array();
    }

}

?>
