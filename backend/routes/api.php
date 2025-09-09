<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\MealController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;


Route::apiResource('users', UserController::class);
Route::apiResource('activities', ActivityController::class);
Route::apiResource('meals', MealController::class);
Route::apiResource('notifications', NotificationController::class);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/dashboard', [DashboardController::class, 'index']);

