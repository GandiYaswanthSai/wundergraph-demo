import {introspect, configureWunderGraphApplication} from '@wundergraph/sdk';
import { PrismaApi } from '@wundergraph/sdk/dist/definition';
import * as pg from 'pg';
import * as fs from 'fs';
import { QLModel } from './Model';

// const pgClient: pg.Client = new pg.Client("postgres://postgres:postgres@localhost:5432/postgres");
// pgClient.connect();

// console.log(process.env);

const prismaDB = introspect.prisma({
    apiNamespace: "prisma",
    prismaFilePath: "./prisma/schema.prisma",
    introspection: {
        disableCache: true,
    },
});
configureWunderGraphApplication({
    // compose the APIs into a unified WunderGraph API
    apis: [prismaDB],
    security: {
        enableGraphQLEndpoint: true,
      }
  });

// // const prismaDB = introspect.postgresql({
// //     apiNamespace: 'pg',
// //     databaseURL: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
// //   });

// // const prismaDB = introspect.postgresql({
// //     apiNamespace: 'pg',
// //     databaseURL: 'postgresql://nsl2:nsl1X!@b2c-nslpaas-serverless-cluster.cluster-caeppuqcnzpy.ap-south-1.rds.amazonaws.com:5432/entity_store?schema=callhealth',
// //     introspection: {
        
// //     }
// //   });

// prismaDB.then(r => {
//     // const schema:string = fs.readFileSync('./prisma/schema.prisma', 'utf-8');
//     // const sl: string[] = schema.trim().split('\n\n');
//     // const schemaList: string[] = [];
//     // var t = '';
//     // for (var i = 0; i < sl.length; i++){
//     //     t = t + '\n' + sl[i];
//     //     if (t.endsWith('}')) {
//     //         schemaList.push(t.trim());
//     //         t = '';
//     //     }
//     // }
//     // for (var i = 0; i < schemaList.length; i++){
//     //     if (schemaList[i].startsWith('model')) {
//     //         var qlmod: QLModel = new QLModel(schemaList[i]);
//     //         console.log(JSON.stringify(qlmod));
//     //         pgClient.query(`INSERT INTO "meta_store"."ql_model_meta"("tenant_id","entity_name","model_name","model","model_json") VALUES($1,$2,$3,$4,$5) ON CONFLICT ("tenant_id","entity_name") DO UPDATE SET "model_name" = $3,"model" = $4,"model_json" = $5`,
//     //         [qlmod.schemaName,qlmod.entityName,qlmod.name,schemaList[i],JSON.stringify(qlmod)])
//     //     }
//     // }
//     console.log("build success!!!");
//     configureWunderGraphApplication({
//         // compose the APIs into a unified WunderGraph API
//         apis: [prismaDB],
//         security: {
//             enableGraphQLEndpoint: true,
//           }
//       }); 
// }).catch(e => {
//     console.error(e);
//     console.log("build failure!!!");
// }); 