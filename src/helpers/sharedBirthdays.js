export const removeUser = (userName, birthdayList) => {
  const index = birthdayList.findIndex((name) => name === userName);

  if(index === -1) {
    return birthdayList;
  }

  birthdayList.splice(index, 1);
  return birthdayList;
};
