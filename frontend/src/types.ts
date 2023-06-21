export type Evaluation = {
  type: string;
  score: number;
  pass_threshold: number;
};

export type Iteration = {
  iter_num: number;
  output: string;
  evaluations: Evaluation[];
};

export type Test = {
  prompt: string | Record<string, any>;
  iterations: Iteration[];
};

export type Run = Record<string, Test>;

export type RunData = Record<string, Run>;
