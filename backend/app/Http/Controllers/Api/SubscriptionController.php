<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Models\Subscription;
use App\Models\User;
use App\Traits\ApiResponse;

class SubscriptionController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subscription = Subscription::with('customer', 'package', 'user')->get();
        return $this->successResponse($subscription, 'Subscriptions retrieved successfully');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSubscriptionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSubscriptionRequest $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription)
    {
        $subscription = Subscription::with('customer', 'package', 'user')->find($subscription->id);
        return $this->successResponse($subscription, 'Subscription retrieved successfully');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSubscriptionRequest  $request
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSubscriptionRequest $request, Subscription $subscription)
    {
        $validateData = $request->validate([
            'package_id' => 'required',
            'customer_id' => 'required',
            'status' => 'required',
            'user_id' => 'required',
            'sales_id' => 'required',
        ]);
        try {
            $subscription->update($validateData);
            return $this->successResponse($subscription, 'Subscription updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update subscription', 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        try {
            $subscription->delete();
            return $this->successResponse($subscription, 'Subscription deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete subscription', 409);
        }
    }

    public function report($id)
    {
        $user = User::find($id);
        $subscription = Subscription::where('sales_id', $id)->with('customer', 'package', 'user')->get();
        $revenue = 0;
        foreach ($subscription as $key => $value) {
            $revenue += $value->package->price;
        }
        return $this->successResponse([
            'user' => $user,
            'data_sales' => $subscription,
            'revenue' => $revenue
        ], 'Subscription retrieved successfully');
    }
}
