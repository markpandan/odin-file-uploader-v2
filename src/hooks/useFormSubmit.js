import { useState } from "react";
import {
  fetchPut,
  fetchPost,
  fetchDelete,
  fetchGet,
} from "../utils/fetchUtils";

const fetchOptions = async ({ method, route, body, token }) => {
  switch (method) {
    case "GET":
      return await fetchGet(route, { token });
    case "POST":
      return await fetchPost(route, body, token);
    case "PUT":
      return await fetchPut(route, body, token);
    case "DELETE":
      return await fetchDelete(route, body, token);
  }
};

const useFormSubmit = (fetch, successCb) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let response;

      if (typeof fetch == "function") response = await fetch;
      else if (typeof fetch == "object")
        response = await fetchOptions({
          method: fetch.method,
          route: fetch.route,
          body: fetch.body,
          token: fetch.token,
        });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        setError("");
        successCb();
      }
    } catch (error) {
      console.error(error);
      setError("An error has occured.");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSubmit };
};

export default useFormSubmit;
