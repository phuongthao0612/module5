const student1 = {
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
}
const student2 = {

}
const showInfo = (student) => {
    const {firstName = 'Quân', degree = 'NA'} = student;
    console.log('First Name: ', firstName, 'Degree: ', degree);
}
showInfo(student1);
showInfo(student2);