<?php

namespace Daos;

use Exception;
use Models\Restaurant;
use PDO;

class RestaurantsDao extends AbstractDao {
    private static string $restaurantsTableName = 'restaurants';

    public function __construct($db) {
        parent::__construct($db);
    }

    /**
     * @throws Exception
     */
    public function getAll(): array {
        $query = 'SELECT * from restaurants ORDER BY name';
        $stmt = $this->prepareStatement($query);
        $stmt->execute();
        $restaurants = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $restaurant = new Restaurant();
            $restaurant->id = $row['id'];
            $restaurant->name = $row['name'];
            $restaurants[] = $restaurant;
        }
       return $restaurants;
    }

    /**
     * @throws Exception
     */
    public function addNew($restaurant): void {
        $query = 'INSERT INTO restaurants (name) VALUES (:restaurantName)';
        $stmt = $this->prepareStatement($query);
        $stmt->bindValue(':restaurantName', $restaurant->name);
        $stmt->execute();
    }
}