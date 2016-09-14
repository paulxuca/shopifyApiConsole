import React from 'react';
import { performApiRequest } from './constants/helpers';

const inputField = (type, placeholder, field) => {
	return (
		<div className="form-group" key={field}>
			<label htmlFor={field} className="apiCallerLabel">{field}</label>
			<input id={field} type={type} placeholder={placeholder} className="apiCallerInput"/>
		</div>
	);
}


class ApiCaller extends React.Component {
	constructor() {
		super();
		this.state = {
			isFetching: false,
		};
	}

	onApiCall = (e) => {
		e.preventDefault();
		this.setState({ isFetching: true });
		const form = e.target;
		const formData = {};
		for(let iter = 0; iter < form.elements.length; iter++) {
			const currentTag = form.elements[iter];
			if (currentTag.tagName === 'INPUT') {
				formData[currentTag.id] = currentTag.value;
			}
		}
		performApiRequest(this.props.storeName, this.props.storeToken, this.props.fields.endpoint, this.props.fields.method, formData)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
	if(this.props.fields) {
		return(
	      <div className="apiCallerContainer" style={{ marginTop: 20 }}>
	      <div className="eachEndpoint">
			<div className="endpointLink">
				<div className="endpointMethod" style={{ backgroundColor: '#f9fafa', color: '#000' }}>
					<span>{this.props.fields.method}</span>
				</div>
				<div className="endpointURL" style={{ backgroundColor: '#d5dede', color: '#000' }}>
					<span>{this.props.fields.endpoint}</span>
				</div>
			</div>
			<div className="endpointDescription" style={{ backgroundColor: '#f9fafa' }}>
				<span>{this.props.fields.description}</span>
			</div>
			<div className="endpointFields">
				{this.props.fields.fields.map((each) => {
					return (
						<div key={each.name} className="endpointFieldItem">
							<div className="endpointFieldName" style={{ backgroundColor: '#f9fafa', color: '#000' }}>
								<span>{each.name}</span>
							</div>
							<div className="endpointFieldDescription" style={{ backgroundColor: '#d5dede', color: '#000' }}>
								<span>{each.description}</span>
							</div>
						</div>
					);
				})}
			</div>
			</div>
	      	<h6 className="apiDocsHeader small" style={{ color: 'white', marginTop: 20 }}>Request Fields</h6>
	        <form className="apiCallerForm" onSubmit={this.onApiCall}>
	        	{this.props.fields.fields.map((each) => {
	        		return inputField(each.type, each.placeholder, each.name);
	        	})}
	        <button type="submit" className="buttonblue modified" disabled={this.state.isFetching}>Try it out</button>
	        </form>
	      </div>
	);
	}
	return null
	}
}

export default ApiCaller;