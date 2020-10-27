# MERN-JWT Boilerplate

This project is intended as a boilerplate for MERN projects that involve protected routes that require user authentication. The JWTs are stored in httpOnly cookies to prevent malicious javascript attacks. This also allows for users to retain their session and not have to log back in every time they refresh or re-revisit the webpage.

## Quickstart: 

Create a .env file in the server folder. Place your MongoDB Atlas URL: 
     
    CONNECTION_URL=YourMongoDBAtlasConnectionURL

Visit */server/keys/* and run 
    
    ./keygen.sh

This will generate the public and private keys for the JWT encryption/verification.

Visit both *client* and *server* folders and run

    npm run install

to get the required dependencies.

Then simply bring the client and server online by visiting their respective folders and running:

Client: ```npm run start```

Server: ```npm run dev``` 

Visit the client at: http://localhost:3000