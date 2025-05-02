# Test Automation Demo with Cypress

This project demonstrates test automation using Cypress with a React application. It includes a user registration form and automated tests to validate its functionality.

## Project Structure

- `src/App.js` - Main React application with registration form
- `src/App.css` - Styling for the application
- `cypress/e2e/registration.cy.js` - Cypress test cases
- `cypress.config.js` - Cypress configuration

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. In a new terminal, run Cypress:
```bash
npm test
```

## Test Cases

The Cypress tests cover the following scenarios:
- Form display validation
- Empty form submission
- Password mismatch validation
- Successful form submission
- Email format validation

## Test Automation Report

This project can be used to demonstrate the following aspects of test automation:

1. **Manual Testing vs Automated Testing**
   - Shows how automated tests can quickly validate multiple scenarios
   - Demonstrates repeatability and consistency of automated tests

2. **Evolution of Test Automation Tools**
   - Uses modern Cypress framework
   - Demonstrates modern testing practices

3. **Importance of Test Automation**
   - Shows how automated tests catch errors quickly
   - Demonstrates comprehensive test coverage

4. **Challenges in Software Test Automation**
   - Shows handling of different validation scenarios
   - Demonstrates proper error handling

5. **Implementation Details**
   - Justification for using Cypress
   - Test cases covering both valid and invalid scenarios
   - Automated test scripts
   - Test execution results 