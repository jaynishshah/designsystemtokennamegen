export interface Bucket {
  id: string;
  name: string;
  values: string[];
}

export interface Token {
  name: string;
  type: string;
}

export interface AppState {
  tokenType: string;
  buckets: Bucket[];
  delimiter: string;
}