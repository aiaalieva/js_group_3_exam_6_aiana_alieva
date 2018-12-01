$(function () {
    var container = $('.container');
    var send = $('.send');
    var post = $('#input-message');
    var newsfeed = $('.newsFeed');
    var followBtn = $('.follow');
    var profile = $('.profileName');
    var editfirstName = $('.firstName');
    var editlastName = $('.lastName');
    var saveProfileChanges = $('.remodal-confirm');


    var getProfile = function () {
        return $.ajax({
            method: 'GET',
            url: 'http://146.185.154.90:8000/blog/inalieva.a@gmail.com/profile'
        });
    };

    var displayProfile = function (response) {
        var name = response.firstName;
        var lastName = response.lastName;
        console.log(response);
        return profile.text(name + ' ' + lastName);
    };

    var editProfile = function () {
        saveProfileChanges.on('click', function () {
            if (editlastName.val() === '' && editfirstName.val() === '') {
                alert('Fields can\'t be empty');
            } else {
                return $.post('http://146.185.154.90:8000/blog/inalieva.a@gmail.com/profile', {
                    firstName: editfirstName.val(),
                    lastName: editlastName.val()
                }).then(refreshPage);
            }
        })
    };

    var refreshPage = function () {
        window.location.reload();
    };

    var getPosts = function () {
        return $.ajax({
            method: 'GET',
            url: 'http://146.185.154.90:8000/blog/inalieva.a@gmail.com/posts'
        });
    };

    var showNewsfeed = function (response) {
        console.log(response);
        for(var i = 0; i < response.length; i++) {
            var name = response[i].user.firstName;
            var lastName = response[i].user.lastName;
            var posts = response[i].message;
            var postBlock = $('<div class="postBlock">');
            postBlock.html(name + ' ' + lastName + ' said: <br>' + posts + '<br>' + response[i].datetime);
            newsfeed.prepend(postBlock)
        }
    };

    // var setLoopInterval = function () {
    //     setInterval(function () {
    //
    //     }, 2000);
    // };

    // var createPost = function(){
    //     send.on('click', function () {
    //         return $.post('http://146.185.154.90:8000/blog/inalieva.a@gmail.com/posts', {
    //             message: post.val()
    //         });
    //     })
    //
    // };

    getProfile()
        .then(displayProfile)
        .then(editProfile)
        .then(getPosts)
        .then(showNewsfeed)

    // .then(createPost)



//
//     var sendMessage = function(){
//         return $.post('http://146.185.154.90:8000/messages', {
//             author: author.val(),
//             message: message.val()
//         });
//     };
//
//     var interval = function () {
//         setInterval(function () {
//             getCurrentChat()
//                 .then(showChats)
//         }, 2000);
//     };
//
//     getCurrentChat()
//         .then(showChats)
//         .then(interval);
//
//
//     send.on('click', function () {
//         sendMessage();
//
//     });
//
});