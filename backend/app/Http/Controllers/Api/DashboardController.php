<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Meal;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id'); // ou $request->user()->id si tu utilises Sanctum
        $today = Carbon::today();

        // Activités
        $futureActivities = Activity::where('user_id', $userId)
            ->whereDate('date_activite', '>=', $today)
            ->orderBy('date_activite', 'asc')
            ->get();

        $pastActivities = Activity::where('user_id', $userId)
            ->whereDate('date_activite', '<', $today)
            ->orderBy('date_activite', 'desc')
            ->get();

        // Repas
        $futureMeals = Meal::where('user_id', $userId)
            ->whereDate('date_repas', '>=', $today)
            ->orderBy('date_repas', 'asc')
            ->get();

        $pastMeals = Meal::where('user_id', $userId)
            ->whereDate('date_repas', '<', $today)
            ->orderBy('date_repas', 'desc')
            ->get();

        return response()->json([
            'activities' => [
                'future' => $futureActivities,
                'past' => $pastActivities,
            ],
            'meals' => [
                'future' => $futureMeals,
                'past' => $pastMeals,
            ]
        ]);
    }
}
