# Seeding the database
When the application is launched for the first time, the database needs to be seeded. The backend seeds the database using data from .csv files. The .csv files for seeding can be specified in the seeding.yml file.

`/backend/seeding.yml`:
```
stations:
 - https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
trips:
 - https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
 - https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
 - https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
```
The .yml file can be edited, but keep in mind that to seed the database:
- there has to be at least one .csv file of stations and trips
- trips that start or end on unknown stations will be disregarded

# Structure of .csv files
## Stations
The structure of .csv files including stations should be:
```
FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
````
A valid example:
```
9,517,Länsituuli,Västanvinden,Länsituuli,Länsituulenkuja 3,Västanvindsgränden 3,Espoo,Esbo,CityBike Finland,24,24.802049,60.175358
```

If the Kaupunki and Stad is left empty in the .csv file it defaults to Helsinki.

## Stations
The structure of .csv files including trips should be:
```
Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
```
A valid example:
```
2021-06-30T23:59:02,2021-07-01T00:04:05,280,Puotilan ostoskeskus,278,Puotilantie,855,302
```

