<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ApiResponse;
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $user = User::where('email', $validated['email'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return $this->errorResponse('Invalid credentials', 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return $this->successResponse(['token' => $token], 'User logged in successfully');
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->successResponse([], 'User logged out successfully');
    }
    public function user(Request $request)
    {
        $user = $request->user();
        $user->role;
        return $this->successResponse($user, 'Authenticated user');
    }
    // public function register(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email|unique:users,email',
    //         'password' => 'required|confirmed'
    //     ]);
    //     $validated['password'] = Hash::make($validated['password']);
    //     $user = User::create($validated);
    //     $token = $user->createToken('auth_token')->plainTextToken;
    //     return $this->successResponse(['token' => $token], 'User registered successfully');
    // }
}
