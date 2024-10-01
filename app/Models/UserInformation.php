<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserInformation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'full_name',
        'phone_number',
        'birth_date',
        'address_fr',
        'address_en',
        'email_address',
        'profile_picture',
        'social_links',
        'bio',
        'portfolio_website',
        'github_username',
        'resume_fr',
        'resume_en',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
