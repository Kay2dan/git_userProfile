import React from "react";

const Pagination = ({ page, updatePage }) => {
	return(
		<div className = "pagination">
			<div className = "leftPage page"
				  onClick = {() => updatePage( "dec" )}></div>
			<div className = "pageNum">
				{ page.pageNum }
			</div>
			<div className = "rightPage page"
				  onClick = {() => updatePage( "inc" )}></div>
		</div>
	);
};

export default Pagination;