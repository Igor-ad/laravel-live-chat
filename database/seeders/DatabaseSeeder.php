<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Invite;
use App\Models\Message;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(1)->create();
         Chat::factory(1)->create();
         Message::factory(1)->create();
         Invite::factory(1)->create();
    }
}
