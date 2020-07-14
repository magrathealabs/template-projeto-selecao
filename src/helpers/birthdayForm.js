import moment from 'moment';

const formValidations = {
  name: (name) => {
    if(!name) {
      return 'Name is required.';
    }

    return null;
  },
  date: (date) => {
    if(!date) {
      return 'Date is required.';
    }

    if(!moment(date).isValid()) {
      return 'Date must be a valid date.';
    }

    if(!moment(date).isSameOrBefore(moment())) {
      return 'Date must be up to today.';
    }

    return null;
  },
};

export const validateField = (field, value) => formValidations[field](value);

export const validateForm = (form) => {
  const errorEntries = Object.entries(form)
    .map(([field, value]) => [field, validateField(field, value)]);
  return {
    errors: Object.fromEntries(errorEntries),
    isValid: errorEntries.every(([, error]) => !error),
  };
};
