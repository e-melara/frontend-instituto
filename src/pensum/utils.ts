import { groupBy } from 'lodash';

import type { Pensum } from './interfaces';

const tranformPensum = (pensum: Pensum[]) => {
  return new Promise((resolve, reject) => {
    const groupByCiclo = groupBy(pensum, 'ciclo');
    const keys = Object.keys(groupByCiclo);
    if(keys.length > 0) {
      resolve({ data: Object.values(groupByCiclo), keys });
    } else {
      reject('Pensum invalido');
    }
  });
}

export {
  tranformPensum
}