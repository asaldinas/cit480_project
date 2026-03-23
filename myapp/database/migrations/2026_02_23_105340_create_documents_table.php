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
    Schema::create('documents', function (Blueprint $table) {
        $table->id();

        // Ownership
        $table->foreignId('user_id')
              ->constrained()
              ->onDelete('cascade');

        // File metadata
        $table->string('original_name');   // Software_Engineer_Resume.pdf
        $table->string('s3_path');         // documents/{user_id}/uuid.pdf

        // UI fields
        $table->string('category');        // resume, cover_letter, portfolio, certificate
        $table->json('tags')->nullable();  // ["latest","tech"]

        // Technical metadata
        $table->string('mime_type')->nullable();
        $table->unsignedBigInteger('size'); // store in bytes

        $table->timestamps();
        $table->softDeletes();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
