<?php

use App\Broadcasting\ChatPrivateChannel;
use App\Broadcasting\SystemPresenceChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel(SystemPresenceChannel::channelName(),SystemPresenceChannel::class);

Broadcast::channel(ChatPrivateChannel::channelName(), ChatPrivateChannel::class);
