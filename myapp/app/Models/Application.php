<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company',
        'position',
        'salary',
        'status',
        'location',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
