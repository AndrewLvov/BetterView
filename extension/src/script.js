$(document).ready(function (){
    $("head").append("<link rel='stylesheet' href='/css/jquery-ui.min.css'>");
    let users = [];
    let comments = $(".comment");
    $(".bottom-line").append("<div class='show_comment'>Вернути</div>");
    $(".show_comment").fadeOut().button();
    $('.bottom-line').append("<div class='slider-rating-max'>" +
        "<div class='slider-handle ui-slider-handle'></div>" +
        "</div>");

    for (let i = 0; i < comments.length;i++) {
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
            },
            change: function( event, ui ) {
                let slider_value =  ui.value;
                let slider_handle = $(ui.handle);
                let comment = handle.parent().parent().parent();
                let background = null;
                if (slider_value < 0) {
                    background = "red";
                    if(slider_value < -2){
                        comment.fadeOut(1000);
                    }
                } else if (slider_value > 0) {
                    if (slider_value > 0 && slider_value < 3) {
                        background = "yellow";
                    } else if (slider_value >= 3 && slider_value <= 4) {
                        background = "orange";
                    } else if (slider_value > 4) {
                        background = "green";
                    }
                }else {
                    background = "white";
                }
                slider_handle.css("background", background);
                slider_handle.parent().css("background", background);
                if(slider_value > 0){
                    comment.css({
                        border: slider_value +"px solid " + background,
                    });
                }else {
                    comment.css({
                        border: -slider_value +"px solid " + background,
                    });
                }

            }
        });
        let rating = 0;
        $(".b-post-author").eq(i).append("<span><b>Рейтинг:"+ rating +"</b></span>");
       let user = {
            "name": $(".comment > .b-post-author > .avatar").eq(i).text().trim(),
            "text": $(".comment > .comment_text ").eq(i).text().trim(),
            "url": $(".comment > .b-post-author > .avatar").eq(i).attr("href"),
        }
        if (user["name"] === $(".comment > .b-post-author > .avatar").eq(i + 1).text().trim()) {
            user["text_2"] = $(".comment > .comment_text").eq(i + 1).text().trim();
            i += 1;
        }
        users.push(user);
        if (slider.slider("value") < -2) {
            $(".comment").eq(i).fadeOut(1000);
        }
    }
    $(".bottom-line").append("<div class='send-rating-button'>Оцінити</div>");
    $(".send-rating-button").click(function (e, obj) {
        $(this).fadeOut(1000);
        $(this).parent()
            .find($(".slider-rating-max"))
            .fadeOut(1000);
        $(this).parent()
            .find($(".show_comment"))
            .fadeIn(2000);
    }).button();
    $(".show_comment").click(function (){
        $(this).fadeOut(1000);
        $(this).parent()
            .find($(".show_comment"))
            .fadeOut(1000);
        $(this).parent()
            .find($(".slider-rating-max , .send-rating-button"))
            .fadeIn(2000);
    });
    console.log(users);
});