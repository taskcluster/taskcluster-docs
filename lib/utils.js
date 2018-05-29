exports.buildSchemaId = schemaId => {
  if (schemaId.startsWith('taskcluster:')) {
    if (process.env.TASKCLUSTER_ROOT_URL && process.env.TASKCLUSTER_ROOT_URL !== 'https://taskclluster.net') {
      return schemaId.replace(/^taskcluster:/, process.env.TASKCLUSTER_ROOT_URL);
    } else {
      schemaId = schemaId.replace(/^taskcluster:\/schemas\//, '');
      return `https://schemas.taskcluster.net/${schemaId}`
    }
  }
  return schemaId;
};
