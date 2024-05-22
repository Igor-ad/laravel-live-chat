<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Broadcasting\SystemPresenceChannel;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChatRequest;
use App\Http\Resources\ChatResource;
use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ChatController extends Controller
{
    public function index(): View
    {
        $allowedChats = Chat::query()
            ->with('user')
            ->byAuthUserOrByStatus('public')
            ->get();

        return view('chats.chats', compact('allowedChats'));
    }

    public function create(): View
    {
        return view('chats.create');
    }

    public function show(string $chatId): View
    {
        $chatData = json_encode([
            'user' => UserResource::make(User::find(auth()->id())),
            'chat' => ChatResource::make(Chat::find($chatId)),
            'channels' => $this->channels($chatId),
        ]);

        return view('chats.chat-box', compact('chatData'));
    }

    public function store(ChatRequest $request): RedirectResponse
    {
        Chat::create(
            array_merge(
                $request->validated(),
                ['user_id' => (int)auth()->id()]
            ),
        );
        return redirect()->route('chats.index');
    }

    public function destroy(string $chatId): RedirectResponse
    {
        Chat::destroy($chatId);

        return redirect()->route('chats.index');
    }

    private function channels(string $chatId): array
    {
        return [
            'systemChannel' => SystemPresenceChannel::NAME,
            'chatChannel' => "App.Models.Chat.{$chatId}",
        ];
    }
}
