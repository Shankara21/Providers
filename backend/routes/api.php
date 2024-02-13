<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
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

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {

    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/', [AuthController::class, 'user'])->name('user');
    });

    // Stats routes
    Route::get('/stats', [StatsController::class, 'index']);

    // Route for admin
    Route::middleware('role:admin')->group(function () {

        // User routes
        Route::apiResource('users', UserController::class);

        // Package routes
        Route::apiResource('packages', PackageController::class);

        // Subscription routes
        Route::apiResource('subscriptions', SubscriptionController::class);

        // Role routes
        Route::apiResource('roles', RoleController::class);

        // Report routes
        Route::get('/reports/{id}', [SubscriptionController::class, 'report']);
    });

    // Route for sales
    Route::middleware('role:sales')->group(function () {

        // Customer routes
        Route::apiResource('customers', CustomerController::class);
    });

    // Get all packages
    Route::get('/packages', [PackageController::class, 'index']);

    // Another routes for packages

});
