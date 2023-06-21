export const fetchRuns = async () => {
  const resp = await fetch("/runs");

  return resp.json();
};

export const fetchRunData = async (run: string) => {
  const resp = await fetch(`/runs/${run}`);

  return resp.json();
};
