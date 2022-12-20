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

### Fetch single station
```
GET /api/stations/{{id}}?language={{language}}
```
| Parameter | Type   | Required? | Default | Description                                                          |
|-----------|--------|-----------|---------|----------------------------------------------------------------------|
| id        | number | yes       |         | Id of station to fetch.                                              |
| language  | enum   | no        | en      | Language for name, address and station city. Supports fi, en and sv. |
