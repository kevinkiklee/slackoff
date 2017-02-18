export const createMessage = (message) => {
  return $.ajax({
    method: 'post',
    url: `api/messages`,
    data: { message }
  });
};
