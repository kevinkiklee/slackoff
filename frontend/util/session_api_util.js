export const signup = (formData) => {
  return $.ajax({
    method: 'post',
    url: 'api/users',
    contentType: false,
    processData: false,
    data: formData
  });
};

// export const login = (formData) => {
//   return $.ajax({
//     method: 'post',
//     url: 'api/session',
//     contentType: false,
//     processData: false,
//     data: formData
//   });
// };

export const login = (user) => {
  return $.ajax({
    method: 'post',
    url: 'api/session',
    data: { user }
  });
};

export const logout = () => {
  return $.ajax({
    method: 'delete',
    url: 'api/session'
  });
};

export const getUser = (id) => {
  return $.ajax({
    method: 'get',
    url: `api/users/${id}`
  });
};

export const deleteSubscription = (channel_id) => {
  return $.ajax({
    method: 'delete',
    url: `api/subscriptions/`,
    data: { channel_id }
  });
};
