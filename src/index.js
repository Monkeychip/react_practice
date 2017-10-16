import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; //relative path, only do if file you wrote not a node package.
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBVL04LxFtkqyE09oSzdaz-ecI8dh9ReGk';


class App extends Component  { 
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};		

		this.videoSearch('science');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
			 videos: videos,
			 selectedVideo: videos[0]
			});
		});
	}
	
	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} /> 
			</div>
		);	
	}
	
}

ReactDOM.render(<App />, document.querySelector('.container')); //instance and then where in html doc
