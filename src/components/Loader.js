import React from 'react';
import Loading from 'react-loading';

function Loader({ className }) {
	return(
	<div className={`fullScreenLoader ${className}`}>
        <Loading type="bubbles" width="100px" />
      </div>
	);
}

export default Loader;
