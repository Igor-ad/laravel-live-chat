<?php

declare(strict_types=1);

namespace Tests;

use App\Models\Chat;
use App\Models\Invite;
use App\Models\Message;
use App\Models\User;

trait TestInitTrait
{
    protected User $user;
    protected Chat $chat;
    protected Message $message;
    protected Invite $invite;

    protected function init(): void
    {
        $this->setUser();
        $this->setChat();
    }

    protected function userInit(): void
    {
        $this->setUser();
    }

    private function setChat(): void
    {
        $this->chat = Chat::factory()->create([
            'user_id' => $this->user->getAttribute('id'),
        ]);
    }

    private function setMessage(): void
    {
        $this->message = Message::factory()->create([
            'user_id' => $this->user->getAttribute('id'),
            'chat_id' => $this->chat->getAttribute('id'),
        ]);
    }

    private function setInvite(): void
    {
        $this->invite = Invite::factory()->create([
            'user_id' => $this->user->getAttribute('id'),
            'chat_id' => $this->chat->getAttribute('id'),
        ]);
    }

    private function setUser(): void
    {
        $this->user = User::factory()->create();
    }
}
