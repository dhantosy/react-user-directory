export const filterDataByCity = (data) => {
  let filteredData = [...data].sort((a, b) => (a.location.city > b.location.city) ? 1 : (a.location.city === b.location.city) ? ((a.location.state > b.location.state) ? 1 : -1) : -1);

  return filteredData;
}
