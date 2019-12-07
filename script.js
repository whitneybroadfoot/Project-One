var newsAPIKey = "95c29dd3111340239464a2b485373828";
var newsURL = "https://newsapi.org/v2/everything?q=dog+puppy&apiKey=" + newsAPIKey;

$.ajax({
    url: newsURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);

    //generates 6 unique random articles each time the app is run
    var articleArray = []; 
    var firstNum = Math.floor(Math.random() * 20);
    var newNum;
    articleArray.push(firstNum);
    for(var i = 0; i < 5; i++){
        newNum = Math.floor(Math.random() * 20);
    while (articleArray.lastIndexOf(newNum) !== -1) {
        newNum = Math.floor(Math.random() * 20);
    }
    articleArray.push(newNum);
    }
    console.log(articleArray);

    for(var i = 0; i < 6; i++){
        //create a tile with the image from each article and the article title, date, and description and display on the page
       
        // creates 4 divs with class columns for formatting 

        //article photo div
        var photoDiv = $("<div>");
        photoDiv.attr("class", "columns");
        photoDiv.attr("id", "photo");
        
        //article title div
        var titleDiv = $("<div>");
        titleDiv.attr("class", "columns");
        titleDiv.attr("id", "title");
        titleDiv.attr("style", "margin-left: 0px");

        //article date div
        var dateDiv = $("<div>");
        dateDiv.attr("class", "columns");
        dateDiv.attr("id", "date");
        dateDiv.attr("style", "margin-left: 0px");
        
        //article description div
        var desDiv = $("<div>");
        desDiv.attr("class", "columns");
        desDiv.attr("id", "desDiv");
        desDiv.attr("style", "margin-left: 0px");

        //article URL
        var urlLink = $('<a>');
        console.log("Article URL: " + response.articles[articleArray[i]].url);
        var articleURL = response.articles[articleArray[i]].url;
        urlLink.attr("href", articleURL);


        var articleImage = $('<img>');
        
    
        console.log("Article Image URL: " + response.articles[articleArray[i]].urlToImage);
        var articleImageURL = response.articles[articleArray[i]].urlToImage;
        articleImage.attr("src", articleImageURL);
        urlLink.append(articleImage);
        photoDiv.append(urlLink);

        var titleBox = $('<p>');
        titleBox.attr("class", "has-text-weight-bold");
        titleBox.attr("style", "font-size: 20px");
        
        console.log("Article Title: " + response.articles[articleArray[i]].title);
        var articleTitle = response.articles[articleArray[i]].title;
        titleBox.text(articleTitle);
        titleDiv.append(titleBox);

        var dateBox = $('<p>');
        dateBox.attr("style", "font-style: italic");
        var articleDate = response.articles[articleArray[i]].publishedAt;
        console.log("Article Date: " + articleDate);
        articleDate = articleDate.split('T')[0];
        console.log("Shortened Date: " + articleDate);
        var year = articleDate.substr(0,4);
        console.log("Year: " + year);
        var month = articleDate.substr(5,2);
        console.log("Month: " + month);
        var day = articleDate.substr(8,2);
        console.log("Day: " + day);
        var date = spacetime([year, month, day]);
        console.log("Formatted Date: " + date.format('{month} {date-pad}, {year}'));
        dateBox.text(date.format('{month} {date-pad}, {year}'));
        dateDiv.append(dateBox);

        var descriptionBox = $('<p>');
        var description = response.articles[articleArray[i]].description;

        descriptionBox.text(description);
        desDiv.append(descriptionBox);
        
        // appends the three columns to html
        $(".articleSection").append(photoDiv);
        $(".articleSection").append(titleDiv);
        $(".articleSection").append(dateDiv);
        $(".articleSection").append(desDiv);
    }
   
});


//API call to get the breed list
var dogBreedListUrl = "https://dog.ceo/api/breeds/list/all";

$.ajax({
    url: dogBreedListUrl,
    method: "GET"
})
.then(function(response) {
    var message = response.message;  
    var selectBox = $(".select-box"); 
    //Populate the Breed List in the drop down
    for (var key in message) {
        $('<option />', {value: key, text: key}).appendTo(selectBox);
    }    
    
});


//On Selecting a Breed Make the Second API Call
$("select").change(function(event){
    var breedImage = $('.breed-image');
    breedImage.empty();
    var selectedBreed = event.target.value;
    console.log(selectedBreed);
    //API Call
    var dogImageUrl = "https://dog.ceo/api/breed/" + selectedBreed + "/images/random";
    getImage(dogImageUrl);
  });

  //Get the Image from the response and display on the page
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