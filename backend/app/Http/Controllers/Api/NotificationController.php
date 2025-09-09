<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    // Liste toutes les notifications
     public function index(Request $request)
        {
            // Récupère l'utilisateur connecté via le token ou via un paramètre user_id
            $userId = $request->query('user_id'); // depuis ?user_id=...
            
            if (!$userId) {
                return response()->json(['error' => 'Utilisateur non spécifié'], 400);
            }

            // Récupère uniquement les notifications de cet utilisateur
            $notifications = Notification::where('user_id', $userId)
                            ->orderBy('date_envoi', 'desc')
                            ->get();

            return response()->json($notifications);
        }


    // Crée une nouvelle notification
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string',
            'message' => 'required|string',
            'etat' => 'required|boolean',
            'date_envoi' => 'required|date',
        ]);

        $notification = Notification::create($request->all());
        return response()->json($notification, 201);
    }

    // Affiche une notification spécifique
    public function show($id)
    {
        $notification = Notification::find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);
        return response()->json($notification, 200);
    }

    // Met à jour une notification
    public function update(Request $request, $id)
    {
        $notification = Notification::find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);

        $notification->update($request->all());
        return response()->json($notification, 200);
    }

    // Supprime une notification
    public function destroy($id)
    {
        $notification = Notification::find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);
        $notification->delete();
        return response()->json(['message' => 'Notification supprimée'], 200);
    }
}
