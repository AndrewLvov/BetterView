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
                let sliderValue =  ui.value;
                let sliderHandle = $(ui.handle);
                let comment = handle.parent().parent().parent();
                let background = null;
                if (sliderValue < 0) {
                    background = "red";
                    if(sliderValue < -2){
                        comment.fadeOut(1000);
                    }
                } else if (sliderValue > 0) {
                    if (sliderValue > 0 && sliderValue < 3) {
                        background = "yellow";
                    } else if (sliderValue >= 3 && sliderValue <= 4) {
                        background = "orange";
                    } else if (sliderValue > 4) {
                        background = "green";
                    }
                }else {
                    background = "white";
                }
                sliderHandle.css("background", background);
                sliderHandle.parent().css("background", background);
                if(sliderValue > 0){
                    comment.css({
                        border: sliderValue +"px solid " + background,
                    });
                }else {
                    comment.css({
                        border: -sliderValue +"px solid " + background,
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
        $.ajax({url: "http://127.0.0.1:5000/graphql",
                  contentType: "application/json",type:'POST',
                  data: JSON.stringify({ query:`{allUsers}`,
                  }),
                  success: function(result) {
                     console.log(JSON.stringify(result.data))
                  }
               });
    });
    console.log(users);
});