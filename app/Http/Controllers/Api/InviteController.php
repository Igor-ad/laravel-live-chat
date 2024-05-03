<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InviteRequest;
use App\Models\Invite;
use Illuminate\Http\JsonResponse;

class InviteController extends Controller
{
    public function store(InviteRequest $request): JsonResponse
    {
        Invite::create(
            array_merge($request->validated(), [
                'text' => 'You are invited to the chat.',
                'is_invite' => true,
            ]),
        );

        return response()->json($this->toArray());
    }

    private function toArray(): array
    {
        return [
            'success' => true,
            'message' => 'Invite created.',
        ];
    }
}
