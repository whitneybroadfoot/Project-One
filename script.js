var newsAPIKey = "95c29dd3111340239464a2b485373828";
var newsURL = "https://newsapi.org/v2/everything?q=dog+puppy&apiKey=" + newsAPIKey;

$.ajax({
    url: newsURL,
    method: "GET"
})
.then(function(response) {
   
    for(var i = 0; i < 6; i++){
        //create a tile with the image from each article and the article title and display on the page
        var article = $('<div>');
        article.attr("class", "column is-one-third");

        var urlLink = $('<a>');
        console.log("Article URL: " + response.articles[i].url);
        var articleURL = response.articles[i].url;
        urlLink.attr("href", articleURL);


        var articleImage = $('<img>');
        console.log("Article Image URL: " + response.articles[i].urlToImage);
        var articleImageURL = response.articles[i].urlToImage;
        articleImage.attr("src", articleImageURL);
        articleImage.attr("style", "width: 200px");
        urlLink.append(articleImage);
        article.append(urlLink);

        var titleBox = $('<p>');
        console.log("Article Title: " + response.articles[i].title);
        var articleTitle = response.articles[i].title;
        titleBox.text(articleTitle);
        article.append(titleBox);

        

        $(".articleSection").append(article);
    }

    
});


var dogBreedListUrl = "https://dog.ceo/api/breeds/list/all";

$.ajax({
    url: dogBreedListUrl,
    method: "GET"
})
.then(function(response) {
    var message = response.message;  
    var selectBox = $(".select-box");  
    for (var key in message) {
        $('<option />', {value: key, text: key}).appendTo(selectBox);
    }    
    
});



$("select").change(function(event){
    var breedImage = $('.breed-image');
    breedImage.empty();
    var selectedBreed = event.target.value;
    console.log(selectedBreed);
    var dogImageUrl = "https://dog.ceo/api/breed/" + selectedBreed + "/images/random";
    getImage(dogImageUrl);
  });

  function getImage(dogImageUrl){
    $.ajax({
        url: dogImageUrl,
        method: "GET"
    })
    .then(function(response) {
        var image = response.message;
        var breedImage = $('.breed-image');
        breedImage.attr("src", image);
        breedImage.attr("style", "width: 400px");
        $(".dropDownImageSection").append(breedImage);        
    });
  }

  