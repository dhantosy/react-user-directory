export const filterDataByColor = (data) => {
  let filteredData = [];
  let getAgeGreen = data.filter(function (el) {
    return el.dob.age > 20 && el.dob.age < 57
  });
  let getAgeBlue = data.filter(function (el) {
    return el.dob.age > 56
  });
  let getAgeRed = data.filter(function (el) {
    return el.dob.age < 21
  });

  return filteredData.concat(getAgeGreen, getAgeBlue, getAgeRed);
}
