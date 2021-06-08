/**
 * LOGEST function.
 * https://www.statisticshowto.com/probability-and-statistics/regression-analysis/find-a-linear-regression-equation
 * http://www.exceluser.com/formulas/how-to-calculate-both-types-of-compound-growth-rates.html
 * https://www.excelfunctions.net/excel-logest-function.html
 * @param data 
 */
export default function logest(ys: number[]): number {
  // do something

  const xs = [1,2,3,4,5]

  function solve(x,b,m){
    const y = b * m**x
    return y
  }

  const exec = solve(xs,ys,xs)
  console.log(exec);

  const modelPredictions = solve(xs, exec,ys) 
  
  // console.log(modelPredictions)

  const absError = modelPredictions-ys

// console.log(absError);



  return exec;
}
