<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    public function getUsersOnline(): Collection
    {
        return Session::with('user')
            ->select('user_id')
            ->whereNot('user_id', auth()->id())
            ->whereNotNull('user_id')
            ->distinct()
            ->get()->pluck('user');
    }

    public function online(): JsonResponse
    {
        return response()->json($this->getUsersOnline());
    }
}
