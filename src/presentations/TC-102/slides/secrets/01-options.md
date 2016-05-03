## Secrets

So you need to keep a secret?

 * Encrypted environment variables
   * But single shared key without any kind of PFS
 * Private docker image
   * But hides a lot of your process - be open!
 * Docker-worker feature (taskcluster proxy, balrog vpn proxy, relengapi proxy)
   * Must be deployed by the TC team
 * Secrets API
   * Woo!
