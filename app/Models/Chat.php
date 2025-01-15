<?php

declare(strict_types=1);

namespace App\Models;

use App\Broadcasting\SystemPresenceChannel;
use App\Http\Resources\ChatResource;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory;
    use SoftDeletes;
    use BroadcastsEvents;

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
        return new PrivateChannel(SystemPresenceChannel::NAME);
    }

    public function broadcastWith($event): array
    {
        return [
            'model' => ChatResource::make($this),
        ];
    }

    public function scopeAccessByOwnerOrByStatus($query, $status): Builder
    {
        return $query
            ->where('user_id', auth()->id())
            ->orWhere('status', $status);
    }
}
