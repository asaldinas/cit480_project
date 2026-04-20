<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE todos MODIFY type ENUM('follow_up', 'apply', 'check_portal', 'send_email', 'custom') NULL DEFAULT NULL");
    }

    public function down(): void
    {
        DB::table('todos')->where('type', 'apply')->update(['type' => 'custom']);
        DB::statement("ALTER TABLE todos MODIFY type ENUM('follow_up', 'check_portal', 'send_email', 'custom') NOT NULL DEFAULT 'custom'");
    }
};
