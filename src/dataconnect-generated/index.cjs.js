const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'lexisearch-ai-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const insertCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertCaseRecord');
}
insertCaseRecordRef.operationName = 'InsertCaseRecord';
exports.insertCaseRecordRef = insertCaseRecordRef;

exports.insertCaseRecord = function insertCaseRecord(dc) {
  return executeMutation(insertCaseRecordRef(dc));
};

const getCaseRecordsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCaseRecords');
}
getCaseRecordsRef.operationName = 'GetCaseRecords';
exports.getCaseRecordsRef = getCaseRecordsRef;

exports.getCaseRecords = function getCaseRecords(dc) {
  return executeQuery(getCaseRecordsRef(dc));
};

const updateCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCaseRecord');
}
updateCaseRecordRef.operationName = 'UpdateCaseRecord';
exports.updateCaseRecordRef = updateCaseRecordRef;

exports.updateCaseRecord = function updateCaseRecord(dc) {
  return executeMutation(updateCaseRecordRef(dc));
};

const deleteCaseRecordRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteCaseRecord');
}
deleteCaseRecordRef.operationName = 'DeleteCaseRecord';
exports.deleteCaseRecordRef = deleteCaseRecordRef;

exports.deleteCaseRecord = function deleteCaseRecord(dc) {
  return executeMutation(deleteCaseRecordRef(dc));
};
