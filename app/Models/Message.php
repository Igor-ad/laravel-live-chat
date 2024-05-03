<?php

declare(strict_types=1);

namespace App\Models;

use App\Http\Resources\MessageResource;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes, BroadcastsEvents;

    protected $fillable = [
        'id',
        'user_id',
        'chat_id',
        'text'
    ];

    public function broadcastOn($event): PrivateChannel
    {
        return new PrivateChannel("App.Models.Chat.{$this->getAttribute('chat_id')}");
    }

    public function broadcastWith($event): array
    {
        return [
            'model' => MessageResource::make($this),
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

    /**
     *  Accessor to attribute 'time' from 'created_at'
     */
    public function getTimeAttribute(): string
    {
        return date(
            "d M Y, H:i:s",
            strtotime($this->attributes['created_at'])
        );
    }
}
