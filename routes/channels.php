<?php

use App\Broadcasting\ChatPrivateChannel;
use App\Broadcasting\SystemPresenceChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel(SystemPresenceChannel::NAME,SystemPresenceChannel::class);

Broadcast::channel(ChatPrivateChannel::NAME, ChatPrivateChannel::class);
