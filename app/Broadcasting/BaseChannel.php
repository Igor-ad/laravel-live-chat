<?php

declare(strict_types=1);

namespace App\Broadcasting;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

abstract class BaseChannel
{
    public function __construct(
        protected Request $request,
    ) {
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user): array|bool
    {
        return UserResource::make($user)->toArray($this->request);
    }
}
