export const removeUser = (userName, birthdayList) => {
  const index = birthdayList.findIndex((name) => name === userName);

  if(index === -1) {
    return [...birthdayList];
  }

  return [...birthdayList.slice(0, index), ...birthdayList.slice(index +1)];
};
