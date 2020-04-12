/* eslint-disable max-len */
/**
 *  Convert to data - in the case where periodType = weeks & months
 * @param {*} data
 */

const normalizetimetoElapse = (data) => {
  let timetoElapse = data.periodType;

  if (data.periodType === 'weeks') {
    timetoElapse = data.timeToElapse * 7;
  } else if (data.periodType === 'months');
  // eslint-disable-next-line no-lone-blocks
  {
    timetoElapse = data.timeToElapse * 30;
  }

  return timetoElapse;
};


/**
 * estimate multiplier values
 * @param {*} data
 */

const constValues = (data) => {
  const days = normalizetimetoElapse.timeToElapse;

  const factor = Math.floor(days / 3);

  const multiplyValue = 2 ** factor;

  const availableBeds = (data.totalHospitalBeds * 0.35);


  return { multiplyValue, availableBeds };
};


/**
 * function to calculate Impact
 * @param {*} data
 */
const estimateInfectedCases = (data) => {
  const currentlyInfected = (data.reportedCases * 10);
  const projectedInfected = (data.reportedCases * 50);

  const infectionsByCurrentTime = currentlyInfected * constValues.multiplyValue;
  const infectionsByProjectedTime = currentlyInfected * constValues.multiplyValue;


  return {
    currentlyInfected, projectedInfected, infectionsByCurrentTime, infectionsByProjectedTime
  };
};


/**
 *  estimate Impact & severe cases
 * @param {*} data
 */
const estimateImpactCases = () => {
  const impactRequestedTime = Math.floor(0.15 * estimateImpactCases.infectionsByCurrentTime);
  const severeRequestedTime = Math.floor(0.15 * estimateImpactCases.infectionsByProjectedTime);


  return { impactRequestedTime, severeRequestedTime };
};

/**
  * Hospital beds by requested time - Current case
  * @param {*} data
  */

const estimatedhospitalBeds = () => {
  const hospbedsCurrentTime = Math.floor(constValues.availableBeds * estimateImpactCases.impactRequestedTime);
  const hospbedsProjectedTime = Math.floor(constValues.availableBeds * estimateImpactCases.severeRequestedTime);


  return { hospbedsCurrentTime, hospbedsProjectedTime };
};


/**
 *  Estimated cases for ICU by requested time - Current cases
 * @param {*} data
 */

const estimatedICUCases = () => {
  const casesForICUbyCurrentTime = Math.floor(0.05 * estimateInfectedCases.infectionsByCurrentTime);
  const casesForICUbyProjectedTime = Math.floor(0.05 * estimateInfectedCases.infectionsByProjectedTime);


  return { casesForICUbyCurrentTime, casesForICUbyProjectedTime };
};


/**
 *  Estimated cases for ventilation
 * @param {*} data
 */

const estimatedVentilatorCases = () => {
  const casesForVentilatorsByCurrentime = Math.floor(0.02 * estimateInfectedCases.infectionsByCurrentTime);
  const casesForVentilatorsByProjectedTime = Math.floor(0.02 * estimateInfectedCases.infectionsByProjectedTime);


  return { casesForVentilatorsByCurrentime, casesForVentilatorsByProjectedTime };
};


/**
  *   Estimate Economic Loses
  * @param {*} data
  */

const estimatedEconomicLoses = () => {
  const dollarsinFlightCurrentSituation = Math.floor((estimateInfectedCases.infectionsByCurrentTime * 0.65 * 1.5) / 30);
  const dollarsinFlightProjectedSituation = Math.floor((estimateInfectedCases.infectionsByProjectedTime * 0.65 * 1.5) / 30);


  return { dollarsinFlightCurrentSituation, dollarsinFlightProjectedSituation };
};

/**
 *  Results for project i.e both current situation and projected outcome.
 * @param {*} data
 */

const covid19Predictor = (data) => {
  const impact = {
    currentlyInfected: estimateInfectedCases.currentlyInfected,
    infectionsByRequestedTime: estimateInfectedCases.infectionsByCurrentTime,
    severeCasesByRequestedTime: estimateImpactCases.impactByCurrentTime,
    hospitalBedsByRequestedTime: estimatedhospitalBeds.hospbedsCurrentTime,
    casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyCurrentTime,
    casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByCurrentime,
    dollarsInFlight: estimatedEconomicLoses.dollarsinFlightCurrentSituation
  };

  const severeImpact = {
    currentlyInfected: estimateInfectedCases.projectedInfected,
    infectionsByRequestedTime: estimateInfectedCases.infectionsByProjectedTime,
    severeCasesByRequestedTime: estimateImpactCases.severeImpactByRequestedTime,
    hospitalBedsByRequestedTime: estimatedhospitalBeds.hospbedsProjectedTime,
    casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyProjectedTime,
    casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByProjectedTime,
    dollarsInFlight: estimatedEconomicLoses.dollarsinFlightProjectedSituation
  };

  return { data, impact, severeImpact };
};


const covid19ImpactEstimator = (data) => {
  constValues(data);
  normalizetimetoElapse(data);
  // challenge 1
  estimateInfectedCases(data);

  // challenge -2
  estimateImpactCases();
  estimatedhospitalBeds();

  // challenge 3

  estimatedICUCases();
  estimatedVentilatorCases();
  estimatedEconomicLoses();

  // Final Projection

  covid19Predictor();

  const impact = {
    currentlyInfected: estimateInfectedCases.currentlyInfected,
    infectionsByRequestedTime: estimateInfectedCases.infectionsByCurrentTime,
    severeCasesByRequestedTime: estimateImpactCases.impactByCurrentTime,
    hospitalBedsByRequestedTime: estimatedhospitalBeds.hospbedsCurrentTime,
    casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyCurrentTime,
    casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByCurrentime,
    dollarsInFlight: estimatedEconomicLoses.dollarsinFlightCurrentSituation
  };

  const severeImpact = {
    currentlyInfected: estimateInfectedCases.projectedInfected,
    infectionsByRequestedTime: estimateInfectedCases.infectionsByProjectedTime,
    severeCasesByRequestedTime: estimateImpactCases.severeImpactByRequestedTime,
    hospitalBedsByRequestedTime: estimatedhospitalBeds.hospbedsProjectedTime,
    casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyProjectedTime,
    casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByProjectedTime,
    dollarsInFlight: estimatedEconomicLoses.dollarsinFlightProjectedSituation
  };

  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
