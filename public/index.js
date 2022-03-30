$(document).ready(function() {

    $("#load").click(function() {
        var pageNr = Math.floor(Math.random() * 50);

        var url = "https://api.unsplash.com/photos?page=" + pageNr + "&client_id=WWtERCl5QsRxo5CAVVVnQGGG__GVhFrmpG0KBF-zyKI";

        $("#result").empty();

        $.ajax({
            method: 'GET',
            url: url,
            success: function(data) {
                data.forEach(photo => {
                    var description = photo.description;

                    if (description == null) {
                        description = "no description";
                    }
                    $("#result").append(`
                        <div class="image">
                            <img src="${photo.urls.regular}"/>
                            <button class="heart"><i class="fa fa-heart"></button>
                        </div>
                        <div>
                            <ul>
                                <li> likes: ${photo.likes} </li>
                                <li> description: ${description} </li>
                            </ul>
                        </div>
    
                        `);
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
                    var description = photo.description;

                    if (description == null) {
                        description = "no description";
                    }
                    $("#result").append(`
                        <div class="image">
                            <img src="${photo.urls.regular}"/>
                            <button class="heart"><i class="fa fa-heart"></button>
                        </div>
                        <div>
                            <ul>
                                <li> likes: ${photo.likes} </li>
                                <li> description: ${description} </li>
                            </ul>
                        </div>
    
                        `);
                });
            }
        });

    });

});