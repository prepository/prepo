export type Iteration = {
  output: string;
  score: number;
};

export type TestRun = {
  id: string;
  prompt: string;
  minScore: number;
  iterations: Iteration[];
};

export type Prompt = {
  id: string;
  runs: TestRun[];
};
