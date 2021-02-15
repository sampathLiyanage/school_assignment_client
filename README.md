# School assignment - client

## Prerequest
Install angular cli (For linux: `sudo npm install -g @angular/cli`)

## Configuration
Host the server (https://github.com/sampathLiyanage/school_assignment_server) and configure the variable `SERVER_API_URL` in `src/app/config.service.ts`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Data Population
Use the cloud function `https://us-central1-skoolbag.cloudfunctions.net/populateSchoolList` to populate data. The link of the create school web service (Eg: http://3.20.225.155:3000/schools) should be passed as the query parameter `url` to the cloud function.

Eg: Visiting https://us-central1-skoolbag.cloudfunctions.net/populateSchoolList?url=http%3A%2F%2F3.20.225.155%3A3000%2Fschools with the browser will populate data using the web service http://3.20.225.155:3000/schools
