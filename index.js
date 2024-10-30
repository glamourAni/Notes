const note = document.querySelector("form")
const textBox = document.querySelector("textarea")
const saveNote = document.querySelector(".save")
const noteCount = document.querySelector(".notes-count")
const makeNote = document.querySelector(".create")
const menu = document.querySelector(".menu")
const notesArray = document.querySelector(".notes-list")

const months = {
	jsMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	],
	regularMonths: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	],
}
// load svg icon
async function loadSVG(url, containerID) {
	try {
		const response = await fetch(url)
		const svgText = await response.text()

		const parser = new DOMParser()
		const svgDoc = parser.parseFromString(svgText, "image/svg+xml")
		const svgElement = svgDoc.querySelector("svg")
		document.querySelector(containerID).appendChild(svgElement)
	} catch (error) {
		console.log("Error loading svg file.")
	}
}

makeNote.addEventListener("click", () => {
	console.log("Code working")
	menu.classList.add("hide")
	notesArray.classList.add("hide")
	note.classList.remove("hide")
})
saveNote.addEventListener("click", () => {
	// create nodes
	let newNote = document.createElement("div")
	newNote.classList.add("note")
	notesArray.classList.remove("hide")
	menu.classList.remove("hide")
	notesArray.append(newNote)

	let createdAt = document.createElement("p")
	let text = document.createElement("p")
	const options = document.createElement("div")
	options.classList.add("footer")
	newNote.append(createdAt, text, options)

	// add note date, content and option properties
	const date = new Date().toDateString()
	createdAt.innerText = date
	if (textBox.value === "") {
		text.innerText = "(Empty note)"
	} else {
		text.innerText = textBox.value
	}
	// const editBtn = loadSVG("./assets/edit-svgrepo-com.svg", ".footer")
	// const deleteBtn = loadSVG("./assets/delete-svgrepo-com.svg", ".footer")
	// editBtn.classList.add("edit")
	// deleteBtn.classList.add("delete")
	//add note to note section
	//hide textbox

	// save note to localstorage

	note.classList.add("hide")
})
