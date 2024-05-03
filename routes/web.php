<?php

use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Web\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => view('welcome'));


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => view('dashboard'))->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/messages/{chatId}', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::delete('/messages/{id}', [MessageController::class, 'destroy'])->name('messages.destroy');
    Route::post('/invites', [InviteController::class, 'store'])->name('invites.store');
    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/chats/{chatId}', [ChatController::class, 'show'])->name('chats.box');
    Route::get('/chat/create', [ChatController::class, 'create'])->name('chats.create');
    Route::post('/chats/store', [ChatController::class, 'store'])->name('chats.store');
    Route::delete('/chats/{chatId}', [ChatController::class, 'destroy'])->name('chats.delete');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
