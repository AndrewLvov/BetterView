$(document).ready(function (){
    $("head").append("<link rel='stylesheet' href='/css/jquery-ui.min.css'>");
    let users = [];
    let comments = $(".comment");
    $('.bottom-line').css({
        paddingBottom:40+"px",
        paddingRight:20 +"px",
    })
    $('.bottom-line').append("<div class='slider-rating-max'>" +
        "<div class='slider-handle ui-slider-handle'></div>" +
        "</div>");
    for (let i = 0; i < comments.length;i++) {
        let user = {};
        let rating = 0;
        let slider = $(".slider-rating-max").eq(i);
        let handle = $('.slider-handle').eq(i);
        slider.slider({
            range: "max",
            min: -5,
            max: 5,
            value: 0,
            create: function () {
                handle.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                handle.text(ui.value);
            }
        });
        $(".b-post-author").eq(i).append("<span><b>Рейтинг:"+ rating +"</b></span>");
        user = {
            "name": $(".comment > .b-post-author > .avatar").eq(i).text().trim(),
            "text": $(".comment > .comment_text ").eq(i).text().trim(),
            "url": $(".comment > .b-post-author > .avatar").eq(i).attr("href"),
        }
        if (user["name"] === $(".comment > .b-post-author > .avatar").eq(i + 1).text().trim()) {
            user["text_2"] = $(".comment > .comment_text").eq(i + 1).text().trim();
            i += 1;
            console.log(i);
        }
        users.push(user);
        if (slider.slider("value") < -2) {
            $(".comment").eq(i).hide(1000);
        }
    }

    $( ".slider-rating-max" ).slider({
        change: function( event, ui ) {
            let value =  ui.value;
            let handle = $(ui.handle);
            let comment = handle.parent().parent().parent();
            let background = "";
            if (value < 0) {
                background = "red";
            } else if (value > 0) {
                if (value > 0 && value < 3) {
                    background = "yellow";
                } else if (value >= 3 && value <= 4) {
                    background = "orange";
                } else if (value > 4) {
                    background = "green";
                }
            }else {
                background = "white";
            }
            if(value < -2){
                comment.hide(1000);
            }
            if(background != ""){
                handle.css("background", background);
                handle.parent().css("background", background);
                let string_border = value + " solid " + background;
                comment.css({
                    border: string_border,
                });
            }

        }
    });
    $(".bottom-line").append("<div class='send-rating-button'>Оцінити</div>");
    $(".send-rating-button").button().css({
        borderRadius: 20 + "px",
        marginLeft: "45%",
        marginTop:"20px",
        width: "100px",
        fontSize: "10pt",
    });
    $(".send-rating-button").click(function (e, obj) {
        $(this).hide(1000);
        $(this).parent().find($(".slider-rating-max")).hide(1000);
    });


    console.log(users);
});