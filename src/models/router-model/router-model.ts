import { createBrowserHistory } from "history";
import { createRouter } from "trace-router";

export const history = createBrowserHistory();

export const router = createRouter({ history });
router.use(history);

export const exactRoute = router.add({ path: "(/.*)?" });
