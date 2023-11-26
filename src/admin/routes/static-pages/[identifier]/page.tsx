import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Heading, Toaster, DropdownMenu, useToast } from "@medusajs/ui";
import { ArrowLeft, EllipsisHorizontal, Trash, PencilSquare } from "@medusajs/icons"
import { useAdminCustomQuery } from "medusa-react";
import { Page } from "../../../../models/page";
import Loader from "../components/loader";
import { useDeletePage } from "../components/table";
const ViewPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { identifier } = useParams();
    const { data, isLoading } = usePageByIdOrHandle({
        path: `pages/${identifier}`,
        query: {
            identifier: identifier,
        },
    });
    const { mutate: deletePage, isLoading: isDeletingPage } = useDeletePage({
        path: `pages/${identifier}/delete`,
    });

    function handleDeletePage() {
        deletePage(null, {
            onSuccess: ({ message }) => {
                toast({
                    title: "Success",
                    description: message,
                    variant: "success",
                });
                navigate("/a/static-pages")
            },
            onError: (err) => {
                console.log(err);
            },
        });
    }
    if (!data || isLoading) return <Loader />;

    if (!data.page) return navigate("/a/static-pages");

    return (
        <div>
            <div className="fixed right-0 top-0 z-9999 p-6 max-w-[484px]">
                <Toaster />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', margin: '15px' }}>
                <Link to={"/a/static-pages"} className="gap-x-2 flex flex-center"><ArrowLeft /> Back to Static Pages</Link>
            </div>

            {!isLoading && <Container>
                <header className="px-xlarge pb-2 flex justify-between items-center">
                    <Heading level="h2" className="font-semibold">
                        {data.page.title}
                    </Heading>
                    <DropdownMenu>
                        <DropdownMenu.Trigger asChild>

                            <EllipsisHorizontal />
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content>
                            <DropdownMenu.Item className="gap-x-2" onClick={() => navigate(`/a/static-pages/${identifier}/edit`)}><PencilSquare /> Edit</DropdownMenu.Item>

                            <DropdownMenu.Separator />
                            <DropdownMenu.Item className="gap-x-2 text-red-500" onClick={handleDeletePage}><Trash />Delete</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu>
                </header>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: data.page.body }} />
            </Container>}
        </div>
    );
};

export default ViewPage;

function usePageByIdOrHandle({
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