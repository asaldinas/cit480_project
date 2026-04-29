<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $fillable = [
        'user_id',
        'event_date',
        'event_time',
        'type',
        'label',
    ];
}