/* eslint-disable max-len */
const covid19ImpactEstimator = (data) => {
  let timeElapse = data.timeToElapse;
  if (data.periodType === 'weeks') {
    timeElapse = (data.timeToElapse * 7);
  } else if (data.periodType === 'months') {
    timeElapse = (data.timeToElapse * 30);
  }

  const days = timeElapse;

  const factor = Math.floor(days / 3);

  const multiplyValue = 2 ** factor;

  const availableBeds = (data.totalHospitalBeds * 0.35);


  // challenge 1
  const currentlyInfectedCases = (data.reportedCases * 10);
  const projectedInfectedCases = (data.reportedCases * 50);

  const infectionsByCurrentTimeCases = currentlyInfectedCases * multiplyValue;
  const infectionsByProjectedTimeCases = projectedInfectedCases * multiplyValue;


  // challenge -2
  const impactRequestedTimeCases = Math.trunc(0.15 * infectionsByCurrentTimeCases);
  const severeRequestedTimeCases = Math.trunc(0.15 * infectionsByProjectedTimeCases);
  const hospbedsCurrentTimeCases = Math.trunc(availableBeds - impactRequestedTimeCases);
  const hospbedsProjectedTimeCases = Math.trunc(availableBeds - severeRequestedTimeCases);


  // challenge 3
  const casesICUbyCurrentTime = Math.trunc(0.05 * infectionsByCurrentTimeCases);
  const casesICUbyProjectedTime = Math.trunc(0.05 * infectionsByProjectedTimeCases);

  const casesVentilatorsByCurrentime = Math.trunc(0.02 * infectionsByCurrentTimeCases);
  const casesVentilatorsByProjectedTime = Math.trunc(0.02 * infectionsByProjectedTimeCases);

  const dollarsFlightCurrentSituation = Math.trunc((infectionsByCurrentTimeCases * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);
  const dollarsFlightProjectedSituation = Math.trunc((infectionsByProjectedTimeCases * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / days);


  const impact = {
    currentlyInfected: currentlyInfectedCases,
    infectionsByRequestedTime: infectionsByCurrentTimeCases,
    severeCasesByRequestedTime: impactRequestedTimeCases,
    hospitalBedsByRequestedTime: hospbedsCurrentTimeCases,
    casesForICUByRequestedTime: casesICUbyCurrentTime,
    casesForVentilatorsByRequestedTime: casesVentilatorsByCurrentime,
    dollarsInFlight: (dollarsFlightCurrentSituation)
  };

  const severeImpact = {
    currentlyInfected: projectedInfectedCases,
    infectionsByRequestedTime: infectionsByProjectedTimeCases,
    severeCasesByRequestedTime: severeRequestedTimeCases,
    hospitalBedsByRequestedTime: hospbedsProjectedTimeCases,
    casesForICUByRequestedTime: casesICUbyProjectedTime,
    casesForVentilatorsByRequestedTime: casesVentilatorsByProjectedTime,
    dollarsInFlight: (dollarsFlightProjectedSituation)
  };

  return { data, impact, severeImpact };
};


module.exports = covid19ImpactEstimator;
