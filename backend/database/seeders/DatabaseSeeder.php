<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Activity;
use App\Models\Meal;
use App\Models\Notification;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 1; $i <= 10; $i++) {
            // --- Utilisateur ---
            $user = User::create([
                'name' => $faker->name,
                'email' => "user{$i}@example.com",
                'password' => 'password123', // mot de passe en clair
                'age' => $faker->numberBetween(18, 60),
                'poids' => $faker->randomFloat(1, 50, 100),
                'taille' => $faker->numberBetween(150, 200),
                'objectif_poids' => $faker->randomFloat(1, 50, 90),
                'role' => 'utilisateur',
            ]);

            // --- Activités ---
            for ($j = 0; $j < 2; $j++) {
                Activity::create([
                    'user_id' => $user->id,
                    'type' => $faker->randomElement(['Marche', 'Course', 'Musculation', 'Natation']),
                    'duree' => $faker->numberBetween(20, 90),
                    'calories_brulees' => $faker->numberBetween(100, 600),
                    'date_activite' => $faker->date(),
                ]);
            }

            // --- Repas ---
            for ($k = 0; $k < 2; $k++) {
                Meal::create([
                    'user_id' => $user->id,
                    'description' => $faker->sentence(3),
                    'calories' => $faker->numberBetween(200, 800),
                    'date_repas' => $faker->date(),
                ]);
            }

            // --- Notifications ---
            for ($n = 0; $n < 1; $n++) {
                Notification::create([
                    'user_id' => $user->id,
                    'type' => $faker->randomElement(['rappel_activite', 'rappel_repas']),
                    'message' => $faker->sentence(),
                    'etat' => $faker->boolean(50),
                    'date_envoi' => $faker->dateTimeThisMonth(),
                ]);
            }
        }
    }
}





