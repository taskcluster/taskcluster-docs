## Killing and Death

* Rouges: has aws-provisioner-v1 KeyPair prefix but is not known workerType
** common example: delete a workerType and the rouge killer force kills instances
* Zombies: instances which have been alive way too long
** 96 hour hard kill from provisioner
** workers should enforce a 72 hour self-kill
* Instances which vanish from AWS State: stop counting them after a time
