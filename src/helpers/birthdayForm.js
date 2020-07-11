export const formValidations = {
  name: (name) => {
    let error = null;
    if(name === '') {
      error = 'Name is required.';
    }

    return error;
  },
  date: (date) => {
    let error = null;
    if(date === null) {
      error = 'Date is required.';
    }

    return error;
  },
};
