<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('food_name');
            $table->string('food101_label')->unique();
            $table->decimal('calories_per_100g', 8, 2);
            $table->decimal('protein', 8, 2)->default(0);
            $table->decimal('carbohydrate', 8, 2)->default(0);
            $table->decimal('fat', 8, 2)->default(0);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('foods'); }
};