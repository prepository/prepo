import { useEffect, useState } from "react";
import { MOCK_FRUIT_EMOTION_GENERATION } from "./mocks";
import { Prompt, TestRun } from "./types";
import { cn } from "./lib/cn";

type DataType = { prompts: Prompt[] };

const getStatusFromRun = (run: TestRun) => {
  const allIterationsPassed = run.iterations.every(
    (iter) => iter.score >= run.minScore
  );
  const allIterationsFailed = run.iterations.every(
    (iter) => iter.score < run.minScore
  );
  return allIterationsPassed ? "pass" : allIterationsFailed ? "fail" : "warn";
};

type Status = "pass" | "warn" | "fail";

const getClassesForStatus = (status: Status) => {
  return {
    "bg-green-500": status === "pass",
    "bg-yellow-500": status === "warn",
    "bg-red-500": status === "fail",
  };
};

const StatusCircle: React.FC<{ status: Status }> = ({ status }) => {
  return (
    <div className={cn("w-2 h-2 rounded-full", getClassesForStatus(status))} />
  );
};

function App() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const newData = MOCK_FRUIT_EMOTION_GENERATION;
    setData(newData);

    const pid = newData.prompts[0].id;
    if (pid) setPromptId(pid);

    const rid = newData.prompts[0].runs[0].id;
    if (rid) setRunId(rid);
  }, []);

  const [promptId, setPromptId] = useState<string | null>("");
  const [runId, setRunId] = useState<string | null>("");

  const runData = data?.prompts
    .find((p) => p.id === promptId)
    ?.runs.find((r) => r.id === runId);

  return (
    <main className="h-screen">
      <div className="px-4 h-[48px] flex items-center">
        <h1 className="text-lg font-medium">prepo</h1>
      </div>
      <div className="border w-full grid grid-cols-4 h-[calc(100vh-48px)]">
        <div className="col-span-1 border-r h-full overflow-auto">
          <h2 className="font-medium py-2 px-4 sticky top-0 bg-white border-b">
            Tests
          </h2>
          <div className="">
            {data?.prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={cn("px-4 py-2 border-b", {
                  "bg-slate-50": promptId === prompt.id,
                })}
              >
                <p
                  className={cn(
                    "mb-2 rounded -ml-3 px-3 py-1 cursor-pointer",
                    {}
                  )}
                  onClick={() => {
                    setPromptId(prompt.id);
                    setRunId(prompt.runs[0].id);
                  }}
                >
                  {prompt.id}
                </p>
                <div className="">
                  {prompt.runs.map((run) => {
                    return (
                      <div key={run.id}>
                        <div
                          className={cn(
                            "flex items-center space-x-2 hover:text-blue-600 rounded -ml-3 px-3 py-1 cursor-pointer",
                            {
                              "font-semibold rounded": runId === run.id,
                            }
                          )}
                          onClick={() => {
                            setRunId(run.id);
                            setPromptId(prompt.id);
                          }}
                        >
                          <StatusCircle status={getStatusFromRun(run)} />
                          <p>{run.id}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {data?.prompts.length === 0 && (
              <div>
                <p className="text-gray-400">No prompts run</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3 h-full overflow-auto">
          {promptId && runId && runData && (
            <>
              <div className="flex items-center space-x-2 py-2 bg-slate-50 px-4 sticky top-0 border-b">
                <StatusCircle status={getStatusFromRun(runData)} />
                <p>{runId}</p>
              </div>
              <div className="px-4 py-2 space-y-4">
                <div>
                  <p className="font-medium mb-1">Prompt</p>
                  <p>{runData.prompt.repeat(20)}</p>
                </div>
                <div className="w-fit text-sm mb-1 bg-slate-50 rounded border px-3 py-2">
                  Min Score
                  <span className="ml-2 font-bold">{runData.minScore}</span>
                </div>
                <div>
                  <p className="font-medium mb-1">Runs</p>
                  {runData.iterations.map((iter, i) => {
                    return (
                      <div
                        key={i}
                        className="relative bg-slate-50 border rounded px-3 py-3 mb-2"
                      >
                        <p className="mb-1 text-xs px-1 rounded text-slate-500 absolute top-1 right-1">
                          {i + 1} of {runData.iterations.length}
                        </p>
                        <div
                          className={cn(
                            "text-white w-fit px-2 py-0.5 rounded text-sm mb-2",
                            getClassesForStatus(
                              iter.score >= runData.minScore ? "pass" : "fail"
                            )
                          )}
                        >
                          <span className="mr-1">Score</span>
                          {iter.score}
                        </div>
                        <p className="whitespace-pre-line">
                          {iter.output.repeat(20) +
                            "\n\n" +
                            iter.output.repeat(10)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
