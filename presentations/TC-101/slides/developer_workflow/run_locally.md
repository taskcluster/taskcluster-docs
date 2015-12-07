### Run Tasks Locally

* Provides a reproducible script for running (most) tasks locally
* Caveats
    * Only works for docker based tasks currently
    * Some setup needed
      * taskcluster-docker-environment
        * requires virtualbox (might not be an option on some Linux installations)
      * Alernative setup docker,kernel modules for video and audio loopback devices
    * Some features such as testdroid device not available locally

<img
  src="slides/developer_workflow/run_locally.png"
  style="border: none;"
/>
