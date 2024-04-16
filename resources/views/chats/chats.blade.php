<x-app-layout>

    @slot('header')

        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Chat list') }}
        </h2>

    @endslot

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">{{ __('Chats') }}</div>
                    <div class="card-body">

                        @include('chats.tables.allowed-chat')

                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
