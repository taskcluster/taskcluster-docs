## Bidding!

* Figure out the price of all instance types in all regions
* Calculate a comparable price by multiplying the relevant values:
 * Actual billable SpotPrice
 * Capacity of instanceType
 * Bias based on statistics
* Comparison price is used to pick instanceType, availabilityZone and region
* We submit for 2x the actual billable SpotPrice
