<?php

declare(strict_types=1);

namespace App\Broadcasting;

class ChatPrivateChannel extends BaseChannel
{
    protected static string $channelName = 'App.Models.Chat.{id}';
}
