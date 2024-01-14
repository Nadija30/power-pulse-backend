function calculateBMR(desiredWeight, height, birthday, sex, levelActivity) {
  let bmrCalc = 0;

  const activityCoefficient = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  const sexData = {
    male: { factor: 5 },
    female: { factor: -161 },
  };

  const updatedData = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - updatedData.getFullYear();

  if (sex === 'male') {
    bmrCalc =
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.male.factor) *
      activityCoefficient[levelActivity];
    return Math.round(bmrCalc);
  } else if (sex === 'female') {
    bmrCalc =
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.female.factor) *
      activityCoefficient[levelActivity];
    return Math.round(bmrCalc);
  } else {
    throw new Error('Incorrectly indicated gender should be "male" or "female');
  }
}

module.exports = calculateBMR;
