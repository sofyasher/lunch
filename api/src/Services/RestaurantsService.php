<?php

namespace Services;

use Daos\RestaurantsDao;
use Exception;
use Models\Restaurant;

class RestaurantsService extends AbstractService {
    private $restaurantsDao;

    public function __construct() {
        parent::__construct();
        $this->restaurantsDao = new RestaurantsDao($this->getConnection());
    }

    /**
     * @throws Exception
     */
    public function addNew($restaurant): void{
        $this->restaurantsDao->addNew($restaurant);
    }

    public function getAll(): array{
        return $this->restaurantsDao->getAll();
    }
}