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
  let filterDate = [], totaltime = 0, time = null

  //fetch all data 
  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    const a = (moment(element.timestamp))
    const b = (moment(startDateTime))
    const c = (moment(endDateTime))
    //if data is inside the range but not equal to endDate
    if (a >= b && a < c) {
      filterDate.push(element)
    }
  }

  //start of computation
  for (let e = 0; e < filterDate.length; e++) {
    //compute duration
    if (!time) {
      time = filterDate[e]
    }
    if ((e + 1) < filterDate.length) {
      // if status is not AVAILABLE
      if (filterDate[e].status != "AVAILABLE") {
        let timeduration = convert(time.timestamp, filterDate[e].timestamp)

        totaltime += timeduration

        //back to null value
        time = null
      }
    } else {
      // get total duration
      let timeduration = convert(time.timestamp, filterDate[e].timestamp)

      totaltime += timeduration

    }
  }

  //convertion
  function convert(dataTime: String, totime: String) {
    const time1 = (moment(dataTime))
    const time2 = (moment(totime))

    return moment.duration(time2.diff(time1)).asHours()
  }

  //final data convert
  let duration = convert(filterDate[0].timestamp, filterDate[filterDate.length - 1].timestamp)
  let hoursFinal = duration

  return totaltime / hoursFinal;
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
  let filterDate = [],
    Mdate: any[] = [],
    Pdate: any[] = [],
    Minfo: any = [],
    Pinfo: any = [],
    data: string | any[] | { type: string; timestamp: any; duration: number; } | null = [],
    Mtotaltime = 0,
    Ptotaltime = 0

  //fetch all data 
  for (let i = 0; i < json.length; i++) {
    const element = json[i];
    const a = (moment(element.timestamp))
    const b = (moment(startDateTime))
    const c = (moment(endDateTime))
    //if data is inside the range but not equal to endDate
    if (a >= b && a < c) {
      filterDate.push(element)
    }
  }

  //start process
  for (let e = 0; e < filterDate.length; e++) {
    const element = filterDate[e]

    //if status of data is UNAVAILABLE
    if (element.status == "UNAVAILABLE") {
      if (Pinfo.length != 0) {
        // for switching status to "PARTIAL"
        // insert PATIAL data
        if (Pinfo.type != "MAJOR") {
          data.push(Pinfo)
          clear("PARTIAL")
        }
      }

      const timeduration = 1
      //store date for MAJOR
      Mdate.push(new Date(element.timestamp))
      Mtotaltime += timeduration
      //temporary storage for "MAJOR"
      Minfo = {
        type: 'MAJOR',
        timestamp: Mdate[0],
        duration: Mtotaltime
      }
      //check if data is in the last loop
      if (filterDate[e + 1]) {
        //last insert
        if (filterDate[e + 1].status != "UNAVAILABLE") {
          data.push(Minfo)
          clear("MAJOR")
        }
      } else {
        data.push(Minfo)
        clear("MAJOR")
      }
    } else if (element.status == "PARTIALLY_AVAILABLE") {
      //if status of data is UNAVAILABLE
      if (data.length == 0) {
        // for switching status to "MAJOR"
        // insert MAJOR data 
        if (Minfo.type != "PARTIAL") {
          data.push(Minfo)
          clear("MAJOR")
        }
      }

      const timeduration = 1
      //store date for PARTIAL
      Pdate.push(new Date(element.timestamp))
      Ptotaltime += timeduration
      //temporary storage for "PARTIAL"
      Pinfo = {
        type: 'PARTIAL',
        timestamp: Pdate[0],
        duration: Ptotaltime
      }
      
      //check if data is in the last loop
      if (filterDate[e + 1]) {
        //last insert
        if (filterDate[e + 1].status != "PARTIALLY_AVAILABLE") {
          data.push(Pinfo)
          clear("PARTIAL")
        }
      } else {
        data.push(Pinfo)
        clear("PARTIAL")
      }

    } else {
      // check if what info have value
      if (Minfo.length != 0) {
        data.push(Minfo)
      } else if (Pinfo.length != 0) {
        data.push(Pinfo)
      }

    }

  }

  //for clearing the datas 
  function clear(data: String) {
    if (data == "PARTIAL") {
      Pinfo = []
      Pdate = []
      Ptotaltime = 0
    } else {
      Minfo = []
      Mdate = []
      Mtotaltime = 0
    }
  }



  return data;
}
