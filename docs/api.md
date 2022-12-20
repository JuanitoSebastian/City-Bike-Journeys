# API Documentation

## Stations
### Fetch all stations
```
GET /api/stations?limit={{limit}}&offset={{offset}}&language={{language}}
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
| id        | number | yes       | -       | Id of station to fetch.                                              |
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
