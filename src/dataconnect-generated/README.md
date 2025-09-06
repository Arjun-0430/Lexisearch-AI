# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCaseRecords*](#getcaserecords)
- [**Mutations**](#mutations)
  - [*InsertCaseRecord*](#insertcaserecord)
  - [*UpdateCaseRecord*](#updatecaserecord)
  - [*DeleteCaseRecord*](#deletecaserecord)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCaseRecords
You can execute the `GetCaseRecords` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCaseRecords(): QueryPromise<GetCaseRecordsData, undefined>;

interface GetCaseRecordsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCaseRecordsData, undefined>;
}
export const getCaseRecordsRef: GetCaseRecordsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCaseRecords(dc: DataConnect): QueryPromise<GetCaseRecordsData, undefined>;

interface GetCaseRecordsRef {
  ...
  (dc: DataConnect): QueryRef<GetCaseRecordsData, undefined>;
}
export const getCaseRecordsRef: GetCaseRecordsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCaseRecordsRef:
```typescript
const name = getCaseRecordsRef.operationName;
console.log(name);
```

### Variables
The `GetCaseRecords` query has no variables.
### Return Type
Recall that executing the `GetCaseRecords` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCaseRecordsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCaseRecordsData {
  caseRecords: ({
    id: UUIDString;
    caseNumber: string;
    cnr: string;
    dateOfDecision?: DateString | null;
    dateOfRegistration: DateString;
    disposalNature?: string | null;
    district: string;
    establishment: string;
    nextDate?: DateString | null;
    partyName: string;
    purposeName: string;
    srNo: number;
    state: string;
  } & CaseRecord_Key)[];
}
```
### Using `GetCaseRecords`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCaseRecords } from '@dataconnect/generated';


// Call the `getCaseRecords()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCaseRecords();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCaseRecords(dataConnect);

console.log(data.caseRecords);

// Or, you can use the `Promise` API.
getCaseRecords().then((response) => {
  const data = response.data;
  console.log(data.caseRecords);
});
```

### Using `GetCaseRecords`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCaseRecordsRef } from '@dataconnect/generated';


// Call the `getCaseRecordsRef()` function to get a reference to the query.
const ref = getCaseRecordsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCaseRecordsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.caseRecords);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.caseRecords);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## InsertCaseRecord
You can execute the `InsertCaseRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertCaseRecord(): MutationPromise<InsertCaseRecordData, undefined>;

interface InsertCaseRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertCaseRecordData, undefined>;
}
export const insertCaseRecordRef: InsertCaseRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertCaseRecord(dc: DataConnect): MutationPromise<InsertCaseRecordData, undefined>;

interface InsertCaseRecordRef {
  ...
  (dc: DataConnect): MutationRef<InsertCaseRecordData, undefined>;
}
export const insertCaseRecordRef: InsertCaseRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertCaseRecordRef:
```typescript
const name = insertCaseRecordRef.operationName;
console.log(name);
```

### Variables
The `InsertCaseRecord` mutation has no variables.
### Return Type
Recall that executing the `InsertCaseRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertCaseRecordData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertCaseRecordData {
  caseRecord_insert: CaseRecord_Key;
}
```
### Using `InsertCaseRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertCaseRecord } from '@dataconnect/generated';


// Call the `insertCaseRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertCaseRecord();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertCaseRecord(dataConnect);

console.log(data.caseRecord_insert);

// Or, you can use the `Promise` API.
insertCaseRecord().then((response) => {
  const data = response.data;
  console.log(data.caseRecord_insert);
});
```

### Using `InsertCaseRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertCaseRecordRef } from '@dataconnect/generated';


// Call the `insertCaseRecordRef()` function to get a reference to the mutation.
const ref = insertCaseRecordRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertCaseRecordRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.caseRecord_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.caseRecord_insert);
});
```

## UpdateCaseRecord
You can execute the `UpdateCaseRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCaseRecord(): MutationPromise<UpdateCaseRecordData, undefined>;

interface UpdateCaseRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateCaseRecordData, undefined>;
}
export const updateCaseRecordRef: UpdateCaseRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCaseRecord(dc: DataConnect): MutationPromise<UpdateCaseRecordData, undefined>;

interface UpdateCaseRecordRef {
  ...
  (dc: DataConnect): MutationRef<UpdateCaseRecordData, undefined>;
}
export const updateCaseRecordRef: UpdateCaseRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCaseRecordRef:
```typescript
const name = updateCaseRecordRef.operationName;
console.log(name);
```

### Variables
The `UpdateCaseRecord` mutation has no variables.
### Return Type
Recall that executing the `UpdateCaseRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCaseRecordData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCaseRecordData {
  caseRecord_update?: CaseRecord_Key | null;
}
```
### Using `UpdateCaseRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCaseRecord } from '@dataconnect/generated';


// Call the `updateCaseRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCaseRecord();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCaseRecord(dataConnect);

console.log(data.caseRecord_update);

// Or, you can use the `Promise` API.
updateCaseRecord().then((response) => {
  const data = response.data;
  console.log(data.caseRecord_update);
});
```

### Using `UpdateCaseRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCaseRecordRef } from '@dataconnect/generated';


// Call the `updateCaseRecordRef()` function to get a reference to the mutation.
const ref = updateCaseRecordRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCaseRecordRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.caseRecord_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.caseRecord_update);
});
```

## DeleteCaseRecord
You can execute the `DeleteCaseRecord` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCaseRecord(): MutationPromise<DeleteCaseRecordData, undefined>;

interface DeleteCaseRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteCaseRecordData, undefined>;
}
export const deleteCaseRecordRef: DeleteCaseRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCaseRecord(dc: DataConnect): MutationPromise<DeleteCaseRecordData, undefined>;

interface DeleteCaseRecordRef {
  ...
  (dc: DataConnect): MutationRef<DeleteCaseRecordData, undefined>;
}
export const deleteCaseRecordRef: DeleteCaseRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCaseRecordRef:
```typescript
const name = deleteCaseRecordRef.operationName;
console.log(name);
```

### Variables
The `DeleteCaseRecord` mutation has no variables.
### Return Type
Recall that executing the `DeleteCaseRecord` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCaseRecordData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCaseRecordData {
  caseRecord_delete?: CaseRecord_Key | null;
}
```
### Using `DeleteCaseRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCaseRecord } from '@dataconnect/generated';


// Call the `deleteCaseRecord()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCaseRecord();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCaseRecord(dataConnect);

console.log(data.caseRecord_delete);

// Or, you can use the `Promise` API.
deleteCaseRecord().then((response) => {
  const data = response.data;
  console.log(data.caseRecord_delete);
});
```

### Using `DeleteCaseRecord`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCaseRecordRef } from '@dataconnect/generated';


// Call the `deleteCaseRecordRef()` function to get a reference to the mutation.
const ref = deleteCaseRecordRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCaseRecordRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.caseRecord_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.caseRecord_delete);
});
```

