<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Notification;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $query = Activity::query();

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $activities = $query->orderBy('date_activite', 'desc')->get();
        return response()->json($activities);
    }
  

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string',
            'duree' => 'required|integer',
            'calories_brulees' => 'required|numeric',
            'date_activite' => 'required|date',
        ]);

        $activity = Activity::create($validated);

        // 🔔 Créer une notification liée à l'activité
        Notification::create([
            'user_id' => $activity->user_id,
            'type' => 'rappel_activite',
            'message' => "Vous avez une activité prévue : {$activity->type} le {$activity->date_activite}",
            'etat' => false,
            'date_envoi' => $activity->date_activite,
        ]);

        return response()->json($activity, 201);
    }



    public function show($id)
    {
        $activity = Activity::find($id);
        if (!$activity) return response()->json(['message' => 'Activité non trouvée'], 404);
        return response()->json($activity, 200);
    }

    public function update(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) return response()->json(['message' => 'Activité non trouvée'], 404);

        $activity->update($request->all());
        return response()->json($activity, 200);
    }

    public function destroy($id)
    {
        $activity = Activity::find($id);
        if (!$activity) return response()->json(['message' => 'Activité non trouvée'], 404);
        $activity->delete();
        return response()->json(['message' => 'Activité supprimée'], 200);
    }
}
