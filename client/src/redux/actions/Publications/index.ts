export const postPublication = (payload: any) => {
  return async function () {
    console.log("action", payload);
  };
};
