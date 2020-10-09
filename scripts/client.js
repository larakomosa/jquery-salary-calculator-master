console.log('First Weekend Assignment!');

const employeeList = [];

$(document).ready(readyNow);

function readyNow() {
  console.log('working');
  $('.js-button').on('click', addEmployee);
}

function addEmployee() {
  const firstName = $('.js-field-first').val();
  const lastName = $('.js-field-last').val();
  const idNumber = $('.js-field-id').val();
  const jobTitle = $('.js-field-title').val();
  const annualSalary = $('.js-field-salary').val();
  console.log(firstName, lastName, idNumber, jobTitle, annualSalary);

  const employee = {
    firstName,
    lastName,
    idNumber,
    jobTitle,
    annualSalary,
  };
  employeeList.push(employee);
}
