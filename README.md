# goit-neo-node-rest-api

Homework. Topic 4. REST API

Create a REST API for managing a contacts collection. Use Postman to test your REST API.

## Step 1

Create a repository named goit-node-rest-api and add the contents of the src folder to the main branch.
Note: Do not include the src folder itself — only its contents.
Create a branch named hw02-express from main.
Install the required modules by running:


npm i


## Step 2

Copy the functions from the contacts.js file from Module 1 homework into the contactsServices.js file (located in the services folder).



## Step 3

Implement the controllers in the contactsControllers.js file (located in the controllers folder) according to the following specifications.


The REST API should support the following routes:

GET /api/contacts

Calls the listContacts service function to work with the contacts.json file
Returns an array of all contacts in JSON format with status code 200


GET /api/contacts/:id

Calls the getContactById service function to work with the contacts.json file
If the contact by id is found, returns the contact object in JSON format with status code 200
If the contact is not found, returns JSON: {"message": "Not found"} with status code 404


DELETE /api/contacts/:id

Calls the removeContact service function to work with the contacts.json file
If the contact by id is found and deleted, returns the deleted contact object in JSON format with status code 200
If the contact is not found, returns JSON: {"message": "Not found"} with status code 404


POST /api/contacts

Accepts a body in JSON format with the fields {name, email, phone}. All fields are required — create a validation schema using the joi package in the contactsSchemas.js file (located in the schemas folder)
If any required fields are missing from the body, or contain invalid values, return JSON: {"message": error.message} (where error.message is a meaningful validation message) with status code 400
If the body is valid, call the addContact service function to write to the contacts.json file using the data from the body
On success, return the newly created contact object {id, name, email, phone} with status code 201


PUT /api/contacts/:id

Accepts a body in JSON format with any combination of fields to be updated (name, email, phone)
(You should not require all fields to be present — if a field is not provided, its existing value should remain unchanged)
If the update request is made without any fields in the body, return JSON: {"message": "Body must have at least one field"} with status code 400
Validate the fields in the body using a schema created with the joi package in contactsSchemas.js
If any field is invalid, return JSON: {"message": error.message} with status code 400
If the body is valid, call the updateContact service function (which you should implement in contactsServices.js). This function should take the contact's id and the update data and apply the changes in the contacts.json file
On success, return the updated contact object with status code 200
If the contact is not found, return JSON: {"message": "Not found"} with status code 404


Note! 


You can validate the body inside the controller, or you can create a separate middleware for this purpose. To create middleware, use the validateBody.js helper found in the helpers folder.
To handle errors, you can use the HttpError.js helper, also located in the helpers folder.


# For testing i PowerShell use this sentence:

1. GET all contacts
Invoke-RestMethod -Uri "http://localhost:3000/api/contacts" -Method Get


Explanation: Retrieves all contacts from the API.

2. GET a contact by ID
$contactId = "05olLMgyVQdWRwgKfg5J6"
Invoke-RestMethod -Uri "http://localhost:3000/api/contacts/$contactId" -Method Get


Explanation: Retrieves a specific contact by its ID. If the contact doesn’t exist, you’ll get a 404 response with {"message": "Not found"}.

3. POST (create a new contact)
$body = @{
    name  = "Mango"
    email = "mango@gmail.com"
    phone = "322-22-22"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/contacts" -Method Post -Body $body -ContentType "application/json"


Explanation: Adds a new contact. All fields are required. Returns the newly created contact with status 201.

4. PUT (update a contact by ID)
$contactId = "05olLMgyVQdWRwgKfg5J6"
$updateBody = @{
    phone = "123-456-789"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/contacts/$contactId" -Method Put -Body $updateBody -ContentType "application/json"


Explanation: Updates the contact with the given ID. You can include any combination of fields. Returns the updated contact.

5. DELETE a contact by ID
$contactId = "05olLMgyVQdWRwgKfg5J6"
Invoke-RestMethod -Uri "http://localhost:3000/api/contacts/$contactId" -Method Delete


Explanation: Deletes the contact with the given ID. Returns the deleted contact or {"message": "Not found"} if the ID doesn’t exist.