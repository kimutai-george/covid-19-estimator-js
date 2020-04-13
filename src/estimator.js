/* eslint-disable max-len */

const covid19ImpactEstimator = (data) => {
  let timetolapse;

  if (data.periodType === 'weeks') {
    timetolapse = data.timeToElapse * 7;
  } else if (data.periodType === 'months') {
    timetolapse = data.timeToElapse * 30;
  } else {
    timetolapse = data.timeToElapse;
  }

  const days = timetolapse;

  const factor = Math.floor(days / 3);

  const multiplyValue = 2 ** factor;

  const availableBeds = (data.totalHospitalBeds * 0.35);


  // challenge 1
  const currentlyInfectedCases = (data.reportedCases * 10);
  const projectedInfectedCases = (data.reportedCases * 50);

  const infectionsByCurrentTimeCases = currentlyInfectedCases * multiplyValue;
  const infectionsByProjectedTimeCases = projectedInfectedCases * multiplyValue;


  // challenge -2
  const impactRequestedTimeCases = Math.floor(0.15 * infectionsByCurrentTimeCases);
  const severeRequestedTimeCases = Math.floor(0.15 * infectionsByProjectedTimeCases);
  const hospbedsCurrentTimeCases = Math.trunc(availableBeds - impactRequestedTimeCases);
  const hospbedsProjectedTimeCases = Math.trunc(availableBeds - severeRequestedTimeCases);


  // challenge 3

  const casesICUbyCurrentTime = Math.floor(0.05 * infectionsByCurrentTimeCases);
  const casesICUbyProjectedTime = Math.floor(0.05 * infectionsByProjectedTimeCases);

  const casesVentilatorsByCurrentime = Math.floor(0.02 * infectionsByCurrentTimeCases);
  const casesVentilatorsByProjectedTime = Math.floor(0.02 * infectionsByProjectedTimeCases);

  const dollarsFlightCurrentSituation = Math.floor((infectionsByCurrentTimeCases * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / 30);
  const dollarsFlightProjectedSituation = Math.floor((infectionsByProjectedTimeCases * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / 30);


  const impact = {
    currentlyInfected: currentlyInfectedCases,
    infectionsByRequestedTime: infectionsByCurrentTimeCases,
    severeCasesByRequestedTime: impactRequestedTimeCases,
    hospitalBedsByRequestedTime: hospbedsCurrentTimeCases,
    casesForICUBYRequestedTime: casesICUbyCurrentTime,
    casesForVentilatorsByRequestedTime: casesVentilatorsByCurrentime,
    dollarsInFlight: (dollarsFlightCurrentSituation)
  };

  const severeImpact = {
    currentlyInfected: projectedInfectedCases,
    infectionsByRequestedTime: infectionsByProjectedTimeCases,
    severeCasesByRequestedTime: severeRequestedTimeCases,
    hospitalBedsByRequestedTime: hospbedsProjectedTimeCases,
    casesForICUBYRequestedTime: casesICUbyProjectedTime,
    casesForVentilatorsByRequestedTime: casesVentilatorsByProjectedTime,
    dollarsInFlight: (dollarsFlightProjectedSituation)
  };

  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
