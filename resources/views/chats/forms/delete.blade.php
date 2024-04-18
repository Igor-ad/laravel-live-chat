<form method="post" action="{{ route('chats.delete', [$chat->id]) }}">
    @csrf

    @method('delete')
    <button class="btn btn-link" type="submit">{{ __('del') }}</button>
</form>
