import dados from './dados.json';

export const loadData = _ => JSON.parse(JSON.stringify(dados));