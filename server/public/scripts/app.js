$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            $.each(data.people, function(i, person) {
                $('#peopleInfo').append('<li></li>');
                var $el = $('#peopleInfo').children().last();
                $el.append('<img src="' + person.imageURL + '" class="infoContent" />');
                $el.append('<h1 class="infoContent">' + person.name + '</h1>');
                $el.append('<p class="infoContent">' + person.favoriteMovie1 + '</p>');
                $el.append('<p class="infoContent">' + person.favoriteMovie2 + '</p>');
                $el.append('<p class="infoContent">' + person.favoriteSong + '</p>');
            });

            var change_img_time = 10000,
                transition_speed = 500;


            var listItems = $('#peopleInfo').children('li');
            var dotItems = $('#dots').children('li');
            var listLength = listItems.length,
                current,
                changeTimeout;
            function moveTo(newIndex) {
                var i = newIndex;
                if (newIndex == 'prev') {
                    if (current > 0) {
                        i = current - 1;
                    } else {
                        i = listLength - 1;
                    }
                }

                if (newIndex == 'next') {
                    if (current < listLength - 1) {
                        i = current + 1;
                    } else {
                        i = 0;
                    }
                }

                dotItems.removeClass('active').eq(i).addClass('active');

                listItems.fadeOut(transition_speed).eq(i).fadeIn(transition_speed);

                current = i;

                clearTimeout(changeTimeout);
                changeTimeout = setTimeout(function() { moveTo('next'); }, change_img_time);
            }

            $("#dots li").click(function () {
                var i = $('#dots li').index(this);
                moveTo(i);
            });

            $("#prev").click(function () {
                moveTo('prev');
            });

            $("#next").click(function () {
                moveTo('next');
            });

            //initialize slider on load
            moveTo('next');





            //
                //$('#peopleContainer').on('click', '#show-kris', function() {
                //    $el.append('<h1>' + data.people[0].name + '</h1>');
                //});
            //});

            //$('.person').each(function(){
            //    if ( $(this).hasClass('active') ) {
            //        $(this).removeClass('active');
            //        $(this).addClass('changed');
            //    } else {
            //        $(this).addClass('active');
            //    }
            //});
            console.log(data.people[0]);
            console.log(data);
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}