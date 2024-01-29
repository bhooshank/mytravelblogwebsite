const urlPageTitle = "My Traveling Blog";

// create document click that watches the nav links only
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// create an object that maps the url to the template, title, and description
const urlRoutes = {
	"/": {
		template: "/templates/home.html",
		title: "Home",
		description: "This is the home page",
	},
	"/details": {
		template: "/templates/details.html",
		title: "Details",
		description: "This is the details page",
	},
	"/contact": {
		template: "/templates/contact.html",
		title: "Contact Us",
		description: "This is the contact page",
	},
};

// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// create a function that handles the url location
const urlLocationHandler = async () => {
	const location = window.location.pathname; // get the url path
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the urlRoutes object
	const route = urlRoutes[location] || urlRoutes["/"];
	// get the html from the template
	let html = await fetch(route.template).then((response) => response.text());

	// WIP set the content of the content div to the html
    /* if(route.title == "Details"){
        html = `<h1>
        <span class="test p4">Testing out my script!</span></h1>`;
    } */
	document.getElementById("content").innerHTML = html;
	// WIP set the title of the document to the title of the route
	// document.title = route.title;
	// WIP set the description of the document to the description of the route
	/* document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description); */
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();

