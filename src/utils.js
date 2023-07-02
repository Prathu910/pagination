const paginate = (users) => {
  const itemsPerPage = 10;

  const newUsersArr = Array.from({ length: 10 }, (_, index) => {
    const start = index * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  });

  return newUsersArr;
};

export default paginate;
