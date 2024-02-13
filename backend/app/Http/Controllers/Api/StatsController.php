<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Subscription;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $subcription = Subscription::count();
        $customer = Subscription::select('customer_id')->distinct()->count();
        $package = Package::count();
        return $this->successResponse([
            'subscriptions' => $subcription,
            'customers' => $customer,
            'packages' => $package
        ], 'Stats retrieved successfully.');
    }
}
