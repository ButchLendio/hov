


export default class<TInput extends Array<any> = Array<any>, TOutput = any> {

  data:String[]
  result={}
  constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
    // do something
    this.data = ["first","second"]
    this.result = {}
    
  
  }

  async exec(...args: TInput): Promise<TOutput> {
    // do something

    let info
    for (let a = 0; a < args.length; a++) {
      this.data.push(args[a])
      
    }

    


    return {} as TOutput;
  }
}
