export const fetchRequest = async (
  url: string,
  method: "POST" | "DELETE" | "GET" | "PUT",
  data?: {},
  headers?: {}
): Promise<EXTResponse> => {
  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    body: JSON.stringify({
      name: "test",
      content: "test",
      userId: "test",
    }),
  });

  if (response.ok || response.status === 201) {
    let result: EXTResponse = {
      type: "SUCCESS",
      data: await response.json(),
    };
    return result;
  }

  let result: EXTResponse = {
    type: "FAILED",
    data: await response.json(),
  };

  return result;
};
