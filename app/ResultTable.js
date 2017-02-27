import React from "react";
import { Map as iMap } from "immutable";

const ResultTable = ({ data,
							  page,
							  sortColumn,
							  filterBy }) => {

// getTableHeader gets the keys of the properties,
// so we can layout the header row of the table 
// based on the keys.
	let getTableHeader,
		 rowsPerPage = page.rowCount, // no of repos to show on a page
		 pageNum = page.pageNum,
		 startFrom = ( pageNum * rowsPerPage ) - rowsPerPage,
		 endTo = ( pageNum * rowsPerPage ) - 1;

	if( data.size > 1 ){
		let firstSet = iMap( data.get( 0 ));
		getTableHeader = firstSet.valueSeq().map(( entry, i ) => {
			let heading = firstSet.keyOf( entry );
			return(
				<th className = "tHeader"
					 onClick = {() => sortColumn( heading )}
					 key = { `th${ i }` }>
					{ heading }
				</th>
			);
		});
	}

// getTableData maps through the data (response from ajax)
// & maps each repo to a row in the table.
	let getTableData = data.valueSeq().map(( eachRow, i ) => {
		console.log( "within getTableData, ", startFrom, endTo, eachRow );
		if(( i >= startFrom ) && ( i <= endTo )){
			if( iMap( eachRow ).includes( filterBy ) || filterBy == "" ){
				return(
					<tr className = "tRow"
						key = { `tRow${ i }` }>
						{(( row ) => {
							return( iMap( row ).valueSeq().map(( entry, l ) => {
								if( typeof( entry ) !== "object" ){
									return(
										<td className = "tData"
											key = { `td${ l }` }>
											{ entry }
										</td>
									);
								} else return false;
							}));
						})( eachRow )}
					</tr>
				);
			}
		}
	});

	return(
		<table className = "resultTable" >
			<thead>
				<tr>
					{ getTableHeader }
				</tr>
			</thead>
			<tbody>
				{ getTableData }
			</tbody>
		</table>
	);
};

export default ResultTable;