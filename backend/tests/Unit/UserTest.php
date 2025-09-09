<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    public function test_user_can_be_created()
    {
        $user = new User();
        $user->name = "Test User";
        $user->email = "test@example.com";
        $user->password = "password123";

        $this->assertEquals("Test User", $user->name);
        $this->assertEquals("test@example.com", $user->email);
        $this->assertEquals("password123", $user->password);
    }
}
