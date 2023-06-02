<?php

namespace Controllers;

use Exception;
use Services\VotesService;

class VotesController {
    private VotesService $votesService;

    public function __construct() {
        $this->votesService = new VotesService();
    }

    private function addHeaders(): void {
        header('Content-Type: application/json');
        header('Expires: on, 01 Jan 1970 00:00:00 GMT');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', false);
        header('Pragma: no-cache');
    }

    public function getAll(): void {
        $this->addHeaders();
        echo json_encode($this->votesService->getAll(), JSON_THROW_ON_ERROR);
    }

    public function addNew(): void {
        if (isset($_POST['vote'])) {
            $vote = $_POST['vote'];
            try {
                $this->votesService->addNew(json_decode($vote, false, 512, JSON_THROW_ON_ERROR));
                http_response_code(201);
            } catch (Exception $e) {
                http_response_code(503);
                echo $e->getMessage();
            }
        } else {
            http_response_code(400);
        }
    }
}