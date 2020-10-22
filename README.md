This is a minimal chat, that uses Websockets to chat with all connected clients. 

The backend is on Kotlin - Ktor, with Postgres as a backing DB. The frontend is on JS - React.

To get started with no extra config, simply run `docker-compose up`.  
This will build and start the UI, API, and database at the following locations:  
UI - `http://localhost`  
API - `http://localhost:8080`  
DB - `http://localhost:5432`  

You can start each service individually if you prefer. 
For UI, run 
```
cd ./client
yarn
yarn start
```
For API, run 
```
cd ./server
DB_HOST=<your postgres DB host:PORT> gradle run
```

Usage:
- For signup, pick a username and password (no restrictions on them - just not blank)
- Logging in will retreive recent messages

Limitations:
- Chat is global - no separate rooms in a given server
- The URL of the server is hardcoded to be localhost:8080
- DB Configuration parameters are hardcoded (database name, username, password)
- UI is minimal
- If you're logging in, it will retreive only the last 50 messages
- Pagination is not implemented for messages
- No loaders
- Infrastructure support exists for showing pending messages, but has not been implemented at the UI level.
