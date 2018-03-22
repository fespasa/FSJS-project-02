const students = document.querySelectorAll('.student-item');
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentsEachPage = 10;
let matchedStudents = [];
let pagination;
let activeLink = 1;

showPage(activeLink, students);
// we do the pagination div if its necessary
if(students.length > studentsEachPage){
	let paginationDiv = document.createElement("DIV");
	paginationDiv.className = "pagination";
	page.appendChild(paginationDiv);
	pagination = document.querySelector('.pagination');
	appendPageLinks(students);
}


function showPage(link, students) {
	for(let i = 0; i < students.length; i++){
		if(i < link * studentsEachPage && i >= link * studentsEachPage - studentsEachPage){
			students[i].style.display = "block";
		} else {
			students[i].style.display = "none";
		}
	}
}

function appendPageLinks(students) {
	let numPages;
	let ulNode = pagination.appendChild(document.createElement("UL"));
	if(students.length % studentsEachPage !== 0){
		numPages = Math.floor(students.length / studentsEachPage) + 1;
	} else {
		numPages = students.length / studentsEachPage;
	}
	for(let i = 1; i <= numPages; i++){
		let liNode = document.createElement("LI");
		let liItem = ulNode.appendChild(liNode);
		if( i === activeLink ) {
			liItem.innerHTML = '<a href="#" class="active">' + i + '</a>';
		} else {
			liItem.innerHTML = '<a href="#">' + i + '</a>';
		}
		liItem.addEventListener('click', (event) => {
			activeLink = event.index();
			console.log(activeLink);
			showPage(i, students);
			pagination.removeChild(pagination.childNodes[0]);
			appendPageLinks(students);
		})
	}
}

function searchList(){
	matchedStudents = [];
	let inputText = document.querySelector('.page-header input');
	let searchQuery = inputText.value.toLowerCase();
    pagination.removeChild(pagination.childNodes[0]);
    for(let i = 0; i < students.length; i++){
    	let name = students[i].childNodes[1].childNodes[3].textContent;
    	let email = students[i].childNodes[1].childNodes[5].textContent;
    	if( name.search(searchQuery) || email.search(searchQuery) ){
			matchedStudents.push(students[i]);
		} 
	}
	if(matchedStudents.length === 0){
		alert("No Matches found! :(");
	} else {
		showPage(1, matchedStudents);
		appendPageLinks(matchedStudents);
	}
}
