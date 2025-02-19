const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'Male',
    occupation: 'developer',
    nationality: 'American',
    city: 'New York',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['English', 'Spanish'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Harvard University',
    }
}
const {firstName, gender, education: {degree}, languages} = person
const student = {
    firstName,
    gender,
    degree,
    english: languages.includes('English') ? 'Yes' : 'No',
};
console.log(student);