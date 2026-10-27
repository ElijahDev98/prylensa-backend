import { ComparisonWorkspaceController } from "./controllers/ComparisonWorkspaceController.js";
import { ComparisonWorkspaceService } from "./services/ComparisonWorkspaceService.js";

export const comparisonWorkspaceController = new ComparisonWorkspaceController(
  new ComparisonWorkspaceService(),
);
