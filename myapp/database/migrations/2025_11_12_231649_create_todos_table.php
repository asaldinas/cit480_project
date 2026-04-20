<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->foreignId('application_id')->nullable()->index();

            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('type', [
                'follow_up',
                'apply',
                'send_email',
                'custom',
            ])->nullable();

            $table->enum('input_type', [
                'text',
                'link',
                'action',
            ])->default('text');

            $table->text('value')->nullable();

            $table->boolean('completed')->default(false);
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
