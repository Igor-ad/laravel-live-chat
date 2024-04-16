<form class="row g-3" method="post" action="{{ route('chats.store') }}">
    @csrf
    <div class="col-md-5">
        <input class="form-control" type="text" name="name" placeholder="{{ __('Name') }}">
    </div>
    <div class="col">
        <select class="form-select" name="status" aria-label="{{ __('status') }}">
            <option value="private">private</option>
            <option value="public">public</option>
        </select>
    </div>
    <div class="col-md-5">
        <button class="btn btn-link" type="submit">{{ __('save') }}</button>
    </div>
</form>
