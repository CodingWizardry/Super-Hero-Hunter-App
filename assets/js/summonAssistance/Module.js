//----------------------------------------------------------------
//Revealing Module Pattern using IIFE Module Design Pattern//
//----------------------------------------------------------------
const callForHelp = (() => {
	//Variable Declarations//
	const display = document.querySelector(".helper-card");
	const template1 = document.querySelector("#template1").children[0];
	const template2 = document.querySelector("#template2").children[0];
	const template3 = document.querySelector("#template3").children[0];
	//----------------------------------------------------------------
	//Function: Displays the 'Find Your Superhero' Form//
	const helpMe = () => {
		//Removes the Previous Results from the Display
		if (display.children.length > 1) {
			display.children.forEach((child) => child.remove());
		}
		//Appends the cloned Template to the Display
		display.appendChild(template1.cloneNode(true));
	};
	//----------------------------------------------------------------
	//Function: Handles the Click Events//
	const handleClick = (event) => {
		//Stops Event Bubbling
		event.stopPropagation();
		//Fetch the clicked Element
		const target = event.target;

		//If the clicked Element is the 'Find Now' Button
		if (target.classList.contains("btn")) {
			//Prevent the Default Action
			event.preventDefault();

			//If the Input TextArea is Empty
			if (target.previousElementSibling.children[1].value === "") {
				return;
			}

			//Remove the Form from the Display
			display.querySelector(".card-body").remove();
			//Append the cloned Template (Animation) to the Display
			display.appendChild(template2.cloneNode(true));
			//After 5 Seconds
			setTimeout(() => {
				//Remove the Animation (Cloned Template) from the Display
				display.querySelector(".wrapper").remove();
				//Append the cloned Template (Success Result) to the Display
				display.appendChild(template3.cloneNode(true));
			}, 5000);
		}
	};
	//----------------------------------------------------------------
	//Function: Initializes the Call For Help Page//
	const initializeApp = () => {
		//Click Event Listener
		document.addEventListener("click", handleClick);
		//Runs on every Window Load/Reload
		window.onload = () => {
			//Calls the helpMe() function
			helpMe();
		};
	};
	//----------------------------------------------------------------
	return {
		initialize: initializeApp,
	};
})();
//----------------------------------------------------------------
