<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodHistory extends Model
{
    protected $table = 'food_histories';

    protected $fillable = ['user_id', 'food_id', 'image_path', 'confidence', 'portion_gram', 'total_calories'];

    protected function casts(): array
    {
        return ['confidence' => 'float', 'portion_gram' => 'float', 'total_calories' => 'float'];
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function food(): BelongsTo { return $this->belongsTo(Food::class); }
}