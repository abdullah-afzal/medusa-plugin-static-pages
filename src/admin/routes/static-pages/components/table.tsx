import { Table, DropdownMenu, Toaster, useToast } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash, EyeMini } from "@medusajs/icons";
import { useNavigate } from "react-router-dom";
import { useAdminCustomQuery, useAdminCustomDelete } from "medusa-react";
import { Page } from "../../../../models/page";
import Loader from "./loader";

export default function StaticPagesTable() {
  const {
    data,
    isLoading: isLoadingPages,
    refetch,
  } = usePages({
    path: "pages",
  });

  if (!data || isLoadingPages) return <Loader />;
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="w-3/7">Title</Table.HeaderCell>
            <Table.HeaderCell className="w-3/7">Handle</Table.HeaderCell>
            <Table.HeaderCell className="w-1/7"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.pages?.map((page) => {
            return (
              <Table.Row key={page.id} className="cursor-pointer">
                <Table.Cell>{page.title}</Table.Cell>
                <Table.Cell>{page.handle}</Table.Cell>
                <Table.Cell>
                  <ActionButtons
                    identifier={page.handle}
                    refetch={refetch}
                    isLoadingPages={isLoadingPages}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

function ActionButtons({
  identifier,
  refetch,
  isLoadingPages,
}: {
  identifier: string;
  refetch: () => void;
  isLoadingPages: boolean;
}) {
  const { toast } = useToast();
  const { mutate: deletePage, isLoading: isDeletingPage } = useDeletePage({
    path: `pages/${identifier}/delete`,
  });
  const navigate = useNavigate();
  function handleDeletePage() {
    deletePage(null, {
      onSuccess: ({ message }) => {
        toast({
          title: "Success",
          description: message,
          variant: "success",
        });
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>

        <EllipsisHorizontal />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-x-2" onClick={() => navigate(`/a/static-pages/${identifier}`)}><EyeMini /> View</DropdownMenu.Item>
        <DropdownMenu.Item className="gap-x-2" onClick={() => navigate(`/a/static-pages/${identifier}/edit`)}><PencilSquare /> Edit</DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item className="gap-x-2 text-red-500" onClick={handleDeletePage}><Trash />Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}

export function usePages({
  path,
  queryKey,
  query,
}: {
  path: string;
  queryKey?: any[];
  query?: Page;
}) {
  const res = useAdminCustomQuery<typeof query, { pages: Page[] }>(path, [
    path.split("/").join("-"),
    ...(queryKey ? queryKey : []),
    query,
  ]);

  return res;
}

export function useDeletePage({
  path,
  queryKey,
}: {
  path: string;
  queryKey?: any[];
}) {
  const res = useAdminCustomDelete<{ message: string }>(path, [
    path.split("/").join("-"),
    ...(queryKey ? queryKey : []),
  ]);

  return res;
}