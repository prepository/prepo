import asyncio
from typing import Any

from . import Case, Prompt
from .llms import LLM


class Job:
    def __init__(self, prompt: Prompt, case: Case, iter_num: int, llm: LLM):
        self.prompt = prompt
        self.case = case
        self.iter_num = iter_num
        self.llm = llm

        self.has_run = False

    async def run(self):
        # print("running", self.prompt.id, self.case.id, self.iter_num)
        output = self.llm.generate(self.case.prompt)
        evaluations = self.case.evaluate(output)

        # await asyncio.sleep(2)

        self.has_run = True
        self._results = {
            "prompt_id": self.prompt.id,
            "case_id": self.case.id,
            "iter_num": self.iter_num,
            "prompt": self.case.prompt,
            "output": output,
            "evaluations": [e.__dict__ for e in evaluations],
        }

    def get_results(self):
        if not self.has_run:
            raise Exception("Job has not been run yet")

        return self._results


class Runner:
    def __init__(self) -> None:
        self.jobs: list[Job] = []

    def size(self) -> int:
        return len(self.jobs)

    def add_job(self, job: Job):
        self.jobs.append(job)

    async def run_all_jobs(self, batch_size=10) -> dict[str, Any]:
        jobs = [job.run() for job in self.jobs]
        for i in range(0, len(jobs), batch_size):
            batch = jobs[i : i + batch_size]
            await asyncio.gather(*batch)

        results = []
        for job in self.jobs:
            results.append(job.get_results())

        formatted_results = {}
        for result in results:
            prompt_id = result["prompt_id"]
            case_id = result["case_id"]
            evaluations = result["evaluations"]

            formatted_results.setdefault(prompt_id, {})
            formatted_results[prompt_id].setdefault(
                case_id,
                {
                    "prompt": result["prompt"],
                    "iterations": [],
                },
            )

            formatted_results[prompt_id][case_id]["iterations"].append(
                {
                    "iter_num": result["iter_num"],
                    "output": result["output"],
                    "evaluations": evaluations,
                }
            )

        return formatted_results
