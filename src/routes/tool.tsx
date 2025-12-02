import { ToolCreatePage } from "../pages/tool/ToolCreatePage";
import { ToolDetailsPage } from "../pages/tool/ToolDetailsPage";
import { ToolEditPage } from "../pages/tool/ToolEditPage";
import { ToolsPage } from "../pages/tool/ToolsPage";

export const toolRoutes = [
  {
    path: "/tools",
    element: <ToolsPage />,
  },
  {
    path: "/tools/add",
    element: <ToolCreatePage />,
  },
  {
    path: "/tools/:id",
    element: <ToolDetailsPage />,
  },
  {
    path: "/tools/:id/edit",
    element: <ToolEditPage />,
  },
];
