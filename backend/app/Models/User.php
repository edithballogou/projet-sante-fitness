<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Activity;
use App\Models\Meal;
use App\Models\Notification;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'age', 'poids', 'taille', 'objectif_poids', 'role',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
