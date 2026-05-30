export const extractErrorMessage = (err, fallback = "Lỗi hệ thống") => {
  return err.response?.data?.message || err.message || fallback;
};
