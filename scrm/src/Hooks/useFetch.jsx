import { useState, useEffect } from "react";

// custom hook must start with use....
const useFetch = (url) => {
  //refresh the page => refresh the page to original value
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //useEffect that runs only when page initially load
  //pass in [] as dependency array
  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal }) //return a promise of response object
      .then((res) => {
        if (!res.ok) {
          //http OK from server
          throw Error("could not fetch data");
        }
        return res.json(); //return another promise of data
      })
      .then((data) => {
        //a javascript object (array) format
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        //by default catch if cannot connect to server and all the errors that are thrown above
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      });

    // when the page is unmounted, it is gonna abort fetch to avoid error
    return () => abortCont.abort();
  }, [url]); //whenerver url change, it runs useEffect again

  return { data, isPending, error };
};

export default useFetch;
