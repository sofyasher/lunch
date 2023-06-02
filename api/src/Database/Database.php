<?php
namespace Database;

use PDO;
use PDOException;

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $db_config = require 'config.php';
        $this->host = $db_config['server'];
        $this->db_name = $db_config['database'];
        $this->username = $db_config['login'];
        $this->password = $db_config['password'];
    }

    public function getConnection(): ?PDO {
        $this->conn = null;
        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username,
                $this->password);
            $this->conn->exec('set names utf8');
        } catch (PDOException $exception) {
            echo 'Connection error: ' . $exception->getMessage();
        }
        return $this->conn;
    }
}
