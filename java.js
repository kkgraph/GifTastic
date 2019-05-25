//setting up variables for the app 
var apiKey = "&api_key=zWqJqjkZpelOHK0IiehaQAUpD6QgF0Ks";
var buttonCategories = ["idk", "idgaf", "fml", "brb", "omg", "lol", "lmao", "wtf", "btw", "tbf", "tbh", "imo", "imho", "thx", "bye", "ikr", "fyi", "wcw", "stfu", "idc", "smdh"];
var genButtons = [];
var searchTerm;
var custom_buttonCategories = [];

//start the app functions 
$(document).ready(function() {

    //populations the buttons for gif search
    generatedButton(buttonCategories);
    $("#gif-div").hide();

    function generatedButton(inputarray) {
        //generates the buttons for the arrays
        for (var i = 0; i < inputarray.length; i++) {
            $("#button-div").append("<button id =" + "'" + "btn" + i + "'" + "class='btn btn-outline-success mx-1 my-1'" + ">" + buttonCategories[i] + "</button>");
            genButtons.push("btn" + i);
        }
    }
    //pulling the gif from related to button.
    $('#button-div').on('click', 'button', function() {
        cleargifs();
        searchTerm = $(this).text();
        genGif(searchTerm);
        $("#gif-div").show();
    });

    //adding to the Abbrev-div
    $('#addAbbrev-div').on('click', 'button', function() {
        var custom_searchTerm = $("#abbrev-text").val().trim();
        var test = $("<button>" + custom_searchTerm + "</button>");
        $("#button-div").append(test);
    });

    //freezing/restart function for gif 
    $('#gif-div').on('click', 'img', function() {
        //get the gif's source url 
        var gifSrc = $(this).attr("src");
        //is the gif playing? stop the gif then
        if ($(this).hasClass('playing')) {
            //change url to retrieve a freeze frame.
            $(this).attr('src', gifSrc.replace(/\_s.gif/i, ".gif"));
            $(this).removeClass('playing');
        }
        //replay the gif 
        else {
            //find the url to replay the gif 
            $(this).addClass('playing');
            $(this).attr('src', gifSrc.replace(/\.gif/i, "_s.gif"));

        }
    });

    //generated the gif 
    //API HERE 
    function genGif(queryString) {
    //take the input and search for related gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryString + apiKey;
        var gifurl;
    //AJAX STARTS
        $.ajax({
            url: queryURL,
            method: "GET"
    //gif response function & adding ratting below gif
        }).then(function(gif_responce) {
            for (var g = 0; g < gif_responce.data.length; g++) {
                console.log(gif_responce.data[g]);
                gifurl = gif_responce.data[g].images.fixed_height.url;
                var gif = $("<img>").attr("src", gifurl);
                var p = $("<p>").text("Rating: " + gif_responce.data[g].rating);
                var gifhtml = ("<div class='col-sm-4 py-1'>" + "<img src=" + "'" + gifurl + "'" + "alt='gif'" + ">" + "</img>" + "<p> " + "Rating: " + gif_responce.data[g].rating + "</p>" + "</div>");
                $(gifhtml).addClass('playing'); 
                $("#gif-div").append(gifhtml); 
            }
        });
    }

    //clears it out afterwards
    function cleargifs() {
        $("#gif-div").empty();
    }

});