## Breaking

* When the provisioner breaks we stop being able to spin up new instance
* Existing instances continue to run without trouble
* Provisioner can be restarted safely with minimal data loss
* API prints error messages where appropriate
* Provisioner logs have sensitive data and are private
