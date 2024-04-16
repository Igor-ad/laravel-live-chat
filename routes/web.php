<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('welcome'));


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => view('dashboard'))->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/messages/{chatId}', [MessageController::class, 'getMessagesByChatId'])->name('messages');
    Route::post('/message/{chatId}', [MessageController::class, 'message'])->name('message');
    Route::get('/users_online', [UserController::class, 'online'])->name('online');
    Route::post('/invite', [InviteController::class, 'invite'])->name('send.invite');
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/chats/{id}', [ChatController::class, 'show'])->name('chats.box');
    Route::get('/create', [ChatController::class, 'create'])->name('chats.create');
    Route::post('/chats/store', [ChatController::class, 'store'])->name('chats.store');
    Route::delete('/chats/delete/{id}', [ChatController::class, 'destroy'])->name('chats.delete');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
