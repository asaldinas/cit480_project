<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE contacts MODIFY type ENUM('recruiter', 'hiring_manager', 'other') NOT NULL");
    }

    public function down(): void
    {
        DB::table('contacts')->where('type', 'other')->update(['type' => 'recruiter']);
        DB::statement("ALTER TABLE contacts MODIFY type ENUM('recruiter', 'hiring_manager') NOT NULL");
    }
};
