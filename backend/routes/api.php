<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', MeController::class);

    Route::get('/task', [TaskController::class, 'index']);
    Route::post('/task/search', [TaskController::class, 'search']);
    Route::post('/task', [TaskController::class, 'create']);
    Route::put('/task/{task}', [TaskController::class, 'update']);
    Route::delete('/task/{task}', [TaskController::class, 'delete']);
    Route::delete('/task', [TaskController::class, 'deleteAll']);
});
