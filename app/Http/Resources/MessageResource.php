<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'user_id' => $this->user_id,
            'chat_id' => $this->chat_id,
            'is_invite' => $this->is_invite,
            'time' => $this->time,
            'user' => UserResource::make($this->user),
        ];
    }
}
