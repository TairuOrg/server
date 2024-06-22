## Tairu server
> To know more about the API **documentation**, **standard**, **usage** and **samples**, refer to each README located inside of each of our API resource folders. The current state of the API is **NOT producion-ready** until stated the otherwise.

<h1>Server's Endpoint Summary</h1>


<h2>ADMIN</h2>
<ul>
  <li>[x] me GET (returns adminSessionId)</li>
  <li>[x] cashier-status GET (returns the count for active and inactive cashiers) </li>
  <li>[x] items-and-categories GET  (returns the count for items and categories) </li>
  <li>[x] todays-revenue GET (returns today's revenue in VES, USD, and EUR) </li>
  <li>[x] items GET (returns a list of items in stock)</li>
  <li>[x] reports GET (returns a list of reports) </li>
  <li>[x] cashiers GET (returns a list of cashiers) </li>
  <li>[x] sales GET (returns a list of sales)</li>
  <li>[x] clients GET (returns a list of clients)</li>
  <li>[x] client-validation POST (validates a client's data)</li>
  <li>[x] client-update POST (updates a client)</li>
  <li>[ ] cliente-delete POST (deletes a specific client)</li>
  <li>[ ] new-cashier-validation POST (validates cashier insertion data) </li>
  <li>[ ] new-cashier-insertion POST (inserts a new cashier) </li>
  <li>[ ] item-validation POST (validates item insertion, or update data) </li>
  <li>[ ] new-item-insertion POST (inserts a new item) </li>
  <li>[ ] item-update POST (updates an item's data) </li>
  <li>[ ] item-delete POST (deletes a specific item) </li>
  <br>
  <li>TBD: Reports generation</li>
</ul>

<h2>CASHIER</h2>

<ul>
  <li>[ ] me GET (returns cashierSessionId)</li>
  <li>[ ] items GET (returns a list of items in stock)</li>
  <li>[ ] client-verification POST (validates whether is already registered or not)</li>
  <li>[ ] client validation POST (validates a new client insertion data)</li>
  <li>[ ] client-insertion POST (inserts a new client)</li>
  <li>[ ] new-sale POST (registers a new sale)</li>
  <li>[ ] add-article POST (adds articles to a sale)</li>
  <li>[ ] remove-article POST (removes articles from a sale)</li>
  <li>[ ] cancel-sale POST (cancels a sale)</li>
</ul>
<h2>AUTH</h2>
<ul>
  <li>[x] login POST </li>
  <li>[x] signup-access POST (validates signup code)</li>
  <li>[x] signup-validation POST (validates signup insertion data)</li>
  <li>[x] signup-insertion POST (inserts validated signup data)</li>
  <li>[ ] logout POST (logs out the current user, updates cashier session if the user is a cashier)</li>
</ul>

