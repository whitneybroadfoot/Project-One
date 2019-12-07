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
        //create a tile with the image from each article and the article title and display on the page
       
        // creates 3 divs with class columns for formatting 

        var photoDiv = $("<div>");
        photoDiv.attr("class", "columns")
        photoDiv.attr("id", "photo")
        
        var titleDiv = $("<div>");
        titleDiv.attr("class", "columns");
        titleDiv.attr("id", "title");
        
        var desDiv = $("<div>");
        desDiv.attr("class", "columns")
        desDiv.attr("id", "desDiv")
    
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

        var descriptionBox = $('<p>');
        var description = response.articles[articleArray[i]].description;

        descriptionBox.text(description);
        desDiv.append(descriptionBox);
        
        // appends the three columns to html
        $(".articleSection").append(photoDiv);
        $(".articleSection").append(titleDiv);
        $(".articleSection").append(desDiv);
    }
   
});