import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [frases, setFrase] = useState([
		"Wash the dishes",
		"Clean my room",
		"Cook"
	]);

	let [tarea, setTarea] = useState("");

	const updatedtoDo = frases.map((listItems, i) => {
		return (
			<li className="ul" key={i} onClick={() => deleteToDo(i)}>
				{listItems}
			</li>
		);
	});
	let lista = <ul className="list-group m-5">{updatedtoDo}</ul>;

	function handleChange(k) {
		if (k.keyCode === 13) {
			setFrase([...frases, tarea]);
			console.log(tarea);
		}
	}
	function deleteToDo(i) {
		let borrar = frases.filter(item => item !== frases[i]);
		setFrase(borrar);
	}

	return (
		<div className="cuadro">
			<h1>Todos</h1>
			<div sytle="mt-2">
				<input
					className="entrada"
					type="text"
					onChange={e => setTarea(e.target.value)}
					onKeyUp={k => handleChange(k)}
					value={tarea}
					required
				/>
				<div className="listas">{lista}</div>
			</div>
			<section> tienes {frases.length} tareas por completar </section>
		</div>
	);
}
