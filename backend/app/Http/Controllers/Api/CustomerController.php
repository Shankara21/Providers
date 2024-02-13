<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\Subscription;
use App\Traits\ApiResponse;

class CustomerController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->successResponse(Customer::all(), 'Customers retrieved successfully');
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
     * @param  \App\Http\Requests\StoreCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCustomerRequest $request)
    {
        $validateData = $request->validate([
            'name' => 'required',
            'phone' => 'required|numeric',
            'address' => 'required',
            'id_card' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'house_photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        try {
            $validateData['id_card'] =  $request->file('id_card')->store('id_card', 'public');
            $validateData['house_photo'] =  $request->file('house_photo')->store('house_photo', 'public');
            $customer = Customer::create($validateData);
            $data = [
                'customer_id' => $customer->id,
                'package_id' => (int) $request->package_id,
                'sales_id' => $request->sales_id,
            ];
            Subscription::create($data);
            return $this->successResponse($customer, 'Customer created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create customer', 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        $customer = Customer::with('subscription.package', 'subscription.user', 'subscription.sales')->find($customer->id);

        return $this->successResponse($customer, 'Customer retrieved successfully');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $validateData = $request->validate([
            'name' => '',
            'phone' => '|numeric',
            'address' => '',
            'id_card' => 'image|mimes:jpeg,png,jpg|max:2048',
            'house_photo' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $subscription = Subscription::where('customer_id', $customer->id)->first();
        if ($request->file('id_card')) {
            if ($customer->id_card && file_exists(storage_path('app/public/' . $customer->id_card))) {
                unlink(storage_path('app/public/' . $customer->id_card));
            }
        }
        if ($request->file('house_photo')) {
            if ($customer->house_photo && file_exists(storage_path('app/public/' . $customer->house_photo))) {
                unlink(storage_path('app/public/' . $customer->house_photo));
            }
        }
        try {
            if ($customer->id_card && $customer->house_photo && $request->file('id_card') && $request->file('house_photo') && file_exists($customer->id_card) && file_exists($customer->house_photo)) {
                unlink($customer->id_card);
                unlink($customer->house_photo);
            }
            if ($request->file('id_card')) {
                $validateData['id_card'] =  $request->file('id_card')->store('id_card', 'public');
            }
            if ($request->file('house_photo')) {
                $validateData['house_photo'] =  $request->file('house_photo')->store('house_photo', 'public');
            }
            $customer->update($validateData);
            $subscription->update(['package_id' => $request->package_id]);
            return $this->successResponse($customer, 'Customer updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update customer', 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        try {
            $subscription = Subscription::where('customer_id', $customer->id)->first();
            $subscription->delete();
            $filesToDelete = [
                $customer->id_card,
                $customer->house_photo,
            ];
            foreach ($filesToDelete as $file) {
                $filePath = storage_path('app/public/' . $file);

                if ($file && file_exists($filePath)) {
                    unlink($filePath);
                }
            }
            $customer->delete();
            return $this->successResponse(null, 'Customer deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete customer', 409);
        }
    }
}
