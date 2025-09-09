<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_user_api(): void
    {
        $response = $this->postJson('/api/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'age' => 30,
            'poids' => 70,
            'taille' => 175,
            'objectif_poids' => 65,
            'role' => 'utilisateur',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'id', 'name', 'email', 'age', 'poids', 'taille', 'objectif_poids', 'role', 'created_at', 'updated_at',
                 ]);
    }
}
