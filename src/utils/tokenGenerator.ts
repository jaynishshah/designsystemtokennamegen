import { Bucket, Token } from '../types';

export const generateTokens = (buckets: Bucket[], tokenType: string, delimiter: string = '-'): Token[] => {
  if (buckets.length === 0) return [];
  
  const nonEmptyBuckets = buckets.filter(bucket => bucket.values.length > 0);
  if (nonEmptyBuckets.length === 0) return [];
  
  const cartesianProduct = (arrays: string[][]): string[][] => {
    return arrays.reduce((acc, curr) => {
      const result: string[][] = [];
      acc.forEach(accItem => {
        curr.forEach(currItem => {
          result.push([...accItem, currItem]);
        });
      });
      return result;
    }, [[]] as string[][]);
  };

  const valueArrays = nonEmptyBuckets.map(bucket => bucket.values);
  const combinations = cartesianProduct(valueArrays);
  
  return combinations.map(combination => ({
    name: combination.join(delimiter),
    type: tokenType
  }));
};