<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invite extends Message
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'chat_id',
        'text',
        'is_invite',
    ];

    protected $table = 'messages';
}
