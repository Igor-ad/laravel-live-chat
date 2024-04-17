<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Jobs\SendMessage;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function message(MessageRequest $request, string $chatId): JsonResponse
    {
        $message = $this->store($request, $chatId);
        SendMessage::dispatch($message);

        return response()->json($this->toArray());
    }

    public function getMessagesByChatId(string $chatId): JsonResponse
    {
        $messages = Message::with('user')
            ->where('chat_id', $chatId)
            ->get()->append('time');

        return response()->json($messages);
    }

    public function store(MessageRequest $request, string $chatId): Message
    {
        return Message::create([
            'text' => $request->input('text'),
            'chat_id' => $chatId,
            'user_id' => auth()->id(),
        ]);
    }

    private function toArray(): array
    {
        return [
            'success' => true,
            'message' => 'Message created.',
        ];
    }
}
