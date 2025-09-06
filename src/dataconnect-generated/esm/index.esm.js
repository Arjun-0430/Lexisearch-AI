import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'lexisearch-ai-service',
  location: 'us-central1'
};

export const insertCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertCaseRecord');
}
insertCaseRecordRef.operationName = 'InsertCaseRecord';

export function insertCaseRecord(dc) {
  return executeMutation(insertCaseRecordRef(dc));
}

export const getCaseRecordsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCaseRecords');
}
getCaseRecordsRef.operationName = 'GetCaseRecords';

export function getCaseRecords(dc) {
  return executeQuery(getCaseRecordsRef(dc));
}

export const updateCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCaseRecord');
}
updateCaseRecordRef.operationName = 'UpdateCaseRecord';

export function updateCaseRecord(dc) {
  return executeMutation(updateCaseRecordRef(dc));
}

export const deleteCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCaseRecord');
}
deleteCaseRecordRef.operationName = 'DeleteCaseRecord';

export function deleteCaseRecord(dc) {
  return executeMutation(deleteCaseRecordRef(dc));
}

