from typing import List, Union

from .evaluators import Evaluation, Evaluator
from .llms import LLM


class Case:
    def __init__(
        self,
        id: str,
        prompt: str = "",
        messages: list = [],
        evaluators: List[Evaluator] = [],
        num_iterations: int = 1,
        model_params: dict = {},
    ) -> None:
        self.id = id
        self.prompt = prompt
        self.messages = messages
        self.evaluators = evaluators
        self.num_iterations = num_iterations
        self.model_params = model_params

    def evaluate(self, output: str):
        res: list[Evaluation] = []
        for evaluator in self.evaluators:
            res.append(evaluator.evaluate(output))

        return res


class Prompt:
    def __init__(self, id: str, model_params: dict = {}):
        self.id = id
        self.cases: dict[str, Case] = {}
        self.model_params = model_params

    def test(
        self,
        case_id: str,
        prompt: str,
        evaluators: Union[Evaluator, List[Evaluator]],
        iterations: int = 1,
        model_params: dict = {},
    ):
        if not isinstance(evaluators, list):
            evaluators = [evaluators]

        self.cases[case_id] = Case(
            case_id,
            prompt=prompt,
            evaluators=evaluators,
            num_iterations=iterations,
            model_params=model_params or self.model_params,
        )

    def test_chat(
        self,
        case_id: str,
        messages: list,
        evaluators: Union[Evaluator, List[Evaluator]] = [],
        iterations: int = 1,
        model_params: dict = {},
    ):
        if not isinstance(evaluators, list):
            evaluators = [evaluators]

        self.cases[case_id] = Case(
            case_id,
            messages=messages,
            evaluators=evaluators,
            num_iterations=iterations,
            model_params=model_params or self.model_params,
        )


class PromptTester:
    def __init__(self, llm: LLM, model_params: dict = {}) -> None:
        self.llm = llm
        self.tests: dict[str, Prompt] = {}
        self.model_params = model_params

    def register(self, prompt_id) -> Prompt:
        prompt_test = Prompt(prompt_id, model_params=self.model_params)
        self.tests[prompt_id] = prompt_test
        return prompt_test
