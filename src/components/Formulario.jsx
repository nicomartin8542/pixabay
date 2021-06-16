import React, {useState} from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Formulario = ({addSearch, addPaginaActual}) => {
	const [termino, addTermino] = useState("");
	const [error, addError] = useState(false);

	const searchImage = (e) => {
		e.preventDefault();

		if (termino === "") {
			addError(true);
			return;
		}

		addError(false);
		addPaginaActual(1);
		addSearch(termino);
	};

	return (
		<form onSubmit={searchImage}>
			<div className="row">
				<div className="form-group col-md-8">
					<input
						type="text"
						className="form-control form-control-lg"
						placeholder="Busca Imagen, ejemplo: futbol o cafe"
						onChange={(e) => addTermino(e.target.value)}
					/>
				</div>
				<div className="form-group col-md-4">
					<input
						type="submit"
						className="btn btn-lg btn-danger btn-block"
						value="Buscar"
					/>
				</div>
			</div>
			{error ? <Error mensaje="Agrega un termino de busqueda" /> : null}
		</form>
	);
};

Formulario.prototype = {
	addSearch: PropTypes.func.isRequired,
	addPaginaActual: PropTypes.func.isRequired,
};

export default Formulario;
