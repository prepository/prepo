import { useEffect, useState } from "react";

export const useGetRuns = () => {
  const [runs, setRuns] = useState<string[]>([]);

  useEffect(() => {
    const fn = async () => {
      setRuns(await fetchRuns());
    };

    fn();
  }, []);

  return runs;
};

export const fetchRuns = async () => {
  const resp = await fetch("http://localhost:8000/runs");

  return resp.json();
};

export const fetchRunData = async (run: string) => {
  const resp = await fetch(`http://localhost:8000/runs/${run}`);

  return resp.json();
};
