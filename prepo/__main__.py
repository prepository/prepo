from types import ModuleType

import typer
import uvicorn

from . import PromptTester
from .runner import Job, Runner
from .server import app

cli = typer.Typer()


@cli.command()
def run():
    uvicorn.run(app, host="127.0.0.1", port=8000)


def run_and_store_tests_in_module(module: ModuleType):
    runner = Runner()
    for name in dir(module):
        tester = getattr(module, name)
        if isinstance(tester, PromptTester):
            # for each test, for each case, for each iteration, create a job
            for test in tester.tests.values():
                for case in test.cases.values():
                    for i in range(case.num_iterations):
                        runner.add_job(
                            Job(
                                prompt=test,
                                case=case,
                                llm=tester.llm,
                                iter_num=i,
                            )
                        )

    if runner.size():
        results = runner.run_all_jobs()
        import json

        print(json.dumps(results))

    # run all jobs in batches


def find_and_run_tests():
    import os
    import sys

    load_dir = "./tests"

    with os.scandir(load_dir) as it:
        for file_entry in it:
            if file_entry.name.endswith(".py") and file_entry.is_file():
                module_name = f"tests.{file_entry.name[:-3]}"
                __import__(module_name)
                module = sys.modules[module_name]
                run_and_store_tests_in_module(module)


if __name__ == "__main__":
    find_and_run_tests()
