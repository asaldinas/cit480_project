<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class SendVerificationEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * You can optionally pass --chunk=100 to control batch size.
     */
    protected $signature = 'users:send-verification {--chunk=100}';

    /**
     * The console command description.
     */
    protected $description = 'Send email verification links to all unverified users';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $chunkSize = (int) $this->option('chunk');

        $this->info("Sending verification emails in chunks of {$chunkSize}...");

        $total = 0;

        User::whereNull('email_verified_at')
            ->chunkById($chunkSize, function ($users) use (&$total) {
                foreach ($users as $user) {
                    try {
                        $user->sendEmailVerificationNotification();
                        $this->line("Sent to: {$user->email}");
                        $total++;
                    } catch (\Throwable $e) {
                        $this->error("Failed for {$user->email}: {$e->getMessage()}");
                    }
                }
            });

        $this->info("Done. {$total} verification emails sent.");

        return Command::SUCCESS;
    }
}