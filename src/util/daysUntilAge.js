
const daysUntilAge = (dob, targetAgeYears) => {
    const birth = new Date(dob);
    const targetDate = new Date(birth.getFullYear() + targetAgeYears, birth.getMonth(), birth.getDate());
    const today = new Date();
    const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return diffDays;
};
export default daysUntilAge