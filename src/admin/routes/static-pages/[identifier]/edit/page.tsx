import { useParams, useNavigate } from "react-router-dom";
import { Container, Heading } from "@medusajs/ui";
import StaticPageForm from "../../components/static-page-form";
import { useAdminCustomQuery } from "medusa-react";
import { Page } from "../../../../../models/page";
import Loader from "../../components/loader";

const UpdatePage = () => {
    const navigate = useNavigate();
    const { identifier } = useParams();
    const { data, isLoading } = usePageByIdOrHandle({
        path: `pages/${identifier}`,
        query: {
            identifier: identifier,
        },
    });
    if (!data || isLoading) return <Loader />;

    if (!data.page) return navigate("/a/static-pages");

    return (
        <div>
            <Container>
                <header className="py-large">
                    <Heading level="h2" className="font-semibold">
                        Update Page
                    </Heading>
                </header>
                <StaticPageForm type="update" defaultValues={data?.page} />
            </Container>
        </div>
    );
};

export default UpdatePage;

export function usePageByIdOrHandle({
    path,
    queryKey,
    query,
}: {
    path: string;
    queryKey?: any[];
    query?: { identifier: string };
}) {
    const res = useAdminCustomQuery<typeof query, { page: Page }>(
        path,
        [path.split("/").join("-"), ...(queryKey ? queryKey : [])],
        query
    );

    return res;
}
