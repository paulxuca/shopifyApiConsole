export const endpoints = [
	{
		name: 'Blog',
		description: '<p>In addition to an online storefront, Shopify shops come with a built-in blogging engine, allowing a shop to have one or more blogs.</p><p>Shop owners are encouraged to use blogs to:</p><ul><li>Make announcements</li></ul><p>Shopify blogs are like most other blogs: a content management system for articles posted in reverse chronological order. Articles can be posted under one or more user-defined categories and tagged with one or more user-defined tags, with an option to allow readers to post comments to articles. An Atom feed is automatically generated for each blog, allowing for syndication. The search functionality built into every shop also searches the text in blog articles.</p><p>Blogs are meant to be used as a type of magazine or newsletter for the shop, with content that changes over time. If your shop needs a static page (such as an "About Us" page), we recommend that you use a Page instead.</p>',
		actions: [
		{
			method: 'POST',
			endpoint: '/admin/blogs.json',
			shortDescription: 'Create a new blog',
			description: 'Create a new blog',
			fields: [
			{
				name: 'blog',
				description: 'Blog data',
				type: 'text',
				placeholder: '"blog": { "body": "foobar" }'
			}
			]
		}
		]
	}, {
	  	name: 'Country',
	  	description: `<p>Shop owners can specify the <b>country</b> or countries they will ship their products to. Shop owners are able to do this through their shop admin dashboard in the "Settings" tab, under the "Taxes" tab. These countries are made available through the API using the country resource. The countries list resource represents the set of countries that have been specified as shipping destinations, including an additional default 'country' called 'Rest of World', which represents the non-specified countries. An important piece of information included with each country is the country's national sales tax rate, which you can modify to account for surtaxes or exemptions that apply to the shop.</p>`,
	  	actions: [
	  	{
	  		method: 'GET',
	  		endpoint: '/admin/countries.json',
	  		shortDescription: 'Receive a list of countries',
	  		description: 'Get a list of all countries',
	  		fields: [
	  		{
	  			name: 'since_id',
	  			description: 'Restrict results to after the specified ID',
	  			type: 'text',
	  			placeholder: '359115488'
	  		},
	  		{
	  			name: 'fields',
	  			description: 'comma-separated list of fields to include in the response',
	  			type: 'text',
	  			placeholder: 'id,name,tax'
	  		}
	  		]
	  	}, {
	  		method: 'GET',
	  		endpoint: '/admin/countries/count.json',
	  		shortDescription: 'Receive a count of all countries',
	  		description: 'Get a count of all countries',
	  		fields: []

	  	}
	  	]
	  }, {
    name: 'Shop',
    description: `<p>The Shopify API's <b>shop</b> object is a collection of the general settings and information about the shop. Only the shop owner can edit this information from inside their shop admin dashboard by navigating to the "Settings" tab and selecting the "General" tab. The API doesn't let you do anything other than retrieve information about a shop.</p>`,
    properties: [
    	{
    		name: 'address1',
    		example: '{ "address1" : "1 Infinite Loop" }',
    		description: "The shop's street address."
    	}
    ],
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