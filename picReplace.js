window.onload = main();

function main() {
	//alert("Script Running");

	//Animal picture sets
	var dogs = ["https://i.imgur.com/SBBdO8b.jpg", "https://i.imgur.com/B7UJFRn.jpg", "https://i.imgur.com/gIunJ2r.jpg", "https://i.imgur.com/5O5LdRB.jpg", "https://i.imgur.com/sNhzxmR.jpg", "https://68.media.tumblr.com/10776e624890ff1b69653e6a0b649b1e/tumblr_inline_ortrrhjE1f1qzf6t4_540.png", "https://i.imgur.com/aBZ2pmU.png"];

	var cats = ["https://i.imgur.com/Lb72oOt.jpg", "https://i.imgur.com/a8g7LN3.jpg", "https://i.imgur.com/1eGvND1.jpg", "https://i.imgur.com/JAyZUbr.jpg", "https://i.imgur.com/aSPfMtv.jpg", "https://i.imgur.com/eMOJo5x.jpg"];

	var other = ["https://i.imgur.com/6APa6U5.jpg", "https://i.imgur.com/UotvQlG.jpg", "https://i.imgur.com/qUU8tSM.jpg", "https://i.imgur.com/JsEF641.jpg", "https://i.imgur.com/n5dhNzj.jpg", "https://i.imgur.com/7w8Pn2I.jpg"];

	var choice = "";
	var animals = dogs; //Default to dogs
	
	chrome.storage.sync.get("choice", function(result) {
		choice = result.choice;
		//alert(choice);
		if (choice == "dogs"){
		  	animals = dogs;
		  } else if (choice == "cats"){
		  	animals = cats;
		  } else if (choice == "other") {
		  	animals = other;
		  } else if (choice == "all") {
		  	animals.concat(dogs, cats, other);
		  }
	});

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		
	var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    replacePics(animals);
    console.log(mutations, observer);
    // ...
});

	observer.observe(document, {
		subtree: true,
		attributes: true
	});

}

//Choose random dog pic
function rndPic(animals) {
	var arr = animals;

	var result = arr[Math.floor(Math.random() * arr.length)];

	return result;
}


function replacePics(animals) {

	//Replaces profile picture icon of a post
	var postPic = document.getElementsByClassName("_s0 _4ooo _5xib _5sq7 _44ma _rw img");

	for (var i = 0; i < postPic.length; i++) {
		if (!animals.includes(postPic[i].src)){
			postPic[i].src = rndPic(animals);
		}
	}

	//Replaces profile picture icons of commentors
	var commentPic = document.getElementsByClassName("img UFIActorImage _54ru img");
	for (var i = 0; i < commentPic.length; i++) {
		if (!animals.includes(commentPic[i].src)){
			commentPic[i].src = rndPic(animals);
		}
	}

	//Replaces profile picture when hovering over user
	var hoverProfPic = document.getElementsByClassName("_s0 _4ooo _1ve7 _7lw _rv img");
	for (var i = 0; i < hoverProfPic.length; i++) {
		if (!animals.includes(hoverProfPic[i].src)){
			hoverProfPic[i].src = rndPic(animals);
		}
	}

}