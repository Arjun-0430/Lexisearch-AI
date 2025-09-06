import { InsertCaseRecordData, GetCaseRecordsData, UpdateCaseRecordData, DeleteCaseRecordData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useInsertCaseRecord(options?: useDataConnectMutationOptions<InsertCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<InsertCaseRecordData, undefined>;
export function useInsertCaseRecord(dc: DataConnect, options?: useDataConnectMutationOptions<InsertCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<InsertCaseRecordData, undefined>;

export function useGetCaseRecords(options?: useDataConnectQueryOptions<GetCaseRecordsData>): UseDataConnectQueryResult<GetCaseRecordsData, undefined>;
export function useGetCaseRecords(dc: DataConnect, options?: useDataConnectQueryOptions<GetCaseRecordsData>): UseDataConnectQueryResult<GetCaseRecordsData, undefined>;

export function useUpdateCaseRecord(options?: useDataConnectMutationOptions<UpdateCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<UpdateCaseRecordData, undefined>;
export function useUpdateCaseRecord(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<UpdateCaseRecordData, undefined>;

export function useDeleteCaseRecord(options?: useDataConnectMutationOptions<DeleteCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<DeleteCaseRecordData, undefined>;
export function useDeleteCaseRecord(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCaseRecordData, FirebaseError, void>): UseDataConnectMutationResult<DeleteCaseRecordData, undefined>;
