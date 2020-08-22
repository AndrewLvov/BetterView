$(document).ready(function (){
    let users = [];
    let comments = $(".comment");
    for (let i = 0; i < comments.length;i++){
        let user = {};
        user = {
            "name": $(".comment > .b-post-author > .avatar ").eq(i).text().trim(),
            "text": $(".comment > .comment_text ").eq(i).text().trim(),
        }
        if(user["name"] === $(".comment > .b-post-author > .avatar ").eq(i+1).text().trim()){
            user["text_2"] = $(".comment > .comment_text").eq(i+1).text().trim();
            i+=1;
            console.log(i);
        }

        users.push(user);
    }
    console.log(users);
});