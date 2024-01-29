<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AuthController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(ProductController::class)->group(function() {
Route::get('/products' ,'index');
Route::post('/product' ,'store');
Route::get('/product/{id}' ,'show');
Route::put('/product/{id}' ,'update');
Route::delete('/product/{id}' ,'destroy');


});

// routes/web.php o routes/api.php

// routes/web.php o routes/api.php


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);




 Route::resource('categories', CategoryController::class);
