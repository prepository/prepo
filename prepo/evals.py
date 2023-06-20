from abc import ABC, abstractmethod
from typing import List


class Test:
    def __init__(self, score, pass_threshold) -> None:
        self.score = score
        self.pass_threshold = pass_threshold

    def __bool__(self) -> bool:
        return self.score >= self.pass_threshold

    def __repr__(self) -> str:
        return f"Test(score={self.score}, pass_threshold={self.pass_threshold}, pass={self.__bool__()})"


class Evaluator(ABC):
    def __init__(self) -> None:
        pass

    @abstractmethod
    def evaluate(self, string: str) -> Test:
        pass


class Noop(Evaluator):
    def __init__(self) -> None:
        pass

    def evaluate(self, string: str) -> Test:
        print(string)
        return Test(score=1.0, pass_threshold=1.0)


class ExactMatch(Evaluator):
    def __init__(self, target: str) -> None:
        self.target = target

    def evaluate(self, string: str) -> Test:
        return Test(score=1.0 if string == self.target else 0.0, pass_threshold=1.0)


class IncludeWords(Evaluator):
    def __init__(self, target_words: List[str]) -> None:
        self.target_words = target_words

    def evaluate(self, string: str) -> Test:
        string_words = set(string.split(" "))
        any_words_missing = False
        for word in self.target_words:
            if word not in string_words:
                any_words_missing = True
                break

        return Test(
            score=1.0 if not any_words_missing else 0.0,
            pass_threshold=1.0,
        )
