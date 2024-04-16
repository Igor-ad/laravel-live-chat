<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\TestInitTrait;

class ChatControllerTest extends TestCase
{
    use RefreshDatabase, TestInitTrait;

    public function testCreate(): void
    {
        $this->init();

        $view = $this->actingAs($this->user, 'web')
            ->get(route('chats.create', absolute: false))->assertOk();

        $view->assertSee(__('Create a new chat'));
    }

    public function testIndex(): void
    {
        $this->init();

        $view = $this->actingAs($this->user, 'web')
            ->get(route('chats.index', absolute: false))->assertOk();

        $view->assertSee(__('Chats'));
    }

    public function testDestroy(): void
    {
        $this->init();
        $this->actingAs($this->user, 'web');

        $response = $this->delete(route('chats.delete', $this->chat->getAttribute('id'), absolute: false));
        $response->assertRedirectToRoute('chats.index');
    }

    public function testShow(): void
    {
        $this->init();

        $view = $this->actingAs($this->user, 'web')
            ->get(route('chats.box', $this->chat->getAttribute('id'), absolute: false))->assertOk();

        $view->assertSee(__('You are logged in chat'));
    }

    public function testStore(): void
    {
        $this->userInit();
        $this->actingAs($this->user, 'web');

        $data = [
            'name' => fake()->title(),
            'status' => 'public',
            'user_id' => (int)$this->user->getAttribute('id'),
        ];

        $response = $this->post(route('chats.store', absolute: false), $data);
        $response->assertRedirectToRoute('chats.index');
    }
}
