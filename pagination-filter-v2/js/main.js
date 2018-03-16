const students = document.querySelectorAll('.student-item');
console.log(students);

for(let i = 0; i < students.length; i++) {
	if(i >= 10){
		students[i].style.display = "none";
	}
}