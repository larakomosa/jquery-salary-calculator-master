console.log('First Weekend Assignment!');

const employeeList = [];

$(document).ready(readyNow);

function readyNow() {
  console.log('working');
  $('.js-button').on('click', addEmployee);
  $('.js-employee-list').on('click', '.delete-button', deleteEmployee);
}

function addEmployee() {
  if (
    $.trim($('.js-field-first').val()) === '' ||
    $.trim($('.js-field-last').val()) === '' ||
    $.trim($('.js-field-id').val()) === '' ||
    $.trim($('.js-field-title').val()) === '' ||
    $.trim($('.js-field-salary').val()) === ''
  ) {
    alert('All fields must be completed.  Thank you!');
    return false;
  } else {
    const firstName = $('.js-field-first').val();
    const lastName = $('.js-field-last').val();
    const idNumber = $('.js-field-id').val();
    const jobTitle = $('.js-field-title').val();
    const annualSalary = $('.js-field-salary').val();

    const employee = {
      firstName,
      lastName,
      idNumber,
      jobTitle,
      annualSalary,
      isDeleted: false,
    };
    $('.js-field-first').val('');
    $('.js-field-last').val('');
    $('.js-field-id').val('');
    $('.js-field-title').val('');
    $('.js-field-salary').val('');

    employeeList.push(employee);
    displayEmployees();
  }
}

function displayEmployees() {
  $('.js-employee-list').empty();
  for (let i = 0; i < employeeList.length; i++) {
    console.log('display', employeeList[i]);
    const item = employeeList[i];

    if (item.isDeleted === true) {
    } else {
      $('.js-employee-list').append(
        `<tr>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.idNumber}</td>
            <td>${item.jobTitle}</td>
            <td>${item.annualSalary}</td>
            <td><button class="delete-button" data-index="${i}">Delete</button></td>
          </tr>`
      );
    }
    totalSalaryCosts();
  }
}

function totalSalaryCosts() {
  let totalSalary = 0;
  for (let i = 0; i < employeeList.length; i++) {
    const item = employeeList[i];
    totalSalary += parseInt(item.annualSalary) / 12;
  }
  let monthlySalary = totalSalary.toFixed();

  $('.js-total-salary').text(monthlySalary);
  if (monthlySalary > 20000) {
    $('.js-total-salary').css('background-color', 'red');
    adjustSalary();
  }
}

function deleteEmployee() {
  const index = $(this).data('index');
  employeeList[index].isDeleted = true;

  $(this).parent().parent().empty();
  console.log('working?');

  adjustSalary();
}

function adjustSalary() {
  let monthlySalary = 0;
  for (let i = 0; i < employeeList.length; i++) {
    const item = employeeList[i];

    if (item.isDeleted === false) {
      monthlySalary += parseInt(item.annualSalary / 12);
    }
    console.log(monthlySalary);
  }
  $('.js-total-salary').text(monthlySalary);
  if (monthlySalary > 20000) {
    $('.js-total-salary').css('background-color', 'red');
  }
}
