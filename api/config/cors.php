<?php

return [

   
   
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'register'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,

];
