(function() {
    $('.ajax-filter-form').on('submit', function filter(e) {
        e.preventDefault()
        var viewport_class = $(this).data('viewport')
        var url = $(this).data('url')
        $.get(url, $(this).serialize(), function(resp) {
            $('.' + viewport_class).html(resp)
        })
    })
})($)