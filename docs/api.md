# API Documentation

## Stations
### Fetch all stations
```
GET /api/stations?limit={{limit}}&offset={{offset}}&language={{language}}&order_by={{order_by}}&order={{order}}
```
| Parameter | Type   | Required? | Default | Description                                                          |
|-----------|--------|-----------|---------|----------------------------------------------------------------------|
| limit     | number | no        | 20      | Number of stations returned.                                         |
| offset    | number | no        | 0       | Offset for pagination.                                               |
| language  | enum   | no        | en      | Language for name, address and station city. Supports fi, en and sv. |
| order_by  | enum   | no        | id      | Sort stations by? Supports id and name.                              |
| order     | enum   | no        | ASC     | Sort direction. Supports ASC and DESC.                               |

**Example response**
```
{
    "data": [
        {
            "id": "001",
            "name": "Kaivopuisto",
            "address": "Meritori 1",
            "city": "Helsinki",
            "maximumCapacity": 30,
            "latitude": "24.950211",
            "longitude": "60.155370"
        },
        {
            "id": "002",
            "name": "Laivasillankatu",
            "address": "Laivasillankatu 14",
            "city": "Helsinki",
            "maximumCapacity": 12,
            "latitude": "24.956510",
            "longitude": "60.160989"
        }
    ]
}
```


### Fetch single station
```
GET /api/stations/{{id}}?language={{language}}
```
| Parameter | Type   | Required? | Default | Description                                                          |
|-----------|--------|-----------|---------|----------------------------------------------------------------------|
| id        | string | yes       | -       | Id of station to fetch.                                              |
| language  | enum   | no        | en      | Language for name, address and station city. Supports fi, en and sv. |

**Example response**
```
{
    "data": {
        "id": "074",
        "name": "Råholmsvägen",
        "address": "Råholmsvägen",
        "city": "Helsingfors",
        "maximumCapacity": 16,
        "latitude": "24.911058",
        "longitude": "60.183126"
    }
}
```

### Fetch station statistics
```
GET /api/stations/{{id}}/statistics?start_date={{start_date}}&end_date={{end_date}}
```
| Parameter  | Type   | Required? | Default | Description                             |
|------------|--------|-----------|---------|-----------------------------------------|
| id         | string | yes       | -       | Id of station to fetch statistics from. |
| start_date | date   | no        | -       | Filter by date, start of range.         |
| end_date   | date   | no        | -       | Filter by date, end of range.           |

**Example response**
```
{
    "data": {
        "arrivalsCount": "2496",
        "departuresCount": "2522",
        "arrivalsAverageDistance": 2554.9294871794873,
        "departuresAverageDistance": 2486.403647898493
    }
}
```
