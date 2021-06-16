import axios from "axios";
import React, {useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import ListImages from "./components/ListImages";

function App() {
	const [search, addSearch] = useState("");
	const [images, addImages] = useState([]);
	const [paginaActual, addPaginaActual] = useState(1);
	const [totalPaginas, addTotalPaginas] = useState(1);

	useEffect(() => {
		const consultApi = async () => {
			if (search === "") return;
			const imagesToPage = 30;
			const apiKey = "22097413-ea8f5170a29ed4015a8fd19ec";
			const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&per_page=${imagesToPage}&lang=es&page=${paginaActual}`;
			const result = await axios.get(url);
			addImages(result.data.hits);

			//Calcular total de totalPaginas
			const calcularTotalP = Math.ceil(result.data.totalHits / imagesToPage);
			addTotalPaginas(calcularTotalP);

			//Mover pantalla hacia arriba
			const jumbotron = document.querySelector(".jumbotron");

			jumbotron.scrollIntoView({behavior: "smooth"});
		};

		consultApi();
	}, [search, paginaActual]);

	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaActual - 1;

		if (nuevaPaginaActual === 0) return;

		addPaginaActual(nuevaPaginaActual);
	};

	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaActual + 1;

		if (nuevaPaginaActual > totalPaginas) return;

		addPaginaActual(nuevaPaginaActual);
	};

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de imagenes</p>
				<Formulario
					addSearch={addSearch}
					addPaginaActual={addPaginaActual}
					addTotalPaginas={addPaginaActual}
				/>
			</div>

			<div className="row justify-content-center">
				<ListImages images={images} />

				{paginaActual === 1 ? null : (
					<button
						className="btn btn-info mr-1"
						type="button"
						onClick={paginaAnterior}
					>
						Anterior
					</button>
				)}

				{paginaActual === totalPaginas ? null : (
					<button
						className="btn btn-info "
						type="button"
						onClick={paginaSiguiente}
					>
						Siguiente
					</button>
				)}
			</div>
			{totalPaginas === 1 ? null : (
				<p className="text-center">
					Pagina {paginaActual} de {totalPaginas}
				</p>
			)}
		</div>
	);
}

export default App;
