$(document).ready(function (){
    let users = [];
    let comments = $(".comment");
    for (let i = 0; i < comments.length;i++){
        let user = {};
        user = {
            "name": $(".comment > .b-post-author > .avatar ").eq(i).text().trim(),
        }
        users.push(user);
    }
    console.log(users);
});