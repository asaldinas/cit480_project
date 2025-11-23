<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();

            // which user owns this record
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // main fields that match your Dashboard.jsx cards
            $table->string('company');
            $table->string('position');
            $table->string('salary')->nullable();

            // 'todo' | 'submitted' | 'response'
            $table->string('status');

            // optional extras
            $table->string('location')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
