$(document).ready(function (){
    $("head").append("<link rel='stylesheet' href='/css/jquery-ui.min.css'>");
    let users = [];
    let comments = $(".comment");
    $('.bottom-line').css({
        paddingBottom:20+"px",
        paddingRight:20 +"px",
    })
    for (let i = 0; i < comments.length;i++){
        let user = {};
        $('.bottom-line').eq(i).append("<div class='slider-rating-max ' >" +
            "<div class='slider-handle ui-slider-handle'></div>" +
            "</div>");
        let slider = $(".slider-rating-max").eq(i);
        let handle = $('.slider-handle').eq(i);
        slider.slider({
            range: "max",
            min: -5,
            max: 5,
            value: 0,
            create: function() {
                handle.text($(this).slider("value"));
            },
            slide: function(event, ui) {
                handle.text(ui.value);
            }
        });

        user = {
            "name": $(".comment > .b-post-author > .avatar").eq(i).text().trim(),
            "text": $(".comment > .comment_text ").eq(i).text().trim(),
            "url": $(".comment > .b-post-author > .avatar").eq(i).attr("href"),
        }
        if(user["name"] === $(".comment > .b-post-author > .avatar").eq(i+1).text().trim()){
            user["text_2"] = $(".comment > .comment_text").eq(i+1).text().trim();
            i+=1;
            console.log(i);
        } 
      
        users.push(user);
        }
    $(".slider-rating-max").hover(function (){
        for(let j = 0 ;j < $(".slider-rating-max").length; j++ ) {

            let slider = $(".slider-rating-max").eq(j);
            let handle = $('.slider-handle').eq(j);
            let value = slider.slider("value");
            let comment = $(".comment").eq(j);
            if (value < 0) {
                handle.css({
                    background: "red",
                });
                slider.css({
                    background: "red",
                });
                comment.css('border', -value + 'px' + ' solid red');
            } else if (value > 0) {
                if (value > 0 && value < 3) {
                    handle.css({
                        background: "yellow",
                    });
                    slider.css({
                        background: "yellow",
                    });
                    comment.css('border', value + 'px' + ' solid yellow');
                } else if (value >= 3 && value <= 4) {
                    handle.css({
                        background: "orange",
                    });
                    slider.css({
                        background: "orange",
                    });
                    comment.css('border', value + 'px' + ' solid orange');
                } else if (value > 4) {
                    handle.css({
                        background: "green",
                    });
                    slider.css({
                        background: "green",
                    });
                    comment.css('border', value + 'px' + ' solid green');
                }
            }else {
                handle.css({
                    background: "white",
                    color:"black",
                });
                slider.css({
                    background: "white",
                });
                comment.css('border', value + 'px' + ' solid white');
            }
        }
        });

    console.log(users);
});