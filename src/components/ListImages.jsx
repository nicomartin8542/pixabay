import React from "react";
import Image from "./Image";

const ListImages = ({images}) => {
	return (
		<div className="col-12 p-5 row">
			{images.map((img) => (
				<Image image={img} key={img.id} />
			))}
		</div>
	);
};

export default ListImages;
