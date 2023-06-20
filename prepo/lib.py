from typing import List, Union

from .evals import Evaluator, Noop
from .llms import LLM


class PromptRunner:
    def __init__(self, id, llm: LLM) -> None:
        self.id = id
        self.llm = llm

    def test(
        self,
        test_id: str,
        prompt: str,
        evaluators: Union[Evaluator, List[Evaluator]] = [Noop()],
        iterations: int = 1,
    ) -> None:
        print(f'Testing {test_id} for prompt {self.id} with prompt "{prompt}"')
        for _ in range(iterations):
            output = self.llm.generate(prompt)
            evals_to_run = evaluators if isinstance(evaluators, list) else [evaluators]
            evaluations = [e.evaluate(output) for e in evals_to_run]
            if iterations > 1:
                print(f"Iteration {_+1} of {iterations}")
            print(f"Output: {output}")
            print(f"Evaluations: {evaluations}\n")


class Tester:
    def __init__(self, llm: LLM) -> None:
        self.llm = llm

    def register(self, prompt_id) -> PromptRunner:
        runner = PromptRunner(prompt_id, self.llm)
        return runner
