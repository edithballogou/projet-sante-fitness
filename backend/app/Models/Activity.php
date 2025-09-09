<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'type', 'duree', 'calories_brulees', 'date_activite',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
