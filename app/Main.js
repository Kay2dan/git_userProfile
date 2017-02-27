import "./asset/main.css";
import React from "react";
import axios from "axios";
import { List as iList } from "immutable";
import InputForm from "./InputForm";
import ResultTable from "./ResultTable";
import Pagination from "./Pagination";

class Main extends React.Component {
	constructor( props ){
		super( props );
		this.state = {
			fetching : false,
			page : {
				pageNum : 1,
				rowCount : 5,
			},
			sort : {
				sortOrder : "ascending",
				sortCategory : "",
			},
			filter : "",
			repos : iList()
		};
		this.getGitHubRepo = this.getGitHubRepo.bind( this );
		this.sortColumn = this.sortColumn.bind( this );
		this.paginate = this.paginate.bind( this );
		this.setFilterState = this.setFilterState.bind( this );
	}


// func for ajax request & posting it to state
	getGitHubRepo( user ){
		this.setState({ fetching : true });
		axios.get( `https://api.github.com/users/${ user }/repos` )
			.then(( response ) => {
				console.log( response );
				this.setState( Object.assign({},
					this.state,
					{ fetching : false },
					{
						page : {
							pageNum : 1,
							rowCount : this.state.page.rowCount
						}
					},
					{
						repos : iList( response.data )
					}));
				console.log( "this.state", this.state );
			})
			.catch(( error ) => {
				console.log( error );
				alert( "Mayday! There was an error!" );
			});
	}


	sortColumn( sortByCategory ){
		let repo = this.state.repos,
			 sortOrder = (( this.state.sort.sortCategory === sortByCategory )
							  && ( this.state.sort.sortOrder === "ascending" )) ?
								"descending" : "ascending";
		console.log( "variables are...", `${this.state.sort.sortCategory} ,, ${ sortByCategory } ,, ${ this.state.sort.sortCategory == sortByCategory } ,, ${sortOrder}` );
		let sortedRepo = repo.sort(( a, b ) => {
			if( sortOrder === "ascending" ){
				console.log( "a[ sortByCategory ] = ascending" );
				if( a[ sortByCategory ] >= b[ sortByCategory ]){ return 1; }
			}
			if( sortOrder === "descending" ){
				console.log( "b[ sortByCategory ] = descending" );
				if( a[ sortByCategory ] <= b[ sortByCategory ]){ return -1; }
			}
			return 0;
		});
		this.setState( Object.assign({},
			this.state,
			{
				sort : {
					sortOrder : sortOrder,
					sortCategory : sortByCategory
				}
			},
			{
				page : {
					pageNum : 1,
					rowCount : this.state.page.rowCount
				}
			},
			{ repos : sortedRepo }));
	}


	paginate( incOrDec ){
		let pageNum = this.state.page.pageNum,
			 totalPage = this.state.repos.size / this.state.page.rowCount,
			 updatedPage = ( incOrDec === "inc" ) ? pageNum++ : pageNum--;
		if( updatedPage < 1 ){
			updatedPage = 1;
		} else if( updatedPage > totalPage ){
			updatedPage = totalPage;
		}
		this.setState( Object.assign({},
			this.state,
			{
				page : {
					pageNum : updatedPage,
					rowCount : this.state.page.RowCount
				}
			}));
	}


	setFilterState( filterBy ){
		this.setState( Object.assign({},
			this.state,
			{
				filter : filterBy
			}
		));
	}

	render(){
		return(
			<div className = "appContainer">
				<InputForm title = "Github username"
							  onSubmitCall = { this.getGitHubRepo }
							  autoFocusStatus = { true }
							  fetchStatus = { this.state.fetching } />
				<InputForm title = "filter by"
							  onSubmitCall = { this.setFilterState }
							  autoFocusStatus = { false }
							  fetchStatus = { this.state.fetching } />
				<ResultTable data = { this.state.repos }
								 page = { this.state.page }
								 sortColumn = { this.sortColumn }
								 filterBy = { this.state.filter } />
				<Pagination page = { this.state.page }
								updatePage = { this.paginate } />
			</div>
		);
	}

}

export default Main;