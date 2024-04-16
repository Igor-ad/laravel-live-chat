<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRequest;
use App\Models\Chat;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ChatController extends Controller
{
    public function index(): View
    {
        $allowedChats = Chat::where('user_id', auth()->id())
            ->orWhere('status', 'public')->get();

        return view('chats.chats', compact('allowedChats'));
    }

    public function create(): View
    {
        return view('chats.create');
    }

    public function show(string $chatId): View
    {
        $user = auth()->user();
        $chat = Chat::find($chatId);

        return view('chats.chat-box', compact('user', 'chat'));
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
}
