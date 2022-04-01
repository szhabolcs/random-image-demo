$(document).ready(function() {

    function appendImages(photo) {
        var description = photo.description;

        if (description == null) {
            description = "no description";
        }
        $("#result").append(`
            <div class="image">
                <div class="image-wrapper">
                    <img src="${photo.urls.regular}"/>
                    <button data-id="${photo.id}" data-liked="false" class="heart"><i class="fa-solid fa-heart"></i></button>
                </div>
                <ul>
                    <li> likes: ${photo.likes} </li>
                    <li> description: ${description} </li>
                </ul>
            </div>
            `);
    }

    $("#load").click(function() {
        var pageNr = Math.floor(Math.random() * 50);

        var url = "https://api.unsplash.com/photos?page=" + pageNr + "&client_id=WWtERCl5QsRxo5CAVVVnQGGG__GVhFrmpG0KBF-zyKI";

        $("#result").empty();

        $.ajax({
            method: 'GET',
            url: url,
            success: function(data) {
                data.forEach(photo => {
                    appendImages(photo);
                });
            }
        });

    });

    $("#search").click(function() {
        var pageNr = Math.floor(Math.random() * 50);

        var search = $("#searchbar").val();

        var url = "https://api.unsplash.com/search/photos?page=" + pageNr + "&query=" + search + "&client_id=WWtERCl5QsRxo5CAVVVnQGGG__GVhFrmpG0KBF-zyKI";

        $("#result").empty();
        $.ajax({
            method: 'GET',
            url: url,
            success: function(data) {
                data.results.forEach(photo => {
                    appendImages(photo);
                });
            }
        });

    });

    function postLikedImage(button) {

        var id = button.attr("data-id");
        var liked = button.attr("data-liked");

        if (liked == "false") {
            button.css("color", "red");
            button.attr("data-liked", "true");
            var url = "http://localhost:8080/like/" + id;
            $.ajax({
                method: 'POST',
                url: url,
                success: function() {
                    console.log('succes!');
                }
            })
        } else {
            button.attr("data-liked", "false");
            button.css("color", "white");
            var url = "http://localhost:8080/unlike/" + id;
            $.ajax({
                method: 'POST',
                url: url,
                success: function() {
                    console.log('succes!');
                }
            })
        }
    }

    $("#result").on("dblclick", ".image-wrapper", function(e) {
        let child = $(e.currentTarget);
        child = $(child.children(".heart")[0]);
        postLikedImage(child);
    })

    $("#result").on("click", ".heart", function(e) {
        let button = $(e.currentTarget);
        postLikedImage(button);
    });

});