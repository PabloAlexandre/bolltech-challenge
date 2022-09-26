# Bolltech Challenge

## Running project

This project uses docker & docker-compose to run easilly on localhost. You need to run:


```
sudo docker-compose up -d
```

After that, you will need to enter on api container to run all migrations

```
sudo docker-compose exec api /bin/bash && npm run migration:apply
```

The API Address will be `http://localhost:8000` (You can check documentation on `http://localhost:8000/docs`)

The Client Address will be `http://localhost:3000`