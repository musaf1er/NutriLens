<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Food extends Model
{
    protected $table = 'foods';

    protected $fillable = ['food_name', 'food101_label', 'calories_per_100g', 'protein', 'carbohydrate', 'fat'];

    protected function casts(): array
    {
        return ['calories_per_100g' => 'float', 'protein' => 'float', 'carbohydrate' => 'float', 'fat' => 'float'];
    }

    public function histories(): HasMany
    {
        return $this->hasMany(FoodHistory::class);
    }
}