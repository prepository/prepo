from abc import ABC, abstractmethod


class LLM(ABC):
    def __init__(self, api_key):
        self.api_key = api_key

    @abstractmethod
    def generate(self, prompt: str) -> str:
        pass
