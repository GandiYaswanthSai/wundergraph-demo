// import express from 'express';
// import config from '../config/config';
// import {introspect, configureWunderGraphApplication} from '@wundergraph/sdk';

// const pg = introspect.postgresql({
//     apiNamespace: 'pg',
//     databaseURL: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
//   });

// const port = config.port as number;
// const host = config.host as string;

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.listen(port, host, () => {
//     console.log(`Server listing at http://${host}:${port}`);
//   });

// configureWunderGraphApplication({
//     // compose the APIs into a unified WunderGraph API
//     apis: [pg],
//     security: {
//         enableGraphQLEndpoint: true,
//       }
//   });
import { WunderGraphConfiguration } from '@wundergraph/protobuf'
let objectKeys: string[] = [];
function getObjectKeys(obj:any, previousPath:string = '') {
  // Step 1- Go through all the keys of the object
Object.keys(obj).forEach((key) => {
  console.log(key);
      // Get the current path and concat the previous path if necessary
      const currentPath = previousPath ? `${previousPath}.${key}` : key;
      // Step 2- If the value is a string, then add it to the keys array
      console.log(typeof obj[key])
      if (typeof obj[key] !== 'object') {
          objectKeys.push(currentPath);
      } else {
          objectKeys.push(currentPath);
          // Step 3- If the value is an object, then recursively call the function
          getObjectKeys(obj[key], currentPath);
      }
  });
}

// const conf = new WunderGraphConfiguration();

