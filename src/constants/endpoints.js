export const endpoints = [
  {
    name: 'Shop',
    description: `<p>The Shopify API's <b>shop</b> object is a collection of the general settings and information about the shop. Only the shop owner can edit this information from inside their shop admin dashboard by navigating to the "Settings" tab and selecting the "General" tab. The API doesn't let you do anything other than retrieve information about a shop.</p>`,
    actions: [
    	{
    		method: 'GET',
    		endpoint: '/admin/shop.json',
    		shortDescription: 'Receive a single Shop',
    		description: 'Get the configuration of the shop account',
    		fields: [
	    		{
	    			name: 'fields',
	    			description: 'comma-separated list of fields to include in the response',
	    			type: 'text',
	    			placeholder: 'id,email'
	    		}
    		]
    	}
    ],
  }
];