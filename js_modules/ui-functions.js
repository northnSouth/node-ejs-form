function textareaResize() {
	const elems = document.querySelectorAll(".txtauto");
	const setHeight = (i)=> {
		elems[i].style.height = "";
	  	elems[i].style.height = elems[i].scrollHeight/2 + "px";	

		if (elems[i].clientHeight < elems[i].scrollHeight) {
			elems[i].style.height = elems[i].scrollHeight + "px";
		}
	}

	for (let i=0;i < elems.length;i++) {
		setHeight(i);
		"input focusin focusout".split(" ").forEach(function(e){
      		addEventListener(e, ()=> { setHeight(i) });
    	});	
	}	
}

function hideIcon() {
	const title = document.querySelector("#ctitle");
	const finput = document.querySelector("[for=cicon]");
	const icon = document.querySelector("#icon-display");

	title.addEventListener("focus", ()=> { finput.style.display = icon.style.display = "none" });
	title.addEventListener("blur", ()=> {
		if (icon.src == "") {
			finput.style.display = ""; // fixes bug or glitch where there's white lines if <img> without picture's display = block.
		} else {
			finput.style.display = icon.style.display = "block";
		}
	});
}
