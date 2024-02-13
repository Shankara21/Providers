<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function sales()
    {
        return $this->belongsTo(User::class, 'sales_id');
    }
}
