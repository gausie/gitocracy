<?php

require './vendor/autoload.php';

$app = new \Slim\Slim(array(
    'templates.path' => './src/php/views'
));
 
$app->get('/', function() use ($app){
   $app->render('main.php'); 
});
$app->get('/orgs', 'getOrgs');
 
$app->run();

function getOrgs(){
    try {
        $orgs = array();
        //todo Scandir manually and avoid doing two loops.
        foreach(array_slice(scandir("./data/orgs/"),2) as $val){
            array_push($orgs,array(
                "name" => $val
            ));
        }
        echo json_encode($orgs);
    } catch(Exception $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

?>
