export interface NetworkInstance {
  get<T>(): T;
  getFetch<T>(): Promise<T>;
}

export class DataInstance implements NetworkInstance {
  get<T>() {
    return {} as T;
  }
  getFetch<T>() {
    return {} as Promise<T>;
  }
}

export interface NetworkService {
  _networkCore: NetworkInstance;
}

export class DataNetworkService implements NetworkService {
  _networkCore: NetworkInstance;
  constructor() {
    this._networkCore = new DataInstance();
  }
}
