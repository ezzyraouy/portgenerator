<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relationship with the UserInformation model
     */
    public function userInformation()
    {
        return $this->hasOne(UserInformation::class);
    }

    /**
     * Relationship with the Project model
     */
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    /**
     * Relationship with the Language model
     */
    public function languages()
    {
        return $this->hasMany(Language::class);
    }

    /**
     * Relationship with the Education model
     */
    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    /**
     * Relationship with the Experience model
     */
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
}
