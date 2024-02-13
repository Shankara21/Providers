<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;;

use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Package;
use App\Traits\ApiResponse;

class PackageController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->successResponse(Package::all(), 'Packages retrieved successfully');
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
     * @param  \App\Http\Requests\StorePackageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePackageRequest $request)
    {
        $validateData = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        try {
            $package = Package::create($validateData);
            return $this->successResponse($package, 'Package created successfully', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create package', 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function show(Package $package)
    {
        return $this->successResponse($package, 'Package retrieved successfully');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function edit(Package $package)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePackageRequest  $request
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePackageRequest $request, Package $package)
    {
        $validateData = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        try {
            $package->update($validateData);
            return $this->successResponse($package, 'Package updated successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update package', 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function destroy(Package $package)
    {
        try {
            $package->delete();
            return $this->successResponse(null, 'Package deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete package', 409);
        }
    }
}
