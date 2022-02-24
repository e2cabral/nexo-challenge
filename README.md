# Nexo Challenge

### Run database
```shell
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

### Endpoint to test the functionality
```http request
POST http://localhost:3000/orders/1 HTTP/1.1
```