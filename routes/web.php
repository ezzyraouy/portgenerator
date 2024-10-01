<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleLoginController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

// Route::get('/isConnected', function () {
//     if (Auth::check()) {
//         return response()->json(['status' => 'connected', 'user' => Auth::user()]);
//     } else {
//         return response()->json(['status' => 'not connected'], 401);
//     }
// });

Route::get('/google/redirect', [GoogleLoginController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/callback', [GoogleLoginController::class, 'handleGoogleCallback'])->name('google.callback');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
