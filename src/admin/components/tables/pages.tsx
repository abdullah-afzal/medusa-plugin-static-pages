import { useMemo, useState } from "react"
import { useTable, usePagination, useSortBy } from "react-table"

const PageTable = ({ pages }) => {
   console.log(pages)
   const columns = useMemo(() => [
         {
            id: "pages",
            Header: "",
            columns: [
               {
                  Header: "Name",
                  accessor: "rating",
               },
               {
                  Header: "Slug",
                  accessor: "display_name",
               },
            ],
         },
      ],
      []
   )

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
         columns,
         data: pages,
         defaultColumn: {
            width: "auto",
         },
      }
   )

   return (
      <div className="relative">
      <table {...getTableProps()} className="w-full table-auto">
         <thead className="inter-small-semibold text-grey-50 border-grey-20 whitespace-nowrap border-t border-b">
            {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getHeaderGroupProps()} role="row">
                  {headerGroup.headers.map((column) => (
                     <th {...column.getHeaderProps()} className="">
                        {column.render("Header")}
                     </th>
                  ))}
               </tr>
            ))}
         </thead>
         <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
               prepareRow(row)
               return (
                  <tr {...row.getRowProps()}>
                     {row.cells.map((cell) => {
                        return (
                           <td {...cell.getCellProps()} className="border px-4 py-2">
                              {cell.render("Cell")}
                           </td>
                        )
                     })}
                  </tr>
               )
            })}
         </tbody>
      </table>
      </div>
   )
}

export default PageTable
