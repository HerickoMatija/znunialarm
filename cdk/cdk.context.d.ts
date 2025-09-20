export type CDKContext = {
  env: {
    account: string;
    region: string;
  };
  appName: string;
  stage: stageNameContext;
  branch: branchNameContext;
};

export type stageNameContext = "test" | "prod";
export type branchNameContext = "test" | "main";
