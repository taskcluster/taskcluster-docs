exports.buildSchemaId = schemaId => {
  if (schemaId.startsWith('/')) {
    if (process.env.TASKCLUSTER_ROOT_URL && process.env.TASKCLUSTER_ROOT_URL !== 'https://taskcluster.net') {
      return process.env.TASKCLUSTER_ROOT_URL + schemaId;
    } else {
      schemaId = schemaId.replace(/^\/schemas\//, '');
      return `https://schemas.taskcluster.net/${schemaId}`
    }
  }
  return schemaId;
};
