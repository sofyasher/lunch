<?php

namespace Services;

use Database\Database;

abstract class AbstractService {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getConnection() {
        return $this->db;
    }
}