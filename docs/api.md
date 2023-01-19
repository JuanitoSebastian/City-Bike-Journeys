# API Documentation

## Stations
### Fetch all stations
```
GET /api/station?limit={{limit}}&offset={{offset}}&language={{language}}&order_by={{order_by}}&order={{order}}
```
| Parameter | Type   | Required? | Default | Description                                                                                    |
|-----------|--------|-----------|---------|------------------------------------------------------------------------------------------------|
| limit     | number | no        | 20      | Number of stations returned.                                                                   |
| offset    | number | no        | 0       | Offset for pagination.                                                                         |
| language  | enum   | no        | en      | Language for name, address and station city. Supports fi, en and sv. (ISO 639-1 language code) |
| order_by  | enum   | no        | id      | Sort stations by? Supports id and name.                                                        |
| order     | enum   | no        | ASC     | Sort direction. Supports ASC and DESC.                                                         |

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
    ],
    "paging": {
        "total": 457,
        "page": 0,
        "pages": 229
    }
}
```


### Fetch single station
```
GET /api/station/{{id}}?language={{language}}
```
| Parameter | Type   | Required? | Default | Description                                                                                    |
|-----------|--------|-----------|---------|------------------------------------------------------------------------------------------------|
| id        | string | yes       | -       | Id of station to fetch.                                                                        |
| language  | enum   | no        | en      | Language for name, address and station city. Supports fi, en and sv. (ISO 639-1 language code) |

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
GET /api/station/{{id}}/statistics?start_date={{start_date}}&end_date={{end_date}}
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

# Trips
## Fetch all trips
```
GET /api/trip?limit={{limit}}&offset={{offset}}&language={{language}}
```
| Parameter | Type   | Required? | Default | Description                                                                                    |
|-----------|--------|-----------|---------|------------------------------------------------------------------------------------------------|
| limit     | number | no        | 20      | Number of stations returned.                                                                   |
| offset    | number | no        | 0       | Offset for pagination.                                                                         |
| language  | enum   | no        | en      | Language for station name. Supports fi, en and sv. (ISO 639-1 language code)                   |

**Example response**
```
{
    "data": [
        {
            "id": 392604,
            "startTime": "2021-04-30T21:00:11.000Z",
            "endTime": "2021-04-30T21:04:34.000Z",
            "startStation": "Arabiankatu",
            "endStation": "Arabiankatu",
            "distanceMeters": 1057,
            "durationSeconds": 259
        },
        {
            "id": 785208,
            "startTime": "2021-04-30T21:00:11.000Z",
            "endTime": "2021-04-30T21:04:34.000Z",
            "startStation": "Arabiankatu",
            "endStation": "Arabiankatu",
            "distanceMeters": 1057,
            "durationSeconds": 259
        },
        {
            "id": 785206,
            "startTime": "2021-04-30T21:00:30.000Z",
            "endTime": "2021-04-30T21:11:55.000Z",
            "startStation": "Narinkka",
            "endStation": "Näkinsilta",
            "distanceMeters": 2088,
            "durationSeconds": 679
        },
        {
            "id": 785207,
            "startTime": "2021-04-30T21:00:30.000Z",
            "endTime": "2021-04-30T21:09:53.000Z",
            "startStation": "Varsapuistikko",
            "endStation": "Brahen kenttä",
            "distanceMeters": 1688,
            "durationSeconds": 558
        },
        {
            "id": 392602,
            "startTime": "2021-04-30T21:00:30.000Z",
            "endTime": "2021-04-30T21:11:55.000Z",
            "startStation": "Narinkka",
            "endStation": "Näkinsilta",
            "distanceMeters": 2088,
            "durationSeconds": 679
        }
    ],
    "paging": {
        "total": 3126266,
        "page": 0,
        "pages": 625254
    }
}
```