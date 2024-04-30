const calculateAge = (birthdate) => {
    try {
      // Logic to calculate age based on birthdate
      const birthDateObj = new Date(birthdate);
      const currentDate = new Date();
  
      const age = currentDate.getFullYear() - birthDateObj.getFullYear();
  
      // Adjust age if the birthday hasn't occurred yet this year
      if (
        currentDate.getMonth() < birthDateObj.getMonth() ||
        (currentDate.getMonth() === birthDateObj.getMonth() &&
          currentDate.getDate() < birthDateObj.getDate())
      ) {
        return age - 1;
      }
  
      return age;
    } catch (error) {
      throw new Error("Failed to calculate age");
    }
  };
  
  module.exports = {calculateAge};
  