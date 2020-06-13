import { manifest } from "./manifest";
import { handler } from "./handler";
import { test } from "./test";

const provider = {
  name: "apdotstudiopro",
  manifest,
  handler,
  test,
};

export default provider;
