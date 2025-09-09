<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Vérification sans hash (mot de passe en clair en base)
        if (!$user || $request->password !== $user->password) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        return response()->json([
            'user' => $user,
            'message' => 'Connexion réussie'
        ]);
    }
}









