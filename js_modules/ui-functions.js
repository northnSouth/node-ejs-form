function showPencil() {
	const ctitle = document.getElementById("ctitle");
	const dotpencil	= document.getElementsByClassName("pencil");
	const dotlabpencil = document.getElementsByClassName("labpencil");
	const dotclabel = document.getElementsByClassName("clabel");	

	function aELGenerator(field, pencilIndex) {
		field.addEventListener("focus", () => {
			dotpencil[pencilIndex].style.display = "inline-block";
		});
		field.addEventListener("blur", () => {
			dotpencil[pencilIndex].style.display = "none";
 		});
	}
	  			
	aELGenerator(ctitle, 0);

	for (let i=0;i < dotlabpencil.length;i++) {
		aELGenerator(dotclabel[i], i + 1)}
}

function textareaResize() {
	const elems = document.querySelectorAll(".txtauto");
	const setHeight = (i)=> {
		console.log(i)
		elems[i].style.height = "";
	  	elems[i].style.height = elems[i].scrollHeight/2 + "px";	

		if (elems[i].clientHeight < elems[i].scrollHeight) {
			console.log("overflowing")
			elems[i].style.height = elems[i].scrollHeight + "px";
		}
	}

	for (let i=0;i < elems.length;i++) {
		setHeight(i);
		elems[i].addEventListener("input", ()=> { setHeight(i) });
	}	
}
