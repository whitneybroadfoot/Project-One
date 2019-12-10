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
    console.log(message);
    //var selectBox = $(".select-box"); 
    //Populate the Breed List in the drop down
    var breedArray = [];
    var count = 0;
    for (var key in message) {
        breedArray[count] = key;
        count ++;
       // $('<option />', {value: key, text: key}).appendTo(selectBox);
    }    
    console.log(breedArray);
    autopopulateBreed(breedArray);
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
        breedImage.attr("style", "width: 500px");
        $(".dropDownImageSection").attr("style", "text-align: center");
        $(".dropDownImageSection").append(breedImage);        
    });
  }


  function autopopulateBreed(breedArray){
    $( "#Breeds" ).autocomplete({
        source: breedArray,
        focus: function(event, ui) {
			event.preventDefault();
			// manually update the textbox
			$(this).val(ui.item.label);
		},
		select: function(event, ui) {
			event.preventDefault();
            var breedImage = $('.breed-image');
            breedImage.empty();
            var selectedBreed = $("#Breeds").val();
            console.log("selectedBreed: " + selectedBreed);
            //API Call to get Dog Image
            var dogImageUrl = "https://dog.ceo/api/breed/" + selectedBreed + "/images/random";
            getImage(dogImageUrl);
		}
     });
  }

  //creates a carousel of 20 quotes about dogs
  var quoteArray = ['"Outside of a dog, a book is a man\'s best friend. Inside of a dog it\'s too dark to read." - Groucho Marx', 
  '"A dog is the only thing on earth that loves you more than you love yourself." - Josh Billings', 
  '"Happiness is a warm puppy." - Charles Shultz',
  '"Dogs have a way of finding the people who need them, and filling an emptiness we didn\'t ever know we had." - Thom Jones',
  '"The average dog is a nicer person than the average person." - Andy Rooney',
  '"There is no psychiatrist in the world like a puppy licking your face." - Ben Williams',
  '"A dog will teach you unconditional love. If you can have that in your life, things won\'t be too bad." - Robert Wagner',  
  '"There\'s just something about dogs that makes you feel good. You come home, they\'re thrilled to see you. They\'re good for the ego." - Janet Schnellman',
  '"A person can learn a lot from a dog, even a loopy one like ours. Marley taught me about living each day with unbridled exuberance and joy, about seizing the moment and following your heart. He taught me to appreciate the simple things-a walk in the woods, a fresh snowfall, a nap in a shaft of winter sunlight. And as he grew old and achy, he taught me about optimism in the face of adversity. Mostly, he taught me about friendship and selflessness and, above all else, unwavering loyalty." - John Grogan',
  '"Dogs are not our whole life, but they make our lives whole." - Roger Caras',
  '"Dogs do speak, but only to those who know how to listen." - Orhan Pamuk',
  '"The greatest pleasure of a dog is that you may make a fool of yourself with him, and not only will he not scold you, but he will make a fool of himself, too." - Samuel Butler',
  '"I like dogs. You always know what a dog is thinking. It has four moods. Happy, sad, cross and concentrating. Also, dogs are faithful and they do not tell lies because they cannot talk." - Mark Haddon',
  '"The better I get to know men, the more I find myself loving dogs." - Charles de Gaulle',
  '"Dogs are better than human beings because they know but do not tell." - Emily Dickinson',
  '"A dog can\'t think that much about what he\'s doing, he just does what feels right." - Barbara Kingsolver',
  '"If you think dogs can\'t count, try putting three dog biscuits in your pocket and then give him only two of them." - Phil Pastoret',
  '"You think dogs will not be in heaven? I tell you, they will be there long before any of us." - Robert Louis Stevenson',
  'I\'m suspicious of people who don\'t like dogs, but I trust a dog when it doesn\'t like a person." - Bill Murray',
  'It\'s hard not to immediately fall in love with a dog who has a good sense of humor." - Kate DiCamillo'];

  
  
 for (var i = 0; i < quoteArray.length; i++){
    var newDiv = $('<div>');
    newDiv.attr("style", "margin-left: 50px; margin-right: 50px; padding-bottom: 25px; text-align: center");
    newDiv.text(quoteArray[i]);
    console.log("Quote: " + quoteArray[i]);
    $('.carousel').append(newDiv);
 }
    
 bulmaCarousel.attach('#carousel-demo', {
			slidesToScroll: 1,
            slidesToShow: 1,
            infinite: true,
        });
        