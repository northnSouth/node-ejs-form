function addField() {

	const button = document.getElementById("add-field");
	const container = document.getElementById("fields-container");
	const dotclabel = document.getElementsByClassName("clabel");
	const dotcinput = document.getElementsByClassName("cinput");

	button.addEventListener("click", () => {
		container.insertAdjacentHTML("beforeend", `
			<hr>
			<div>
				<div class="pencil labpencil"></div>
				<input id="clabel-${dotclabel.length}" class="cform clabel" value="Field Title"
				placeholder="Field Title Here">
				</div>
			<div>
				<input id="cinput-${dotcinput.length}" class="cform cinput"
				placeholder="Placeholder (empty if omitted)">
				</div>
		`);

		showPencil();
	});
}
