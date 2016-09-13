import React from 'react';

export default class EndpointListItem extends React.Component {
  render() {
    return(
      <li className={this.props.selected ? "listItemSelected" : ''} onClick={() => this.props.onClickEndpoint(this.props.data.name)}>
        {this.props.data.name}
      </li>
    );
  }
}