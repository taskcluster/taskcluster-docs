### Run Tasks Locally

* Provides a reproducible script for running (most) tasks locally
* Caveats
    * Only works for docker based tasks currently
    * Some setup needed
      * taskcluster docker environment
        * Clone docker-worker repo, run 'vagrant up'
        * requires virtualbox (might not be an option on some Linux installations)
      * Alernative setup docker,kernel modules for video and audio loopback devices
    * Some features such as testdroid device not available locally

<center>
<img
  src="slides/developer_workflow/images/run_locally.png"
  style="border: none;"
/>
</center>
