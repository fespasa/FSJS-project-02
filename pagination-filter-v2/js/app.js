const $students = $('.student-item');

let pages;
const maxListStudents = 10;
let pageNum = 1;


showPage(pageNum, $students);
appendPageLinks($students);

function showPage(pageNum, studentList) {
	// loop through all students
	studentList.each(function(){
		// hide each student
		$(this).hide();
		if($(this).index() >= (pageNum - 1) * maxListStudents && $(this).index() < pageNum * maxListStudents) {
			// display the student if it has to be displayed
			$(this).show();
		}
	})
}

function appendPageLinks(studentList) {
	if(studentList.length % maxListStudents !== 0) {
		pages = Math.floor(studentList.length / maxListStudents) + 1;
	} else {
		pages = Math.floor(studentList.length / maxListStudents);
	}
	if($('.pagination') !== undefined) {
		$('.pagination').hide();
	}
	const $linksList = $('<div class="pagination"><ul></ul></div>');
	$('.page').append($linksList);
	for(let i = 1; i <= pages; i++) {
		console.log("Inside Bucle at: " + i);
		if(i === pageNum){
			console.log("i is: " + i + "compared to: " + pageNum);
			$('.pagination ul').append($('<li><a href="#" class="active">'+ i +'</a></li>)'));;
		} else {
			$('.pagination ul').append($('<li><a href="#">'+ i +'</a></li>)'));
		}
	}
	$('.pagination a').click(function(){
		console.log($(this));
		let linkClicked = parseInt($(this)[0].textContent);
		console.log("I clicked the: "+ linkClicked + " button.");
		pageNum = linkClicked;
		console.log(pageNum);
		showPage(pageNum, studentList); 
		appendPageLinks(studentList);
	});
}