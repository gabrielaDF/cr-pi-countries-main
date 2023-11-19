export const validateName = (name) => {
  if (
    !name.trim() ||
    !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) ||
    name.length <= 3
  ) {
    return "The name must not contain special characters and must be larger than two";
  }
  return null; // No error
};

export const validateDifficulty = (difficulty) => {
  if (!difficulty) {
    return "You must select a Difficulty level";
  }
  return null; // No error
};

export const validateSeason = (season) => {
  if (!season.trim()) {
    return "You must select some season of the year";
  }
  return null; // No error
};

export const validateCountries = (countries) => {
  if (countries.length < 1) {
    return "You must select at least one country";
  }
  return null; // No error
};
