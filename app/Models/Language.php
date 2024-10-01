<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Language extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'language_name',
        'proficiency_level',
        'certification',
        'years_of_experience',
        'is_primary',
        'description_fr',
        'description_en',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
