import React from "react";
import PropTypes from "prop-types";
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

ListImages.prototype = {
	images: PropTypes.array.isRequired,
};

export default ListImages;
