<?php

namespace Services;

use Daos\VotesDao;
use Exception;
use Models\Vote;

class VotesService extends AbstractService {
    private $votesDao;

    public function __construct() {
        parent::__construct();
        $this->votesDao = new VotesDao($this->getConnection());
    }

    public function getAll(): array {
       return $this->votesDao->getAll();
    }

    /**
     * @throws Exception
     */
    public function addNew($vote): void {
        $this->votesDao->addNew($vote);
    }
}