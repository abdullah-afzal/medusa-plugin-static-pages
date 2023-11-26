import { Container, Heading, Button, Toaster } from "@medusajs/ui";
import { PlusMini, DocumentText } from "@medusajs/icons";
import StaticPagesTable from "./components/table";
import { RouteConfig } from "@medusajs/admin";
import { Link } from "react-router-dom";

export const StaticPage = () => {
  return (
    <div>
      <div className="fixed right-0 top-0 z-9999 p-6 max-w-[484px]">
        <Toaster />
      </div>

      <Container title="Static Pages">
        <header className="px-xlarge py-large flex justify-between items-center">
          <Heading level="h2" className="font-semibold">
            Static Pages
          </Heading>
          <Link to="/a/static-pages/create">
            <Button variant="transparent" className="border border-gray-200">
              <PlusMini /> New page
            </Button>
          </Link>
        </header>
        <main>
          <StaticPagesTable />
        </main>
      </Container>
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Static Pages",
    icon: () => <DocumentText />,
  },
};

export default StaticPage;
