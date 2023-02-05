<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): \Illuminate\Http\JsonResponse {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json([
            'message' => 'Your life just got busier. Congratulations.',
            'user' => $user,
        ], 201);
    }

    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse {
        if (Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Welcome aboard! You\'re now logged in and ready to navigate the stormy waters of your responsibilities.',
                'user' => Auth::user(),
            ], 201);
        }

        return response()->json([
            'message' => 'Incorrect credentials, try again or give up entirely.'
        ], 403);
    }

    public function logout(Request $request): \Illuminate\Http\JsonResponse {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Finally getting some peace, huh?'
        ], 200);
    }
}
