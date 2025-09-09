<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meal;
use App\Models\Notification;

class MealController extends Controller
{
    // Liste tous les repas
   public function index(Request $request)
    {
        $query = Meal::query();

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        return response()->json($query->get());
    }


    // Crée un nouveau repas
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'description' => 'required|string',
            'calories' => 'required|numeric',
            'date_repas' => 'required|date',
        ]);

        $meal = Meal::create($validated);

        // 🔔 Créer une notification liée au repas
        Notification::create([
            'user_id' => $meal->user_id,
            'type' => 'rappel_repas',
            'message' => "N'oubliez pas votre repas prévu le {$meal->date_repas}",
            'etat' => false,
            'date_envoi' => $meal->date_repas,
        ]);

        return response()->json($meal, 201);
    }

    // Affiche un repas spécifique
    public function show($id)
    {
        $meal = Meal::find($id);
        if (!$meal) return response()->json(['message' => 'Repas non trouvé'], 404);
        return response()->json($meal, 200);
    }

    // Met à jour un repas
    public function update(Request $request, $id)
    {
        $meal = Meal::find($id);
        if (!$meal) return response()->json(['message' => 'Repas non trouvé'], 404);

        $meal->update($request->all());
        return response()->json($meal, 200);
    }

    // Supprime un repas
    public function destroy($id)
    {
        $meal = Meal::find($id);
        if (!$meal) return response()->json(['message' => 'Repas non trouvé'], 404);
        $meal->delete();
        return response()->json(['message' => 'Repas supprimé'], 200);
    }
}
