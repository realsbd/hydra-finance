
$(document).ready(function() {

    console.log('Hyphen Loaded')

    $('.choice').on('click', function (e) {
        e.preventDefault();

        console.log('Radio Next')

        $(this).find('input[type=radio]').prop("checked", true);
        var selected  = $(this).find('input[type=radio]:checked').val();
        var text      = $(this).text();
        text = text.trim();
        console.log("TEXT: " + text);
        $.ajax( {
          type: "POST",
          url: $( '#form_step' ).attr( 'action' ),
          data: $( '#form_step' ).serialize() + '&HumanOption=' + text,
          success: function( response ) {
            var obj = jQuery.parseJSON( response );
            window.location.href = obj.redir;
          }
        });

    });

    $('.select_choice').on('change', function (e) {
        e.preventDefault();

        console.log('Select Next')

        text = $('.select_choice option:selected').text();
        console.log(text);
        
        console.log()
        $.ajax( {
          type: "POST",
          url: $( '#form_step' ).attr( 'action' ),
          data: $( '#form_step' ).serialize() + '&HumanOption=' + text,
          success: function( response ) {
            var obj = jQuery.parseJSON( response );
            window.location.href = obj.redir;
          }
        });

    });

    $('#generic_next').on('click', function (e) {
        e.preventDefault();

        console.log('Generic Next')

        $.ajax( {
          type: "POST",
          url: $( '#form_step' ).attr( 'action' ),
          data: $( '#form_step' ).serialize(),
          success: function( response ) {
            var obj = jQuery.parseJSON( response );
            window.location.href = obj.redir;
          }
        });

    });

});
