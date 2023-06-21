from abc import ABC, abstractmethod
from typing import List


class Evaluation:
    def __init__(self, type: str, score: float, pass_threshold: float) -> None:
        self.type = type
        self.score = score
        self.pass_threshold = pass_threshold


class Evaluator(ABC):
    def __init__(self) -> None:
        pass

    @abstractmethod
    def evaluate(self, output: str) -> Evaluation:
        pass


class Noop(Evaluator):
    def __init__(self) -> None:
        pass

    def evaluate(self, output: str) -> Evaluation:
        return Evaluation(type=self.__class__.__name__, score=1.0, pass_threshold=1.0)


class ExactMatch(Evaluator):
    def __init__(self, target: str) -> None:
        self.target = target

    def evaluate(self, output: str) -> Evaluation:
        return Evaluation(
            type=self.__class__.__name__,
            score=1.0 if output == self.target else 0.0,
            pass_threshold=1.0,
        )


class IncludeWords(Evaluator):
    def __init__(self, target_words: List[str]) -> None:
        self.target_words = target_words

    def evaluate(self, output: str) -> Evaluation:
        string_words = set(output.split(" "))
        any_words_missing = False
        for word in self.target_words:
            if word not in string_words:
                any_words_missing = True
                break

        return Evaluation(
            type=self.__class__.__name__,
            score=1.0 if not any_words_missing else 0.0,
            pass_threshold=1.0,
        )


class LLMEval(Evaluator):
    def __init__(self, instruction: str, pass_threshold: float) -> None:
        self.instruction = instruction
        self.pass_threshold = pass_threshold

    def grade_output(self, output: str) -> float:
        import random

        return random.random()

    def evaluate(self, output: str) -> Evaluation:
        score = self.grade_output(output)
        return Evaluation(
            type=self.__class__.__name__,
            score=score,
            pass_threshold=self.pass_threshold,
        )
