<?php

return [
    '~^votes$~' => [\Controllers\VotesController::class, 'getAll'],
    '~^votes/add$~' => [\Controllers\VotesController::class, 'addNew'],
    '~^restaurants$~' => [\Controllers\RestaurantsController::class, 'getAll'],
    '~^restaurants/add$~' => [\Controllers\RestaurantsController::class, 'addNew'],
];