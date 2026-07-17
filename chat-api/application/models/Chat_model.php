<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat_model extends CI_Model {

    public function get_recent_messages($limit = 30)
    {
        $this->db->select('id, nickname, message, created_at');
        $this->db->from('messages');
        $this->db->order_by('created_at', 'DESC');
        $this->db->limit($limit);
        $query = $this->db->get();

        $results = $query->result();

        return array_reverse($results);
    }

    public function insert_message($nickname, $message, $ip_address = NULL)
    {
        $data = array(
            'nickname'   => $nickname,
            'message'    => $message,
            'ip_address' => $ip_address
        );

        $this->db->insert('messages', $data);

        if ($this->db->affected_rows() > 0) {
            return $this->db->insert_id();
        }

        return FALSE;
    }
}
