<x-app-layout>

    @slot('header')

        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('New chat') }}
        </h2>

    @endslot

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">{{ __('Create a new chat') }}</div>
                    <div class="card-body">

                        @include('chats.forms.create')

                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
