


export default class<TInput extends Array<any> = Array<any>, TOutput = any> {

  data:string[]
  result:Record<string,string>

  constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
    // do something
    this.data = ["first","second"]
    this.result = {}
  }

  async exec(...args: TInput): Promise<TOutput> {
    // do something

    //temporary storage
    let info:Record<string, string> = {}
    for (let a = 0; a < args.length; a++) {

      //if data is same as previous sent timeout is provided
      if(this.result[this.data[0]] && this.result[this.data[a]] == args[a] && !this.timeout){

        // return data in prev info
        return this.result as unknown as TOutput;
      }else{
        //first to be store in temporary storage
        info[this.data[a]]=args[a]
      }
    }
    // store in result
    this.result = info

    // call constructor 
    this.handler(...args)

    
    //final result
    return info as unknown as TOutput;
  }
}
