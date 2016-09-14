import React from 'react';
import Highlight from 'react-highlight'

export default class RequestComponent extends React.Component {
	render() {
		if(this.props.data.data && this.props.lastRequestData) {
			const { header, result } = this.props.data.data.data;
			return (
			<div className="requestComponent">
				<h6 className="apiDocsHeader small" style={{ color: 'white', marginTop: 20 }}>Request</h6>
				<pre className="networkBackground">
					<p>{this.props.lastRequestData.method} {this.props.lastRequestData.endpoint} HTTP/1.1</p>
					<p>Host: https://{this.props.lastRequestData.store}.myshopify.com</p>
					<p>Accept-Encoding: gzip, deflate, compress</p>
					<p>Accept: application/json</p>
					<p>User-Agent: Shopify API Console v0.1</p>
				</pre>
				<h6 className="apiDocsHeader small" style={{ color: 'white', marginTop: 20 }}>Response</h6>
				<pre className="networkBackground" style={{ borderRadius: '5px 5px 0px 0px', marginBottom: 0 }}>
					<p>HTTP/1.1 {this.props.data.data.status} {this.props.data.data.statusText}</p>
					<p>Date: {header.date}</p>
					<p>Server: {header.server}</p>
					<p>X-Shopid: {header['x-shopid']}</p>
					<p>X-request-id: {header['x-request-id']}</p>
					<p>X-shopify-shop-api-call-limit: {header['x-shopify-shop-api-call-limit']}</p>
				</pre>
				<pre className="networkBackground" style={{ borderRadius: '0px 0px 5px 5px', marginTop: 0, backgroundColor: '#444c4c' }}>
					<Highlight className="javascript">
						{JSON.stringify(result, undefined, 2)}
					</Highlight>
				</pre>
			</div>
			);
		}
		return null;
	}
}