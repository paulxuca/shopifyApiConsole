# shopifyApiConsole
Interactive Shopify Api Documentation - created as part of my application to Shopify

# Why?  
Interactive API documentation provides developers another way to learn about how to use a company's API by providing real data returned on each request. Shopify has over __35__ API endpoints and as a result, many of the endpoints become forgotten or not noticed until the developer eventually has to use it. Furthermore, each Shopify store is different and one generic example to show how an API works is not enough. In today's world, user experience is not the end-all, and __developer experience__ is just as important.

# Solution  
By building documentation that has a built in API caller, the user is able to use a real store and see real data returned on each request.
![App picture](https://raw.githubusercontent.com/paulxuca/shopifyApiConsole/master/apiExample.png)
The documentation is completely dynamic and is fed data through a single file, which can be extended as nessecary as the documentation grows in size. While only 3 endpoints have been implemented, the rest of the Shopify API endpoints can be just as easily edited through the ```endpoints.js``` file in the ```constants``` folder.
