<?php

declare(strict_types=1);

namespace App\Broadcasting;

class ChatPrivateChannel extends BaseChannel
{
    public final const NAME = 'App.Models.Chat.{id}';
}
