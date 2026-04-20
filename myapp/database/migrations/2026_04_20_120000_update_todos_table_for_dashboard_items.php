<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            if (! Schema::hasColumn('todos', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('id')->index();
            }

            if (! Schema::hasColumn('todos', 'application_id')) {
                $table->foreignId('application_id')->nullable()->after('user_id')->index();
            }

            if (! Schema::hasColumn('todos', 'type')) {
                $table->enum('type', [
                    'follow_up',
                    'apply',
                    'send_email',
                    'custom',
                ])->nullable()->after('description');
            }

            if (! Schema::hasColumn('todos', 'input_type')) {
                $table->enum('input_type', [
                    'text',
                    'link',
                    'action',
                ])->default('text')->after('type');
            }

            if (! Schema::hasColumn('todos', 'value')) {
                $table->text('value')->nullable()->after('input_type');
            }

            if (! Schema::hasColumn('todos', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->after('completed');
            }
        });
    }

    public function down(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            foreach (['completed_at', 'value', 'input_type', 'type', 'application_id', 'user_id'] as $column) {
                if (Schema::hasColumn('todos', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
