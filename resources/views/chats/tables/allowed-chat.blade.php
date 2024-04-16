<table id="t1" class="table table-condensed table-striped">
    <thead>
    <tr>
        <th>{{ __('name') }}</th>
        <th>{{ __('status') }}</th>
        <th>{{ __('select') }}</th>
        <th>{{ __('delete') }}</th>
    </tr>
    </thead>
    <tbody>
    @forelse($allowedChats as $chat)
        <tr>
            <td>{{ $chat->name }}</td>
            <td>{{ $chat->status }}</td>
            <td><a type="button" class="btn btn-link"
                   href="{{ route('chats.box', [$chat->id]) }}">{{ __('go') }}</a>
            </td>
            <td><a type="button" class="btn btn-link"
                   href="{{ route('chats.delete', [$chat->id]) }}">{{ __('del') }}</a>
            </td>
        </tr>
    @empty
        <h5>{{ __('chat.empty') }}</h5>
    @endforelse
    </tbody>
</table>
