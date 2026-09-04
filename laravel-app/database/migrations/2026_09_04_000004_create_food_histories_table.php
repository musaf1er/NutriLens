<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Recover safely from an interrupted first deployment on the fresh database.
        Schema::dropIfExists('food_histories');

        Schema::create('food_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('food_id')->constrained('foods')->restrictOnDelete();
            $table->string('image_path')->nullable();
            $table->decimal('confidence', 5, 4);
            $table->decimal('portion_gram', 8, 2);
            $table->decimal('total_calories', 10, 2);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('food_histories'); }
};
