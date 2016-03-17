---
layout: default
class:  markdown
---
# Guiding Design Principals for TaskCluster

At the [2016 tc-worker workweek](http://www.chesnok.com/daily/2016/03/11/workweek-tc-worker-workweek-recap/) the Taskcluster Platform team laid out our _core design principles_. The four key principles are

* Self-service
* Robustness
* Enable rapid change
* Community friendliness

These are all under an umbrella we call Getting Things Built&#8482;. None of our work matters unless __it works__! Read further for a slightly expanded list of principles!


### Getting Things Built&#8482;

* Self-service
  * Task Isolation
  * API-driven UI Tools
  * Extensible
  * Granular Security
  * Clearly defined interfaces
  * Separation of concerns
* Robustness
  * Scalability
  * Correctness
    * Idempotent APIs
  * Minimal Self-hosting
    * Use managed services (S3, Azure Storage)
    * Don't self-host mutable services
  * Stateless Services
  * 12-factor applications
* Enable Rapid Change
  * Agility
  * Clearly defined interfaces
  * Micro Services
  * Separation of concerns
* Community Friendly
  * Transparency
    * Granular Security
  * Public by Default
  * Self-Service

### Future Dreams (living in the clouds)

* Reputation
* Profitability
  * PaaS for everybody
  * Support Enterprise deployments

### Wow a graph!

<img alt="Guiding Principles" src="/assets/tc-principles.png" width="50%">
