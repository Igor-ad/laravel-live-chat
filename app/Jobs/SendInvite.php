<?php

namespace App\Jobs;

use App\Events\GotInvite;
use App\Models\Invite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendInvite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Invite $invite,
    )
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        GotInvite::dispatch($this->invite->toArray());
    }
}
