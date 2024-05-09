<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastableModelEventOccurred;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invite extends Message
{
    use HasFactory, SoftDeletes, BroadcastsEvents, InteractsWithSockets;

    public final const TEXT = 'You are invited to the chat.';

    protected $fillable = [
        'id',
        'user_id',
        'chat_id',
        'text',
        'is_invite',
    ];

    protected $table = 'messages';

    protected function newBroadcastableEvent($event): BroadcastableModelEventOccurred
    {
        return (new BroadcastableModelEventOccurred(
            $this, $event
        ))->dontBroadcastToCurrentUser();
    }

    public function broadcastOn($event): PrivateChannel
    {
        return new PrivateChannel("App.Models.Chat.{$this->getAttribute('chat_id')}");
    }
}
