import { ToolCreatePage } from "../pages/tool/ToolCreatePage";
import { ToolDetailsPage } from "../pages/tool/ToolDetailsPage";
import { ToolEditPage } from "../pages/tool/ToolEditPage";
import { ToolsDashboardPage } from "../pages/tool/ToolsDashboardPage";
import { ToolsPage } from "../pages/tool/ToolsPage";

export const toolRoutes = [
  {
    path: "/",
    element: <ToolsDashboardPage />,
  },
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
