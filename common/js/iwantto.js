$( document ).ready(function() {

    $(document).on('mouseenter', '.interests', function () {
         $(this).next('div.interests-overlay').show();
    })
    .on('mouseleave', '.interests', function () {
        $(this).next('div.interests-overlay').hide();
    });

});

