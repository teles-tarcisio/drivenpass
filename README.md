# API DrivenPass

## Description
This is an API for storage and management of confidential user information. It's possible to store and delete user information as:
- encrypted service/site credentials
- personal safe notes
- encrypted credit/debit cards data and passwords
- encrypted wifi networks names and passwords

## Usage
- Users must register to the api using a valid e-mail address and a password (at least 10 characters long)
- Users can login to the API with the e-mail and password used in registration, a token will be returned in case of correct login

```bash
$ git clone https://github.com/teles-tarcisio/drivenpass

$ cd drivenpass

$ npm install

$ npx prisma migrate dev

$ npm run dev
```

## API:
If running locally, the default prefix for the endpoints is "http://localhost:5000"

### "user" endpoints:
```
- POST /sign-up
    - Route for registering a new user
    - headers: {}
    - body: {
        "email": "example@email.com",
        "password": "0123456789A" (minimum 10 characters)
        }
        
- POST /sign-in
    - Route to log-in in the application, a token will be returned in case of success
    - headers: {}
    - body: {
        "email": "example@email.com",
        "password": "0123456789A" (minimum 10 characters)
        }
```

### "credentials" endpoints:
```
- POST /credentials/new
    - Route to store a credential for the user
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {
        "url": "https://www.uol.com",
        "tag": "UOL001",
        "credentialUsername": "usuarioUOL001",
        "credentialPassword": "senhaUOL"
        }

- GET /credentials/get?id=X
    - Route to get the user credentials. The query string is optional, but if present must be a valid number. Without the query string, all credentials for the user will be returned
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}

- DELETE /credentials/:id
    - Route to delete a specific user credential. The id param must be a valid number
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}
```

### "safe notes" endpoints:
```
- POST /safenotes/new
    - Route to store a safe note for the user
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {
        "title": "titulo igual",
        "annotation": "000"
        }
        
- GET /safenotes/get?id=X
    - Route to get the user safe notes. The query string is optional, but if present must be a valid number. Without the query string, all safe notes for the user will be returned
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}

- DELETE /safenotes/:id
    - Route to delete a specific user safe note. The id param must be a valid number
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}
```

### "cards" endpoints:
```
- POST /cards/new
    - Route to store a credit/debit/multiple card info for the user
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {
        "tag": "master000",
        "cardNumber": "0123456789ABCDEF",
        "cardholderName": "000 Fulano de Tal",
        "expirationDate": "07-27",
        "securityCode": "master000cvc",
        "password": "master000senha",
        "isVirtual": false | true,
        "type": "credit" | "debit" | "multiple"
    }
        
- GET /cards/get?id=X
    - Route to get the user stored cards. The query string is optional, but if present must be a valid number. Without the query string, all cards from the user will be returned
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}

- DELETE /cards/:id
    - Route to delete a specific user card information. The id param must be a valid number
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}
```

### "wifi networks" endpoints:
```
- POST /wifinets/new
    - Route to store a wifi name and password for the user
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {
        "ssid": "AstolfoNet",
        "tag": "wifi000",
        "password": "senhawifi_000"
        }
        
- GET /wifinets/get?id=X
    - Route to get the user stored wifi networks. The query string is optional, but if present must be a valid number. Without the query string, all wifi networks from the user will be returned
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}

- DELETE /wifinets/:id
    - Route to delete a specific user wifi network information. The id param must be a valid number
    - headers: {
        Authorization: "Bearer token"
        }
    - body: {}
```