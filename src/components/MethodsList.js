import React from 'react';

class MethodsList extends React.Component {
	onClickEndpoint(e) {
		this.props.onClickEndpoint(this.props.data[e]);
	}

	render() {
		if (this.props.dataType) {
			return (
				<div>
					<h2 className="methodsListHeader">What can you do with {this.props.dataType}?</h2>
					<p>The Shopify API lets you do the following with the {this.props.dataType} resource. More detailed versions of these general actions may be available:</p>
					<ul className="methodsListItems">
					{this.props.data.map((each, index) => {
						return (
							<li
								key={each.endpoint}
								onClick={() => this.onClickEndpoint(index)}
							>
								<span className="methodsListItem">{each.method} {each.endpoint}</span><span className="methodsListItemDescription">{each.description}</span>
							</li>);
					})}
					</ul>

					<h2 className="methodsListHeader">Endpoints</h2>
					{this.props.data.map((each) => {
						return (
							<div key={each.endpoint} className="eachEndpoint">
								<div className="endpointLink">
									<div className="endpointMethod">
										<span>{each.method}</span>
									</div>
									<div className="endpointURL">
										<span>{each.endpoint}</span>
									</div>
								</div>
								<div className="endpointDescription">
									<span>{each.description}</span>
								</div>
								<div className="endpointFields">
									{each.fields.map((each) => {
										return (
											<div key={each.name} className="endpointFieldItem">
												<div className="endpointFieldName">
													<span>{each.name}</span>
												</div>
												<div className="endpointFieldDescription">
													<span>{each.description}</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			);
		}
		return null;
	}
}

export default MethodsList;