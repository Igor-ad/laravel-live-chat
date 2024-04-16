<x-app-layout>

    @slot('header')

        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Chat') }}
        </h2>

    @endslot

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">{{ __('Home') }}</div>
                    <div class="card-body">

                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        {{ __('You are logged in chat') }}

                    </div>
                    <div class="container">
                        <div id="main"
                             data-user="{{ json_encode($user) }}"
                             data-chat="{{ json_encode($chat) }}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
