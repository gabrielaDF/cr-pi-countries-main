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
export function validateField(fieldName, value) {
  switch (fieldName) {
    case "name":
      return validateName(value);
    case "difficulty":
      return validateDifficulty(value);
    case "season":
      return validateSeason(value);
    case "countries":
      return validateCountries(value);
    default:
      return "";
  }
}

export function validateAllFieldsFilled(state) {
  const { name, difficulty, duration, season, countries } = state;

  if (
    !name ||
    difficulty === 0 ||
    !duration ||
    !season ||
    countries.length === 0
  ) {
    return "Please fill in all fields";
  }

  return "";
}
