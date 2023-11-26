import { Container, Heading } from "@medusajs/ui";
// import "./page.css";
import StaticPageForm from "../components/static-page-form";

const CreatePage = () => {
  return (
    <Container>
      <header className="py-large">
        <Heading level="h2" className="font-semibold">
          Create Page
        </Heading>
      </header>
      <StaticPageForm type="create" />
    </Container>
  );
};

export default CreatePage;
