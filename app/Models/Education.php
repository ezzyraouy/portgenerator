<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Education extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'institution_name',
        'description_fr',
        'description_en',
        'address_fr',
        'address_en',
        'start_date',
        'end_date',
        'is_current',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
