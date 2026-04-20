<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

   // App\Models\Application.php

protected $fillable = [
    'company',
    'position',
    'salary',
    'status',
    'location',
    'source',
    'notes',
    'link',
    'response_type',
    'user_id',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function todos()
    {
        return $this->hasMany(Todo::class);
    }
}
