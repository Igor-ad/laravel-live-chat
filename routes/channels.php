<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.Chat.{id}', function () {
    return true;
});

Broadcast::channel('App.Models.User.{id}', function () {
    return true;
});
