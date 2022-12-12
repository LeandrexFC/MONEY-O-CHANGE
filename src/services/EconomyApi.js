const ECONOMY_URL = 'https://economia.awesomeapi.com.br/json/all';

const getEconomys = async () => {
  const request = await fetch(ECONOMY_URL);
  const json = request.json();

  return request.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getEconomys;
