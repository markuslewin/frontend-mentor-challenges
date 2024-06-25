export default class Ipbase {
  constructor(apiKey: string);
  // call(endpoint: string, params?: object): Promise<unknown>;
  // status(): Promise<unknown>;
  info(params?: object): Promise<unknown>;
}
