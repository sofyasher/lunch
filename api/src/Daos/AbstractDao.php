<?php

namespace Daos;

use PDO;
use PDOStatement;

abstract class AbstractDao {
    protected PDO $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function prepareStatement($query): PDOStatement {
        return $this->conn->prepare($query);
    }
}