<?php

declare(strict_types=1);

namespace App\Broadcasting;

class SystemPresenceChannel extends BaseChannel
{
    protected static string $channelName = 'SystemPresenceChannel';
}
