from typing import List, Union

from .evals import Evaluation, Evaluator
from .llms import LLM


class Case:
    def __init__(
        self, id: str, prompt: str, evaluators: List[Evaluator], num_iterations: int = 1
    ) -> None:
        self.id = id
        self.prompt = prompt
        self.evaluators = evaluators
        self.num_iterations = num_iterations

    def evaluate(self, output: str):
        res: list[Evaluation] = []
        for evaluator in self.evaluators:
            res.append(evaluator.evaluate(output))

        return res


class Prompt:
    def __init__(self, id: str):
        self.id = id
        self.cases: dict[str, Case] = {}

    def test(
        self,
        case_id: str,
        prompt: str,
        evaluators: Union[Evaluator, List[Evaluator]],
        iterations: int = 1,
    ):
        if not isinstance(evaluators, list):
            evaluators = [evaluators]

        self.cases[case_id] = Case(case_id, prompt, evaluators, iterations)


class PromptTester:
    def __init__(self, llm: LLM, out_dir: str = "./tests/") -> None:
        self.llm = llm
        self.out_dir = out_dir
        self.tests: dict[str, Prompt] = {}

    def register(self, prompt_id) -> Prompt:
        prompt_test = Prompt(prompt_id)
        self.tests[prompt_id] = prompt_test
        return prompt_test
