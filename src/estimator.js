const normalisedTimePeriod = (periodType, timeToElapse) => {
  let days = null;
  if (periodType === 'days') days = timeToElapse;
  if (periodType === 'months') days = timeToElapse * 30;
  if (periodType === 'weeks') days = timeToElapse * 7;
  return days;
};
const factorComputation = (periodType, timeToElapse) => {
  const setsOfThree = Math.trunc(
    normalisedTimePeriod(periodType, timeToElapse) / 3
  );
  return 2 ** setsOfThree;
};
const availableHospitals = (totalHospitalBeds, severeCases) => {
  const thirtyFivePerc = 0.35 * totalHospitalBeds;
  const hospitalBedsByRequestedTime = thirtyFivePerc - severeCases;
  return Math.trunc(hospitalBedsByRequestedTime);
};
const economicImpct = (earning, periodType, timeToElapse) => {
  const dollars = earning / normalisedTimePeriod(periodType, timeToElapse);
  return dollars;
};
const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  const multiplyFactor = factorComputation(periodType, timeToElapse);
  impact.infectionsByRequestedTime = impact.currentlyInfected * multiplyFactor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * multiplyFactor;
  // severe impact available hospital beds
  const fifteenPerc = 0.15 * severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = fifteenPerc;
  const beds = availableHospitals(totalHospitalBeds, fifteenPerc);
  severeImpact.hospitalBedsByRequestedTime = beds;
  // impact availabel hospital beds
  const fifteenImpact = 0.15 * impact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = fifteenImpact;
  const bedsImpact = availableHospitals(totalHospitalBeds, fifteenImpact);
  impact.hospitalBedsByRequestedTime = bedsImpact;
  // icu and ventilators cases impact
  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  // icu and ventilators severe impact
  const fivePerc = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);
  const twoPerc = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = fivePerc;
  severeImpact.casesForVentilatorsByRequestedTime = twoPerc;
  // dollars in flight impact
  const { region } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;
  const avgPopulationPerc = avgDailyIncomePopulation;
  const economicImpact = economicImpct(
    avgDailyIncomeInUSD,
    periodType,
    timeToElapse
  );
  const result = economicImpact * impact.infectionsByRequestedTime * avgPopulationPerc;
  impact.dollarsInFlight = Math.trunc(result);
  // dollars in flight severeImpact
  const seconomicImpact = economicImpct(
    avgDailyIncomeInUSD,
    periodType,
    timeToElapse
  );
  const sres = seconomicImpact
    * severeImpact.infectionsByRequestedTime
    * avgPopulationPerc;
  severeImpact.dollarsInFlight = Math.trunc(sres);
  return {
    data,
    impact,
    severeImpact
  };
};

module.exports = covid19ImpactEstimator;
