//----------------------------------------------------------------
//Revealing Module Pattern using IIFE Module Design Pattern//
//----------------------------------------------------------------
const favouriteSuperheroPage = (() => {
	//Variable Declarations//
	const result = document.querySelector(".result");
	const template = document.querySelector("[data-template]");
	const template2 = document.querySelector("[data-empty]");
	//----------------------------------------------------------------
	//Function: Renders the Card Templates into the Screen//
	const renderCards = (name, image) => {
		//Clone the Template
		const superhero = template.content.cloneNode(true).children[0];
		const img = superhero.querySelector("img");
		const superheroName = superhero.querySelector(".card-title");

		//Set the Superhero Image in the Card
		img.src = image;
		//Set the Data Attribute
		img.setAttribute("data-image-url", image);
		//Set the Superhero Name in the Card Title
		superheroName.textContent = name;
		//Set the Data Attribute
		superheroName.setAttribute("data-name", name);

		//Append the Card to the Result Div
		result.appendChild(superhero);
	};
	//----------------------------------------------------------------
	//Function: Fetch Favourite Super Heroes from the Local Storage//
	const fetchFavouriteSuperHeroes = () => {
		//Fetch the Favourites from Local Storage
		const favourites = JSON.parse(localStorage.getItem("favourites")); 
		const images = JSON.parse(localStorage.getItem("images"));

		//Remove the Previous Results from the Screen
		result.querySelectorAll("*").forEach((element) => {
			element.remove();
		});

		//If Favourites Exist in the Local Storage
		if ("favourites" in localStorage) {
			//If the Favourites Array is not Empty
			if (favourites.length > 0) {
				//For Each Superhero in the Favourites Array, Render the Card Templates
				for (let favourite of favourites) {
					const name = favourite;
					const image = images.filter((image) => image.name === name)[0]
						.image;
					//Render the Card Templates
					renderCards(name, image);
				}
			}
		}

		//If Favourites does not Exist in the Local Storage
		if (!("favourites" in localStorage)) {
			//Show the Message that there are no Favourites
			const superhero = template2.content.cloneNode(true).children[0];
			result.appendChild(superhero);
		}

		//If the Favorites Array is Empty
		if (favourites.length === 0) {
			//Show the Message that there are no Favourites
			const superhero = template2.content.cloneNode(true).children[0];
			result.appendChild(superhero);
		}
	};
	//----------------------------------------------------------------
	//Function: Handles the Click Events//
	const handleClick = (event) => {
		//Stops Event Bubbling
		event.stopPropagation();
		//Fetch the clicked Element
		const target = event.target;

		//If the Superhero Cards Exist & is Clicked
		if (result.querySelectorAll(".card").length > 0) {
			let val = "";

			//If the Superhero Card Title is Clicked
			if (target.classList.contains("card-title")) {
				val = target.getAttribute("data-name");
			}
			//If the Superhero Card Body is Clicked
			if (target.classList.contains("card-body")) {
				val = target.children[0].getAttribute("data-name");
			}
			//If the Superhero Card Image is Clicked
			if (target.classList.contains("card-img-top")) {
				val =
					target.nextElementSibling.children[0].getAttribute("data-name");
			}
			//If the Superhero Card is Clicked
			if (target.classList.contains("card")) {
				val = target.querySelector(".card-title").getAttribute("data-name");
			}
			//If the Remove Button inside the Superhero Card is Clicked
			if (target.classList.contains("remove-btn")) {
				//Prevent the Default Event
				event.preventDefault();
				//Fetch the Superhero Name from the Data Attribute
				const name =
					target.previousElementSibling.getAttribute("data-name");
				//Fetch the Favourites from Local Storage
				let favourites = JSON.parse(localStorage.getItem("favourites"));
				let images = JSON.parse(localStorage.getItem("images"));
				//Remove the Superhero from the Favourites
				favourites = favourites.filter((favourite) => favourite !== name);
				images = images.filter((obj) => obj.name !== name);
				//Update the Local Storage
				localStorage.setItem("favourites", JSON.stringify(favourites));
				localStorage.setItem("images", JSON.stringify(images));
				//Reload the Page
				window.location.reload();
				return;
			}

			//Set the Superhero Name (to Search for) in the Local Storage
			localStorage.setItem("superhero", val);
			//Redirect to the Superhero Page

			window.location.href = "./superhero-page.html";
		}
	};
	//----------------------------------------------------------------
	//Function: Initializes the Favourite Superheroes Page//
	const initializeApp = () => {
		//Click Event Listener
		document.addEventListener("click", handleClick);
		//Runs on every Window Load/Reload
		window.onload = () => {
			//Calls the fetchFavouriteSuperHeroes() function
			fetchFavouriteSuperHeroes();
		};
	};
	//----------------------------------------------------------------
	return {
		initialize: initializeApp,
	};
})();
//----------------------------------------------------------------
