# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD API

GET: 
 - Endpoint: '/artist/relatedArtists'
 - Result: Grabs all the related artists associated with artist called

PUT: 
 - Endpoint: '/artist/relatedArtists/:id'
 - Result: Updates the related artists associated with artist called thorugh related artist's id

POST: 
 - Endpoint: '/artist/relatedArtists'
 - Result: Adds a new related artist to the artists related list

DELETE:
 - Endpoint: '/artist/relatedArtists/:id'
 - Result: Deletes a related artist from the artist's related list through related artist's id
