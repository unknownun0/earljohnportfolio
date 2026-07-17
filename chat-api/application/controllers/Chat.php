<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        $this->load->model('Chat_model');
    }

    public function get_messages()
    {
        $limit = min((int)$this->input->get('limit'), 50);
        if ($limit < 1) $limit = 30;

        $messages = $this->Chat_model->get_recent_messages($limit);

        $output = array();
        foreach ($messages as $msg) {
            $output[] = array(
                'id'         => (int)$msg->id,
                'nickname'   => html_escape($msg->nickname),
                'message'    => html_escape($msg->message),
                'created_at' => $msg->created_at
            );
        }

        echo json_encode(array('success' => true, 'messages' => $output));
    }

    public function send_message()
    {
        $raw = json_decode(trim(file_get_contents('php://input')), true);
        $nickname = isset($raw['nickname']) ? trim($raw['nickname']) : '';
        $message  = isset($raw['message'])  ? trim($raw['message'])  : '';

        if (empty($nickname) || empty($message)) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'Nickname and message are required.'));
            return;
        }

        $nickname = mb_substr($nickname, 0, 50);
        $message  = mb_substr($message, 0, 500);

        $nickname = $this->security->xss_clean($nickname);
        $message  = $this->security->xss_clean($message);

        if (empty($nickname) || empty($message)) {
            http_response_code(400);
            echo json_encode(array('success' => false, 'error' => 'Message contains invalid content.'));
            return;
        }

        $ip = $this->input->ip_address();

        $rate_limit_key = 'chat_rate_' . md5($ip);
        $last_time = $this->cache->file->get($rate_limit_key);
        if ($last_time !== FALSE && (time() - $last_time) < 3) {
            http_response_code(429);
            echo json_encode(array('success' => false, 'error' => 'Please wait a few seconds before sending another message.'));
            return;
        }
        $this->cache->file->save($rate_limit_key, time(), 300);

        $id = $this->Chat_model->insert_message($nickname, $message, $ip);

        if ($id) {
            echo json_encode(array(
                'success' => true,
                'message' => array(
                    'id'         => (int)$id,
                    'nickname'   => html_escape($nickname),
                    'message'    => html_escape($message),
                    'created_at' => date('Y-m-d H:i:s')
                )
            ));
        } else {
            http_response_code(500);
            echo json_encode(array('success' => false, 'error' => 'Failed to save message.'));
        }
    }
}
