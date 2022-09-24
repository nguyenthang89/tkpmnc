# tkpmnc

RUN SERVER

- yarn install
- yarn start

- CHANGES TO YOUR USER AND DATABASE PASSWORD IN db.config.js FILE
![image](https://user-images.githubusercontent.com/74232244/192090782-3d05ecbe-e162-446b-8829-b3950ebc4c2a.png)

SIGN UP
http://localhost:8080/api/auth/signup
Body example:
{
    "username": "admi",
    "email": "thang111@gmail.com",
    "password": "111111",
    "roles": ["admin"]    
}
![image](https://user-images.githubusercontent.com/74232244/192092050-7ce6afdb-56c1-4b87-bc6c-4183cb2b3398.png)

SIGN IN
http://localhost:8080/api/auth/signin
Body example:
{
    "username": "admin",
    "password": "111111"
}
![image](https://user-images.githubusercontent.com/74232244/192092056-c1492d42-7bd8-4114-87bb-c5edb78365fd.png)

