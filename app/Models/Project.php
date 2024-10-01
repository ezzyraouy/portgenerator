<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title_fr',
        'title_en',
        'description_fr',
        'description_en',
        'image_path',
        'video_url',
        'project_link',
        'tags',
        'status',
        'technologies_used',
        'repository_link',
        'client_name',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
