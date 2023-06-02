<?php

namespace Daos;

use Exception;
use Models\Vote;
use PDO;

class VotesDao extends AbstractDao {
    private static string $votesTableName = 'restaurants';

    public function __construct($db) {
        parent::__construct($db);
    }

    public function getAll():array {
        $query = 'SELECT * from votes INNER JOIN restaurants ON votes.restaurantId=restaurants.id';
        $stmt = $this->prepareStatement($query);
        $stmt->execute();
        $votes = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $vote = new Vote();
            $vote->createdAt = $row['datetime'];
            $vote->personName = $row['personName'];
            $vote->restaurantName = $row['name'];
            $votes[] = $vote;
        }
        return $votes;
    }

    /**
     * @throws Exception
     */
    public function addNew($vote): void {
        $query = 'INSERT INTO votes (personName, restaurantId) VALUES (:personName, :restaurantId)';
        $stmt = $this->prepareStatement($query);
        $stmt->bindValue(':personName', $vote->personName);
        $stmt->bindValue(':restaurantId', $vote->restaurantId);
        $stmt->execute();
    }
}