const noteEditArea = document.querySelector("form")
const textBox = document.querySelector("textarea")
const saveNote = document.querySelector(".save")
const noteCount = document.querySelector(".notes-count")
const makeNote = document.querySelector(".create")
const menu = document.querySelector(".menu")
const notesArray = document.querySelector(".notes-list")
const counter = document.getElementById("counter")

const EDIT_SVG = `
					<svg
								class="edit"
								fill="#000000"
								width="800px"
								height="800px"
								viewBox="0 0 40 40"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									class="st0"
									d="M12 25l3 3 15-15-3-3-15 15zM11 26l3 3-4 1z"
								/>
					</svg>
				`
const DELETE_SVG = `
						<svg
								class="delete"
								fill="#000000"
								width="800px"
								height="800px"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"
								/>
							</svg>
					`
const months = {
	Jan: "January",
	Feb: "February",
	Mar: "March",
	Apr: "April",
	May: "May",
	Jun: "June",
	Jul: "July",
	Aug: "August",
	Sep: "September",
	Oct: "October",
	Nov: "November",
	Dec: "December",
}
// load svg icon
function loadSVG(svg, container) {
	container.insertAdjacentHTML("beforeend", svg)
}

// generate random uuid
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0
			const v = c === "x" ? r : (r & 0x3) | 0x8
			return v.toString(16)
		}
	)
}
makeNote.addEventListener("click", () => {
	console.log("Code working")
	menu.classList.add("hide")
	notesArray.classList.add("hide")
	noteEditArea.classList.remove("hide")
})
saveNote.addEventListener("click", () => {
	// create nodes
	const note = document.createElement("div")
	note.classList.add("note")

	const id = generateUUID()
	note.setAttribute("id", id)

	notesArray.classList.remove("hide")
	menu.classList.remove("hide")
	notesArray.append(note)

	let createdAt = document.createElement("p")
	let text = document.createElement("p")
	const options = document.createElement("div")
	options.classList.add("footer")
	note.append(createdAt, text, options)

	// add note date, content and option properties
	const dateString = new Date().toDateString().split(" ")
	console.log(dateString)
	let date = dateString.replace(dateString[0], "").trim()
	console.log(date)

	createdAt.innerText = date
	if (textBox.value === "") {
		text.innerText = "(Empty note)"
	} else {
		text.innerText = textBox.value
	}

	loadSVG(EDIT_SVG, options)
	loadSVG(DELETE_SVG, options)
	// save note to localstorage

	noteEditArea.classList.add("hide")
	counter.innerText = Number(counter.innerText) + 1
	textBox.value = ""
})
// save to and retrieve notes from localStorage
// correct day spelling in date
// specify length of text to be previewed
// make icons functional
