import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CaseRecord_Key {
  id: UUIDString;
  __typename?: 'CaseRecord_Key';
}

export interface DeleteCaseRecordData {
  caseRecord_delete?: CaseRecord_Key | null;
}

export interface DistrictReference_Key {
  id: UUIDString;
  __typename?: 'DistrictReference_Key';
}

export interface EstablishmentReference_Key {
  id: UUIDString;
  __typename?: 'EstablishmentReference_Key';
}

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

export interface InsertCaseRecordData {
  caseRecord_insert: CaseRecord_Key;
}

export interface StateReference_Key {
  id: UUIDString;
  __typename?: 'StateReference_Key';
}

export interface UpdateCaseRecordData {
  caseRecord_update?: CaseRecord_Key | null;
}

interface InsertCaseRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertCaseRecordData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertCaseRecordData, undefined>;
  operationName: string;
}
export const insertCaseRecordRef: InsertCaseRecordRef;

export function insertCaseRecord(): MutationPromise<InsertCaseRecordData, undefined>;
export function insertCaseRecord(dc: DataConnect): MutationPromise<InsertCaseRecordData, undefined>;

interface GetCaseRecordsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCaseRecordsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCaseRecordsData, undefined>;
  operationName: string;
}
export const getCaseRecordsRef: GetCaseRecordsRef;

export function getCaseRecords(): QueryPromise<GetCaseRecordsData, undefined>;
export function getCaseRecords(dc: DataConnect): QueryPromise<GetCaseRecordsData, undefined>;

interface UpdateCaseRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateCaseRecordData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateCaseRecordData, undefined>;
  operationName: string;
}
export const updateCaseRecordRef: UpdateCaseRecordRef;

export function updateCaseRecord(): MutationPromise<UpdateCaseRecordData, undefined>;
export function updateCaseRecord(dc: DataConnect): MutationPromise<UpdateCaseRecordData, undefined>;

interface DeleteCaseRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteCaseRecordData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteCaseRecordData, undefined>;
  operationName: string;
}
export const deleteCaseRecordRef: DeleteCaseRecordRef;

export function deleteCaseRecord(): MutationPromise<DeleteCaseRecordData, undefined>;
export function deleteCaseRecord(dc: DataConnect): MutationPromise<DeleteCaseRecordData, undefined>;

