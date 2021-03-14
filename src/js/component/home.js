import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let [frases, setFrase] = useState([]);

	let [tarea, setTarea] = useState("");

	const updatedtoDo = frases.map((listItems, i) => {
		return (
			<li className="ul" key={i} onClick={() => deleteToDo(i)}>
				{listItems.label}
			</li>
		);
	});
	let lista = <ul className="list-group m-5">{updatedtoDo}</ul>;

	function handleChange(k) {
		if (k.keyCode === 13) {
			setFrase([...frases, { label: tarea, done: false }]);
			console.log(frases);
			actualizar(frases);
		}
	}
	function actualizar(frases) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(frases);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/cris010411",
			requestOptions
		)
			.then(response => response.text())
			.then(result =>
				setTarea(
					result.map(item => {
						return { label: item.label, done: item.done };
					})
				)
			)
			.catch(error => console.log("error", error));
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
