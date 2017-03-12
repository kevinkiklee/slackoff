export const fetchUsers = () => {
  return $.ajax({
    method: 'get',
    url: `api/users`
  });
};

export const updateUser = (formData) => {
  return $.ajax({
    method: 'patch',
    url: `api/users/${formData.id}`,
    contentType: false,
    processData: false,
    data: formData
  })
}
