$(document).ready(function () {
    $('#quote-carousel').carousel({
        pause: true,
        interval: 6000,
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //carrousel js
    $('#myCarousel').carousel({
        interval: 4000
    })
    $('.fdi-Carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        var next2 = next.next();
        if (!next2.length) {
            next2 = $(this).siblings(':first');
        }
        next2.children(':first-child').clone().appendTo($(this));

        var next3 = next2.next();
        if (!next3.length) {
            next3 = $(this).siblings(':first');
        }
        next3.children(':first-child').clone().appendTo($(this));
    });
    //end carrousel js
    $(document).keypress(function (e) {
        if (e.which == 13 && $("#txtPregunta").is(":focus")) {
            $('.busqueda').click();
        }
    });
});