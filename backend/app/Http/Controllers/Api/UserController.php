<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Liste tous les utilisateurs
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    // Crée un nouvel utilisateur
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'age' => 'required|integer',
            'poids' => 'required|numeric',
            'taille' => 'required|numeric',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => ($request->password),
            'age' => $request->age,
            'poids' => $request->poids,
            'taille' => $request->taille,
            'objectif_poids' => $request->objectif_poids ?? null,
            'role' => $request->role ?? 'utilisateur',
        ]);

        return response()->json($user, 201);
    }

    // Affiche un utilisateur spécifique
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        return response()->json($user, 200);
    }

    // Met à jour un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'Utilisateur non trouvé'], 404);

        $user->update($request->only(['name', 'email', 'age', 'poids', 'taille', 'objectif_poids', 'role']));

        if ($request->password) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        return response()->json($user, 200);
    }

    // Supprime un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé'], 200);
    }
}
