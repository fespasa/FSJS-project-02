const students = document.querySelectorAll('.student-item');
const pagination = document.querySelector('.pagination');


console.log(students);

for(let i = 0; i < students.length; i++) {
	if(i >= 10){
		students[i].style.display = "none";
	}
}

if(students.length > 10){
	const n = Math.floor(students.length / 10) + 1;
	console.log("n is " + n);
	pagination.innerHTML = "<ul></ul>";
	for(let i = 1; i <= n; i++) {
		let li = document.createElement("li");
		if(i === 1){
			li.innerHTML = "<a class='active' href='#'>" + i + "</a>";
			pagination.appendChild(li);
		} else {
			li.innerHTML = "<a href='#'>" + i + "</a>";
			pagination.appendChild(li);
		}
	}
} else {
	pagination.style.display = "none";
}
