# Secure Image Repository API
The Secure Image Repository API features encrypted private and non-encrypted public image storage/sharing, user-to-user image transfer, and request authentication via user credentials. Powered by NodeJS (Express, Sequelize, Jest) and PostgreSQL.


------
### How to start the application locally
1. Excecute `npm install` (if you have not done so already)
2. Start Docker and execute `docker run --name db -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres`
3. Then, once the database is active, execute `npm start`
    - If the database is not yet running, you will get an error stating: "SequelizeConnectionError: Connection terminated unexpectedly". To resolve this issue, wait until the postgres server is active and execute the command again.


### General interaction flow
1. Create a new user via `POST http://localhost:8080/user` (since each image is associated to a user)
2. Upload an image via `POST http://localhost:8080/image`
3. Then you can manipulate the uploaded data (delete, list, transfer, download) using the various functions listed below in the API summary (i.e. download via `GET http://localhost:8080/image?imageId={imageId}`) 


------
### API Summary
- **General notes**:
    - All parameters sent in the body of requests must be in the format of `form-data`
    - If you are using Postman, you can have the authorization header (including encoding) be auto-generated by selecting `Basic Auth` as the type in the `Authorization` section of the request generation
        - If not using Postman, an example authentication entry located in the header is:
            - Actual value: `1:password` (repersenting userId=1 and userPassword=password)
            - Entry in header: `authorization: Basic MTpwYXNzd29yZA`
    - Screenshots of common request operations in Postman can be found below this section

#### User
- `POST http://localhost:8080/user` 
    - Create a new user. Returns the new user id and password
    - **Request requirements**:
        - Body: `password` (desired password for the user)
- `GET http://localhost:8080/user`
    - Get all users in the database. Returns a list of user objects in the database
    - **Request requirements**: no additional fields

#### Image
- `POST http://localhost:8080/image`
    - Uploads a new image to the database. Returns the imageId of the uploaded image
    - **Request requirements**: 
        - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 
        - Body: `image` (file to upload), `is-private` (true or false, sets privacy permission)
- `PUT http://localhost:8080/image/transfer`
    - Transfers an image owned by the requesting user to a target user
    - **Request requirements**:
        - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 
        - Body: `send-to-user-id` (userId of user to transfer image to), `image-id` (image to transfer that is owned currently by the requesting user)
- `GET http://localhost:8080/image?image-id={target-image-id}`
    - Gets an uploaded image with imageId {targetImageId} (if the requesting user has permission)
    - **Request requirements**: 
       - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 
- `GET http://localhost:8080/image/info?image-id={target-image-id}`
    - Gets the metadata information of an uploaded image with imageId {targetImageId} (if the requesting user has permission)
    - **Request requirements**: 
        - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 
- `GET http://localhost:8080/image/info`
    - Gets the metadata information of all uploaded image for the requesting user
    - **Request requirements**: 
        - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 
- `GET http://localhost:8080/image/info/public`
    - Gets the metadata information of all publically uploaded images in the database
    - **Request requirements**: no additional fields
- `DELETE http://localhost:8080/image/{target-image-id}`
    - Deletes an image with imageId of target-image-id from the database (if the requesting user has permission)
    - **Request requirements**:
        - Header: `authorization: Basic <credentials>` (requester's credentials, formatted `userId:password` encoded in Base64) 

### Postman Request Screenshots
TODO
