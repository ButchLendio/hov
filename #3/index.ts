/**
 * LOGEST function.
 * https://www.statisticshowto.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation
 * http://www.exceluser.com/formulas/how-to-calculate-both-types-of-compound-growth-rates.html
 * https://www.excelfunctions.net/excel-logest-function.html
 * @param data 
 * 
 * 
 */
 const  SimpleLinearRegression = require("ml-regression-simple-linear")

export default function logest(ys: number[]): number {
  // do something


  const xs = [0,1,2,3,4]
  const data =[]

  //filter ys
  for (let index = 0; index < ys.length; index++) {
    const element = ys[index];
    //if index is lower than -1 return NaN value
    if(element<-1){
      data.push(NaN)
    }else{
      //push the logarithm of the element to data array
      data.push(Math.log(element))
    }
  }
  //execute regression
  const regression = new SimpleLinearRegression(xs, data);

  //convert slope to exponential
  const final = Math.exp(regression.slope)


  return final;
}
