<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Broadcasting\SystemPresenceChannel;

class ApplicationController
{
    public static function systemData(): string
    {
        return json_encode([
            'authUserId' => auth()->id(),
            'systemChannel' => SystemPresenceChannel::channelName(),
        ]);
    }

}
