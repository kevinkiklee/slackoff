export const signup = (user) => {
  return $.ajax({
    method: 'post',
    url: 'api/users',
    data: { user }
  });
};

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
