/**
 * Calculates the ratio between the amount of time when status is AVAILABLE and
 * the amount of time between startDateTime inclusive and endDateTime exclusive.
 * @param startDateTime
 * @param endDateTime
 */


const moment = require("moment")

const json = require('./data.json')

export function availability(startDateTime: Date, endDateTime: Date): number {
  // do something
  let filterDate =[], totaltime=0, time=null

  //fetch all data 
  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    const a = (moment(element.timestamp))
    const b = (moment(startDateTime))
    const c = (moment(endDateTime))
    //if data is inside the range but not equal to endDate
    if(a>=b && a<c){
      filterDate.push(element)
    }
  }

  //start of computation
  for (let e = 0; e < filterDate.length; e++) {
    //compute duration
    if(!time){
      time = filterDate[e]
    }
    if((e+1)<filterDate.length){
      // if status is not AVAILABLE
      if(filterDate[e].status != "AVAILABLE"){
        let timeduration = convert(time.timestamp,filterDate[e].timestamp)

        totaltime += timeduration

        //back to null value
        time = null
      }
    }else{
      // get total duration
      let timeduration = convert(time.timestamp,filterDate[e].timestamp)
      
      totaltime += timeduration

    }
  }

   //convertion
 function convert(dataTime : String,totime: String){
  const time1 = (moment(dataTime))
  const time2 = (moment(totime))
  
  return moment.duration(time2.diff(time1)).asHours()
}

  //final data convert
  let duration = convert(filterDate[0].timestamp,filterDate[filterDate.length-1].timestamp)
  let hoursFinal = duration

  return totaltime/hoursFinal;
}





/**
 * Generates the outages between startDateTime inclusive and endDateTime exclusive.
 * An outage is PARTIAL if the status within the period is PARTIALLY_AVAILABLE.
 * Similarly, an outage is MAJOR if the status within the period is MAJOR.
 * @param startDateTime
 * @param endDateTime
 */
export function outages(startDateTime: Date, endDateTime: Date): { type: 'PARTIAL' | 'MAJOR', timestamp: Date, duration: number }[] {
  // do something
  let filterDate =[], 
  Mdate: any[] = [],
  Pdate: any[] = [],
  Minfo :any= [],
  Pinfo :any= [],
  info: any=[],
  data: string | any[] | { type: string; timestamp: any; duration: number; } | null =[],
  Mtotaltime=0, 
  Ptotaltime=0, 
  time=null,
  finaldata: ({ type: string; timestamp: any; duration: number; } | null)[] | null = null

  //fetch all data 
  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    const a = (moment(element.timestamp))
    const b = (moment(startDateTime))
    const c = (moment(endDateTime))
    //if data is inside the range but not equal to endDate
    if(a>=b && a<c){
      filterDate.push(element)
    }
  }

  //start process
  for (let e = 0; e < filterDate.length; e++) {
    const element = filterDate[e]

    if(!time){
      time = filterDate[e]
    }

    if(element.status=="UNAVAILABLE"){
      if(Pinfo.length!=0){
        if(Pinfo.type!="MAJOR"){
          data.push(Pinfo)
        }
      }
      
      const timeduration = 1
      Mdate.push(new Date(element.timestamp))
      Mtotaltime += timeduration
      Minfo={
        type : 'MAJOR',
        timestamp:Mdate[0],
        duration:Mtotaltime
      }
    }else if(element.status=="PARTIALLY_AVAILABLE"){
      if(data.length==0){ 
        if(Minfo.type!="PARTIAL"){
          data.push(Minfo)
        }
      }
     
      const timeduration = 1

      Pdate.push(new Date(element.timestamp))
      Ptotaltime += timeduration
       Pinfo={
        type:'PARTIAL',
        timestamp:Pdate[0],
        duration:Ptotaltime
      }
      if(filterDate[e+1].status!="PARTIALLY_AVAILABLE"){
        data.push(Pinfo)
      }
    }
    
  }


  

  console.log(data)

  return data;
}
