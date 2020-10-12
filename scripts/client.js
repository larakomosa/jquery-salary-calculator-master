console.log('First Weekend Assignment!');

const employeeList = []; //array to store employee information (objects)

$(document).ready(readyNow);

function readyNow() {
  //function called once corresponding button is clicked
  console.log('readyNow');
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

    employeeList.push(employee); //stores employee object in array
    displayEmployees(); //sends data to display employee function
  }
}

function displayEmployees() {
  //display employees on DOM
  $('.js-employee-list').empty();
  for (let i = 0; i < employeeList.length; i++) {
    const item = employeeList[i];

    if (item.isDeleted === true) {
      //prevents deleted employees from jumping back on DOM when new employee is submitted
    } else {
      $('.js-employee-list').append(
        `<tr>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.idNumber}</td>
            <td>${item.jobTitle}</td>
            <td>$${item.annualSalary.replace(
              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
              ','
            )}</td>
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
  $('.js-total-salary').text(
    totalSalary.toFixed().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  );

  adjustSalary();
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
  }
  $('.js-total-salary').text(
    monthlySalary.toFixed().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  );
  if (monthlySalary > 20000) {
    $('.js-total-salary').css('background-color', 'red');
  } else if (monthlySalary < 20000)
    $('.js-total-salary').css('background-color', 'white');
}
