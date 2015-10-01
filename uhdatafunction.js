/**
 * Analytic functions for UH dataset
 * Created by MGY on 9/30/2015.
 */
/* */
/*global _*/
/*exported addDegrees,totalDegrees, ishawaiian,hawaiianlegacy, totalhawaiianlegacy,percentagehawaiian*/
/*exported makeyearfilter, dataforyear, totalDegreesbyYear, listCampus, groupByCampus, sumbyCampus*/
 /*exported listCampusDegree, groupByYear, sumByYear, listyearlyDegree, isDoctoralDegree,doctoralList, doctoralDegreePrograms */
/**
 * test data that takes porton of uhdataset
 * @type {string}
 */
/**
 * Helper function that takes AWARDS of UH dataset adn adds themm
 * @param memo
 * @param record : The AWARDS element of UH dataset
 * @returns : the calculated amount of Awards
 */
function addDegrees(memo, record) {
  return memo + record['AWARDS'];
}
/**
 * Function that is passed with UH data and returns the total amount of
 * @param data : The UH data set
 * @returns : Total amount of Awards given in UH dataset
 */

function totalDegrees(data) {
  return _.reduce(data, addDegrees, 0);

}
/**
 * Helper function that checks if Dataset element is Hawawiian acestry
 * @param record : Checks the UH data set element for Hawaiian ancestry
 * @returns : True if it is Hawaiian Acestry
 */
function ishawaiian(record) {
  return record["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}
/**
 * Predicate function that takes data set and returns a filter list of those with Hawaiian Ancestry in UH dataset
 * @param data : The UH data set
 * @returns : An Array of element that are Hawaiian
 */
function hawaiianlegacy(data) {
  return _.filter(data, ishawaiian);
}
/**
 * Predicate function that takes the data and reduce the Awards given to Hawaiian Ancestry
 * @param data : The UH dataset
 * @returns : The total amount of Awards given to those with Hawaiian Ancestry
 */

function totalhawaiianlegacy(data) {
  return _.reduce(hawaiianlegacy(data), addDegrees, 0);
}
/**
 * Given the Dataset You find the percentage of Awards given to HAwaiian Ancestry
 * @param data : The UH dataset
 * @returns : percentage of Awards given to HAwaiian Ancestry
 */
function percentagehawaiian(data) {
  return (totalhawaiianlegacy(data) / totalDegrees(data)) * 100;
}
//console.log(totalhawaiianlegacy(testdata));

//console.log(percentagehawaiian(testdata));
/**
 * Predicate function that returns a function that checks the dataset for Year of interest
 * @param year : The year of interest
 * @returns : the element that has the year of interest
 */
function makeyearfilter(year) {
  return function (record) {
    return record["FISCAL_YEAR"] === year;
  };
}
/**
 * predicate function that takes dataset and year and filters the data for year of interest
 * @param data : The UH dataset
 * @param year : The year of interest
 * @returns : List of elements in the UH dataset tha contains the year of interest
 */
function dataforyear(data, year) {
  return _.filter(data, makeyearfilter(year));
}
/**
 * Takes the data and the year of interest and returns the total awards in that year
 * @param data : The UH dataset
 * @param year: The year of interest
 * @returns : the total amount of Awrads given in that year
 */
function totalDegreesbyYear(data, year) {
  return _.reduce(dataforyear(data, year), addDegrees, 0);
}

//console.log(totalDegreesbyYear(testdata,2010));
//console.log(dataforyear(testdata,2011));

// listCampus(data)
// 1 extract the data campus we want with pluck
// return the array of which firlet does
// 2 remove duplicates using uniq
/**
 * Predicate function that finds all the campuses name in the UH dataset with no duplicate
 * @param data : the UH dataset
 * @returns : a list of UH campuses in UH dataset
 */
function listCampus(data) {
  return _.uniq(_.pluck(data, "CAMPUS"));
}
/**
 * Group the Campus by their name
 * @param data : The UH dataset
 * @returns : an object with elements associated with their repsective campus
 */
function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}
/**
 * Predicate function given the dataset and the campus return the total of awards by campus
 * @param val : The UH dataset
 * @param key: The campus
 * @returns : The Campus and their total amount of awards given
 */
function sumbyCampus(val) {
  return _.reduce(val, addDegrees, 0);
}
/**
 * Given the uh dataset it returns an object with campus and total awards
 * @param data : The UH data
 * @returns : object with campus name and total awards given
 */
function listCampusDegree(data) {
  return _.mapObject(groupByCampus(data), sumbyCampus);
}
/**
 * Group the dataset by Year
 * @param data : The UH data
 * @returns : an object by year
 */
function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}
/**
 * Predicate function that calculate total of awards by year
 * @param val : The UH dataset
 * @param key : The year
 * @returns : the total amount of awards by year
 */
function sumbyYear(val) {
  return _.reduce(val, addDegrees, 0);
}
/**
 * Takes the UH dataset and returns and object with year that has the most awards given
 * @param data : The UH dataset
 * @returns : the biggest amount of awards
 */
function listyearlyDegree(data) {
  return _.max(_.mapObject(groupByYear(data), sumbyYear));
}

/**
 * predicate function that checks the element is DOctoral degree
 * @param record : The UH dataset
 * @returns : True if element is doctoral degree
 */
function isDoctoralDegree(record) {
  return record["OUTCOME"] === "Doctoral Degrees";
}
/**
 * predicate function that filters all uh dataset for doctoral degrees only
 * @param data : The UH dataset
 * @returns : List of doctoral degree
 */
function doctoralList(data) {
  return _.filter(data, isDoctoralDegree);
}
/**
 * Fucntion that given dataset will lst the degree as well
 * @param data : The UH dataset
 * @returns : a list of Doctoral degree and their CIP
 */
function doctoralDegreePrograms(data) {
  return _.unique(_.pluck(doctoralList(data), "CIP_DESC"));
}