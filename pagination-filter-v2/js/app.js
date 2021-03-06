const $students = $('.student-item');

let pages;
// create a const with the max number of students we want to display
const maxListStudents = 10;
let pageNum = 1; // start with the first page of pagination

// call the functions to start the program
showPage(pageNum, $students);
appendPageLinks($students);


function showPage(pageNum, studentList) {
	// hide all elements
	$students.hide();
	// loop through all students
	$.each(studentList, function(event){
		console.log(event);
		if(event >= (pageNum - 1) * maxListStudents && event < pageNum * maxListStudents) {
			// display the student if it has to be displayed
			$(this).show();
		}
	})
}


function appendPageLinks(studentList) {
	// calculate number of pages we need
	if(studentList.length % maxListStudents !== 0) {
		pages = Math.floor(studentList.length / maxListStudents) + 1;
	} else {
		pages = Math.floor(studentList.length / maxListStudents);
	}
	// hide pagination links if there is a previous one
	if($('.pagination') !== undefined) {
		$('.pagination').hide();
	}
	// create a new pagination link div
	const $linksList = $('<div class="pagination"><ul></ul></div>');
	$('.page').append($linksList);
	// create all the links for all pages we need
	for(let i = 1; i <= pages; i++) {
		console.log("Inside Bucle at: " + i);
		if(i === pageNum){
			// if the link is equal to the page showed we add the active class attribute
			console.log("i is: " + i + "compared to: " + pageNum);
			$('.pagination ul').append($('<li><a href="#" class="active">'+ i +'</a></li>)'));;
		} else {
			$('.pagination ul').append($('<li><a href="#">'+ i +'</a></li>)'));
		}
	}
	// create the click event for each of the links
	$('.pagination a').click(function(){
		let linkClicked = parseInt($(this)[0].textContent);
		console.log("I clicked the: "+ linkClicked + " button.");
		pageNum = linkClicked; // change the pageNum var
		console.log(pageNum);
		showPage(pageNum, studentList); // we call the functions again
		appendPageLinks(studentList);
	});
}

/*------- SEARCH STUDENT SECTION -------*/

// Add the search input section
$('.page-header').append($('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>'));

// when the search button is clicked it launches the searchList function
$('.page-header button').click(function searchList(){
	// Obtain the input value
	let searchText = $('.page-header input')[0].value.toLowerCase();
	
	// hide the pagination links
	$('.pagination').hide();
	// create an array of matched students
	let matchedStudents = [];
	// loop through each student in the list
	$students.each(function(){
		// we store the student to a var called student
		let student = $(this)[0];
	
		// we store the student name value to a var call name
		let name = student.childNodes[1].childNodes[3].textContent;
		
		// we store the student email value to a var call email
		let email = student.childNodes[1].childNodes[5].textContent;
		
		if( name.indexOf(searchText) >= 0 || email.indexOf(searchText) >= 0) {
			// if name or email is equal to search input text we add the student to the array
			// matchedStudents.push(student); 
			matchedStudents.push(student); 
			console.log("Student " + name + " found!");
		}
	})
	
	console.log(matchedStudents);
	// if the array of students is empty we show an alert
	if(matchedStudents.length === 0) {
		$('.student-search').append('<div class="notFound" style="color: red;"><h5>Student not found! :(</h5></div>');
	} else {
		$('.notFound').hide() // hide if there is a not found message
		
		// if the array is not empty we call the functions to show the list with the students
		if(matchedStudents.length > 10) {
			appendPageLinks(matchedStudents);
		}
		showPage(1, matchedStudents);
	}
});

