<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'company_name',
        'role',
        'role_description_fr',
        'role_description_en',
        'address_fr',
        'address_en',
        'start_date',
        'end_date',
        'is_current',
        'company_website',
        'skills_acquired',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
