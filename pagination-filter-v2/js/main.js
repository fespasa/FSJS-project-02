const students = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');
let activeLink = 1;

showPage(activeLink, students);
if(students.length > 10){
	let paginationDiv = document.createElement("DIV");
	paginationDiv.setAttribute("class", "pagination");
	page.appendChild(paginationDiv);
	appendPageLinks(students);
}

function showPage(activeLink, students) {
	for(let i = 0; i < students.length; i++){
		if(i < activeLink * 10 && i >= activeLink * 10 - 10){
			students[i].style.display = "block";
		} else {
			students[i].style.display = "none";
		}
	}
}

function appendPageLinks(students) {
	const pagination = document.querySelector('.pagination');
	let numPages;
	let ulNode = pagination.appendChild(document.createElement("UL"));
	if(students.length % 10 !== 0){
		numPages = Math.floor(students.length / 10) + 1;
	} else {
		numPages = students.length / 10;
	}
	for(let i = 1; i <= numPages; i++){
		let liNode = document.createElement("LI");
		let liItem = ulNode.appendChild(liNode);
		if( i === activeLink ) {
			liItem.innerHTML = '<a href="#" class="active">' + i + '</a>';
		} else {
			liItem.innerHTML = '<a href="#">' + i + '</a>';
		}
		liItem.addEventListener('click', () => {
			activeLink = i;
			showPage(activeLink, students);
			pagination.removeChild(pagination.childNodes[0]);
			appendPageLinks(students);
		})
	}
}
