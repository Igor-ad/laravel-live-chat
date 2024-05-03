<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageCollection;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MessageController extends Controller
{
    public function index(string $chatId): ResourceCollection
    {
        $messages = Message::query()
            ->with('user')
            ->where('chat_id', $chatId)
            ->get()->append('time');

        return MessageCollection::make($messages);
    }

    public function store(MessageRequest $request): JsonResponse
    {
        Message::create(
            array_merge($request->validated(), [
                'user_id' => auth()->id(),
            ]),
        );

        return response()->json($this->toArray());
    }

    public function destroy(string $id): JsonResponse
    {
        return response()->json([
            'success' => (bool)Message::destroy($id),
            'message' => "Message deleted.",
        ]);
    }

    private function toArray(): array
    {
        return [
            'success' => true,
            'message' => "Message created.",
        ];
    }
}
