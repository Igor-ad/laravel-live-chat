<?php

declare(strict_types=1);

namespace App\Models;

use App\Broadcasting\SystemPresenceChannel;
use App\Http\Resources\ChatResource;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes, BroadcastsEvents;

    protected $fillable = [
        'name',
        'status',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function broadcastOn($event): PrivateChannel
    {
        return new PrivateChannel(SystemPresenceChannel::channelName());
    }

    public function broadcastWith($event): array
    {
        return [
            'model' => ChatResource::make($this),
        ];
    }
}
