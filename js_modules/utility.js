function addField() {

	const button = document.getElementById("add-field");
	const container = document.getElementById("fields-container");
	const dotclabel = document.getElementsByClassName("clabel");
	const dotcinput = document.getElementsByClassName("cinput");

	button.addEventListener("click", () => {
		container.insertAdjacentHTML("beforeend", `
			<hr>
			<div>
				<input id="clabel-${dotclabel.length}" name="label-${dotclabel.length}"class="cform clabel" value="Field Title"
				placeholder="Field Title Here">
				</div>
			<div>
				<input id="cinput-${dotcinput.length}" name="input-${dotclabel.length}" class="cform cinput"
				placeholder="Placeholder (empty if omitted)">
				</div>
		`);
	});
}

function hideLabel() { document.querySelector('#cicon-container').style.opacity = 0 }
const iconCtrl = function(event) {
	const display = document.getElementById('icon-display');
	const label = document.querySelector('[for=cicon]');
	const rmIcon = document.querySelector('#rm-icon');
	const cicont = document.querySelector('#cicon-container');
	//const trashMask = document.querySelector('#trash-mask');

    display.src=URL.createObjectURL(event.target.files[0]);
	label.classList.add("iconCtrl-label");
	rmIcon.classList.add("iconCtrl-rm-icon");
	hideLabel();	
	display.style.display = 'block';

	
	cicont.addEventListener('mouseout', hideLabel);
	rmIcon.addEventListener('click', ()=> {
		display.src = display.style.display = "";
		cicont.removeEventListener('mouseout', hideLabel);
		label.className = rmIcon.className = "";
	});
}
