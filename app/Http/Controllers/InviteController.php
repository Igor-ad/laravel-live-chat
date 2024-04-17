<?php

namespace App\Http\Controllers;

use App\Http\Requests\InviteRequest;
use App\Jobs\SendInvite;
use App\Models\Invite;

class InviteController extends Controller
{
    public function invite(InviteRequest $request)
    {
        $invite = $this->store($request);
        SendInvite::dispatch($invite);

        return response()->json($this->toArray());
    }

    public function store(InviteRequest $request): Invite
    {
        return Invite::create(
            array_merge($request->validated(), [
                'text' => $this->getInviteText(),
                'is_invite' => true,
            ]),
        );
    }

    private function getInviteText(): string
    {
        $user = auth()->user();

        return sprintf('You are invited by the %s user to a chat.', $user['name']);
    }

    private function toArray(): array
    {
        return [
            'success' => true,
            'message' => 'Invite created and sent.',
        ];
    }
}
