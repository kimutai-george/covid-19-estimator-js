/**
 *  Convert to data - in the case where periodType = weeks & months
 * @param {*} data 
 */

const normalizetimetoElapse = (data) => {

    const period_type = data.periodType;
    const time_to_Elapse;

    if(period_type === "weeks")
    {
        time_to_Elapse = data.timeToElapse *= 7;
    }
    else if (period_type == "months")
    {
        time_to_Elapse = data.timeToElapse *= 30
    }
    else
    {
        time_to_Elapse = data.timeToElapse;
    }

    return { time_to_Elapse }
}


/**
 * estimate multiplier values
 * @param {*} data 
 */

const constValues = (data) => {
    const days = normalizetimetoElapse.time_to_Elapse;

    const factor = Math.floor(days / 3)

    const multiply_value = 2 ** factor

    const available_beds = (data.totalHospitalBeds * 0.35)




    return { multiply_value, available_beds }
}


/**
 * function to calculate Impact
 * @param {*} data 
 */
const estimateInfectedCases = (data) => {
    currentlyInfected = (data.reportedCases * 10);
    projectedInfected = (data.reportedCases * 50);

    infectionsByCurrentTime = currentlyInfected * constValues.multiply_value
    infectionsByProjectedTime = currentlyInfected * constValues.multiply_value

    
    return  { currentlyInfected, projectedInfected, infectionsByCurrentTime, infectionsByProjectedTime } 
}


/**
 *  estimate Impact & severe cases
 * @param {*} data 
 */
const estimateImpactCases = () => {
    impactByRequestedTime = Math.floor(0.15 * estimateImpactCases.infectionsByCurrentTime)
    severeImpactByRequestedTime = Math.floor(0.15 * estimateImpactCases.infectionsByProjectedTime)


    return { impactByCurrentTime, severeCasesByRequestedTime }
}

 /**
  * Hospital beds by requested time - Current case
  * @param {*} data 
  */

  const hospitalbedsBeds = () => {
      hospitalbedsbyCurrentTime = Math.floor(constValues.available_beds * estimateImpactCases.impactByCurrentTime)
      hospitalbedsbyProjectedTime = Math.floor(constValues.available_beds * estimateImpactCases.severeCasesByRequestedTime)


      return { hospitalbedsbyCurrentTime, hospitalbedsbyProjectedTime }
  }


/**
 *  Estimated cases for ICU by requested time - Current cases
 * @param {*} data 
 */

 const estimatedICUCases = () => {
    casesForICUbyCurrentTime = Math.floor(0.05 * estimateInfectedCases.infectionsByCurrentTime)
    casesForICUbyProjectedTime = Math.floor(0.05 * estimateInfectedCases.infectionsByProjectedTime)


     return { casesForICUbyCurrentTime, casesForICUbyProjectedTime };
 }


/**
 *  Estimated cases for ventilation 
 * @param {*} data 
 */

 const estimatedVentilatorCases = () => {
    casesForVentilatorsByCurrentime = Math.floor(0.02 * estimateInfectedCases.infectionsByCurrentTime)
    casesForVentilatorsByProjectedTime = Math.floor(0.02 * estimateInfectedCases.infectionsByProjectedTime)


    return { casesForVentilatorsByCurrentime, casesForVentilatorsByProjectedTime }
 }


 /**
  *   Estimate Economic Loses
  * @param {*} data 
  */

  const estimatedEconomicLoses = () => {

    dollarsinFlightCurrentSituation = Math.floor((estimateInfectedCases.infectionsByCurrentTime * 0.65 * 1.5) /30)
    dollarsinFlightProjectedSituation = Math.floor((estimateInfectedCases.infectionsByProjectedTime * 0.65 * 1.5) /30)


    return { dollarsinFlightCurrentSituation, dollarsinFlightProjectedSituation }

  }

/**
 *  Results for project i.e both current situation and projected outcome.
 * @param {*} data 
 */

const covid19Predictor = (data) => {
    const impact = {
        currentlyInfected: estimateInfectedCases.currentlyInfected,
        infectionsByRequestedTime: estimateInfectedCases.infectionsByCurrentTime,
        severeCasesByRequestedTime: estimateImpactCases.impactByCurrentTime,
        hospitalBedsByRequestedTime: hospitalbedsBeds.hospitalbedsCurrentImpacts,
        casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyCurrentTime,
        casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByCurrentime,
        dollarsInFlight: estimatedEconomicLoses.dollarsinFlightCurrentSituation
    };

    const severeImpact = {
        currentlyInfected: estimateInfectedCases.projectedInfected,
        infectionsByRequestedTime: estimateInfectedCases.infectionsByProjectedTime,
        severeCasesByRequestedTime: estimateImpactCases.severeImpactByRequestedTime,
        hospitalBedsByRequestedTime: hospitalbedsBeds.hospitalbedsbyProjectedTime,
        casesForICUBYRequestedTime: estimatedICUCases.casesForICUbyProjectedTime,
        casesForVentilatorsByRequestedTime: estimatedVentilatorCases.casesForVentilatorsByProjectedTime,
        dollarsInFlight: estimatedEconomicLoses.dollarsinFlightProjectedSituation
    }

    return { data, impact, severeImpact }
}



const covid19ImpactEstimator = (data) => {

    const estimator = chain(

        // challenge 1 
        estimateinfectedImpact,
        estimateinfectedsevereImpact,

        //challenge -2 
        estimateImpactCases,
        estimatesevereImpactCases,
        hospitalbedsCurrentImpacts,
        hospitalbedsProjectedCases,

        //challenge 3

        estimatedICUCurrentcases,
        estimatedICUProjectedCases,
        estimatedVentilatorCurrentCases,
        estimatedVentilatorProjectesCases,
        estimatedLosesCurrentSituaton,
        estimatedLosesProjectedSituaton,

        // Final Projection

        covid19Predictor

    );

    return estimator({
        data,
        impact: {},
        severeImpact: {}
    })

    

}


export default covid19ImpactEstimator;