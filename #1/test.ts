export default class <TInput extends Array<any> = Array<any>, TOutput = any> {
    numWords: string[];
    cachedResult: Record<string, any>;
    constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
      // Initialize variables 
      this.numWords = ['first', 'second'];
      this.cachedResult = {}
    }
  
    async exec(...args: TInput): Promise<TOutput> {
      // Result container
      let result: Record<string, any> = {};
  
      // Loop through all the arguments
      for (let i = 0; i < args.length; i++) {
        const data = args[i];
  
        // Check if the data is the same as the data sent before and if timeout is provided
        if (this.cachedResult[this.numWords[0]] && this.cachedResult[this.numWords[i]] == data && !this.timeout) {
          // Return data before
          return this.cachedResult as TOutput;
        }
  
        // Add result
        result[this.numWords[i]] = data
      }
  
      // Set cache data
      this.cachedResult = result
  
      // Call handler
      this.handler(...args)
  
      // Return result
      return result as TOutput;
    }
  }