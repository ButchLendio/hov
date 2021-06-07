

export default class<TInput extends Array<any> = Array<any>, TOutput = any> {
  
  constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
    // do something
    const first=args

    return first
    
  }

  async exec(...args: TInput): Promise<TOutput> {
    // do something
    console.log(this.handler);
    console.log(args);

    return {} as TOutput;
  }
}
