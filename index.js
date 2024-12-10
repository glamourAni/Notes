const noteEditArea = document.querySelector("form");
const textBox = document.querySelector("textarea");
const saveNote = document.querySelector(".save");
const noteCount = document.querySelector(".notes-count");
const makeNote = document.querySelector(".create");
const menu = document.querySelector(".menu");
const notesArray = document.querySelector(".notes-list");
const counter = document.getElementById("counter");

let noteList = JSON.parse(localStorage.getItem("Notes") || "[]");

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
				`;
const DELETE_SVG = (noteid) => `
						<svg
						    id="delete-svg-${noteid}"
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
					`;
const months = [
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
];
// load svg icon
function loadSVG(svg, container) {
  container.insertAdjacentHTML("beforeend", svg);
}

// generate random uuid
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
makeNote.addEventListener("click", () => {
  console.log("Code working");
  menu.classList.add("hide");
  notesArray.classList.add("hide");
  noteEditArea.classList.remove("hide");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  for (const Note of noteList) {
    const note = document.createElement("div");
    note.classList.add("note");

    note.setAttribute("id", Note.id);
    notesArray.classList.remove("hide");
    menu.classList.remove("hide");
    notesArray.append(note);

    let createdAt = document.createElement("p");
    let text = document.createElement("p");
    const options = document.createElement("div");
    options.classList.add("footer");
    note.append(createdAt, text, options);

    createdAt.innerText = Note.date; //sets the date string
    if (Note.description === "") {
      text.innerText = "(Empty Note)";
    } else {
      text.innerText = Note.description;
    }
    // add icons
    loadSVG(EDIT_SVG, options);
    loadSVG(DELETE_SVG(Note.id), options);

    const svg = document.getElementById(`delete-svg-${Note.id}`);
    if (svg) {
      svg.onclick = function (event) {
        deleteNote(event, Note.id);
      };
    }

    noteEditArea.classList.add("hide");
    counter.innerText = noteList.length;
    textBox.value = "";
  }
}
saveNote.addEventListener("click", () => {
  let description = textBox.value;
  const id = generateUUID();

  const dateString = new Date(),
    month = months[dateString.getMonth()],
    day = dateString.getDate(),
    year = dateString.getFullYear();

  const noteDetails = {
    id: id,
    date: `${month} ${day}, ${year}`,
    description: description,
  };

  //create an array to store notes

  noteList.push(noteDetails);
  // save notes to localstorage
  localStorage.setItem("Notes", JSON.stringify(noteList));
  showNotes();
});
showNotes();
// save to and retrieve notes from localStorage
// correct day spelling in date
// specify length of text to be previewed
// make icons functional
function deleteNote(e, id) {
  console.log("Here's the id:", id);

  // Leave all the note where note.id is not id
  noteList = noteList.filter((note) => note.id !== id);
  localStorage.setItem("Notes", JSON.stringify(noteList));
  showNotes();
}
