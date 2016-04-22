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

<section class="col-md-6">

<h3>Getting Things Built&#8482;</h3>

<h4> Self-service </h4>
<ul>
  <li> Task Isolation </li>
  <li> API-driven UI Tools </li>
  <li> Extensible </li>
  <li> Granular Security </li>
  <li> Clearly defined interfaces </li>
  <li> Separation of concerns </li>
</ul>
<h4> Robustness </h4>
<ul>
  <li> Scalability </li>
  <li> Correctness </li>
    <ul>
      <li> Idempotent APIs </li>
    </ul>
  <li> Minimal Self-hosting </li>
    <ul>
      <li> Use managed services (S3, Azure Storage) </li>
      <li> Don't self-host mutable services </li>
    </ul>
  <li> Stateless Services </li>
  <li> 12-factor applications </li>
</ul>
<h4> Enable Rapid Change </h4>
<ul>
  <li> Agility </li>
  <li> Clearly defined interfaces </li>
  <li> Micro Services </li>
  <li> Separation of concerns </li>
</ul>
<h4> Community Friendly </h4>
<ul>
  <li> Transparency </li>
    <ul>
      <li> Granular Security </li>
    </ul>
  <li> Public by Default </li>
  <li> Self-Service </li>
</ul>

<h3>Future Dreams (living in the clouds)</h3>

<h4> Reputation and Profitability </h4>
<ul>
  <li> PaaS for everybody </li>
  <li> Support Enterprise deployments </li>
</ul>

</section>

<section class="col-md-5">

<img src="/assets/principles.svg" alt="Taskcluster Principles Diagram" width="100%">

</section>
