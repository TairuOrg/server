## Tairu server
> To know more about the API **documentation**, **standard**, **usage** and **samples**, refer to each README located inside of each of our API resource folders. The current state of the API is **NOT producion-ready** until stated the otherwise.

<h1>Server's Endpoint Summary</h1>


<h2>ADMIN</h2>
<ul>
  <li>me GET (returns adminSessionId[x]</li>
  <li>cashier-status GET (returns the count for active and inactive cashiers) [x]</li>
  <li>items-and-categories GET  (returns the count for items and categories) [x]</li>
  <li>todays-revenue GET (returns today's revenue in VES, USD, and EUR [X]</li>
  <li>items GET (returns a list of items in stock)[X]</li>
  <li>reports GET (returns a list of reports) [x]</li>
  <li>cashiers GET (returns a list of cashiers) [x]</li>
</ul>

<h2>CASHIER</h2>

<h2>AUTH</h2>
<ul>
  <li>login POST [x]</li>
  <li>signup-access POST (validates signup code) [x]</li>
  <li>signup-validation POST (validates signup insertion data [x]</li>
  <li>signup-insertion POST (inserts validated signup data [x]</li>
</ul>

