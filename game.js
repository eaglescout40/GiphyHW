var topicsObjArray = [
    {
        name: "I'll be back",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "I have a bad feeling about this",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "Mary Poppins",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "Do ya feel lucky, punk?",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "As you wish",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "Scruffy looking nerf herder",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },
    {
        name: "I feel the need",
        currentState: "data-still",
        imageStill: "",
        imageAnimate: ""
    },

];

var log = console.log;

var imageStill = "";
var imageAnimate = "";

// create funciton to create buttons
function createButtons() {

    $("#gameButtons").empty();

    for (var i = 0; i < topicsObjArray.length; i++) {
        var btn = $("<button>");

        btn.addClass("btn btn-info game-buttons");

        btn.text(topicsObjArray[i].name);

        btn.attr("data-character", topicsObjArray[i].name);

        $("#gameButtons").append(btn);
    }
}

createButtons();

$("#addCharacter").on("click", function (event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var character = $("#character-input").val().trim();

    // Adding the movie from the textbox to our array
    var obj = { name: character, currentState: "data-still", imageStill: "", imageAnimate: "" };

    topicsObjArray.push(obj);

    // Calling createButtons which handles the processing of our array
    createButtons();

});

// this function will display the gifs
function displaygames() {

    var p_game = $(this).attr("data-character");
    //console.log("p_game: "+p_game);

    // variable url
    var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38&q=" + p_game + "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
        url: giphyUrl,
        method: "GET"
    })
        .then(function (response) {
            // in this function we are going to get data from giphyUrl.
            var results = response.data;

            console.log(results);
            //console.log($(this).attr("data-character"));
            log("rating : " + results[0].rating);

            //clear any previous images
            $(".images").empty();

            for (var j = 0; j < results.length; j++) {
                if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                    var gameImage = $("<img>");

                    gameImage.attr("src", results[j].images.fixed_height_still.url);
                    gameImage.attr("data-state", "data-still");

                    log("index : " + topicsObjArray.indexOf(p_game));

                    //imgObjArray[imgObjArray.indexOf(p_game)].imageStill = results[j].images.fixed_height_still.url;
                    gameImage.attr("data-still", results[j].images.fixed_height_still.url);
                    gameImage.attr("data-animate", results[j].images.fixed_height.url);
                    gameImage.attr("id", p_game);
                    gameImage.addClass("images");

                    $(".images").prepend(gameImage);
                }
            }
        })
}

function imageClick() {
    var currentImage = ($(this));

    var currentStateAttr = $(this).attr("data-state");

    //var currentStateAttr = $("#Cinderella").attr("data-state");

    log("currentStateAttr : " + currentStateAttr);

    imageStill = currentImage.attr("data-still");//,results[j].images.fixed_height_still.url);
    imageAnimate = currentImage.attr("data-animate");//,results[j].images.fixed_height.url);

    if (currentStateAttr == "data-still") {
        currentImage.attr("src", $(this).attr("data-animate"));
        currentImage.attr("data-state", "data-animate");
    } else {
        currentImage.attr("src", $(this).attr("data-still"));
        currentImage.attr("data-state", "data-still");
    }

}

$(document).on("click", ".game-buttons", displaygames);
$(document).on("click", ".images", imageClick);
