import { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { OnChangeFn, PaginationState, Table } from "@tanstack/react-table";
import { ToolbarProps } from "src/components/DataTable/toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PaginationProps<T> {
  table: Table<T>;
  toolbars?: ToolbarProps["toolbars"];
  sizeOptions?: string[];
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
}

export function Pagination<T>({ table, sizeOptions = [], toolbars, pagination }: PaginationProps<T>) {
  // const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();

  const { pageSize, pageIndex: _pageIndex = 0 } = pagination ?? table.getState().pagination;
  console.log("pagination", pagination, "state", table.getState().pagination, "page", pageSize, _pageIndex);
  const pageIndex = pageCount === 0 ? 0 : _pageIndex + 1;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  const mergedSizeOptions = useMemo(() => {
    return sizeOptions ? sizeOptions.map((option) => Number(option)) : undefined;
  }, [sizeOptions]);

  const renderSizeOptions = (sizeOptions?: number[]) => {
    return (
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {sizeOptions &&
                sizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[120px] items-center justify-center text-sm font-medium'>
          Page {pageIndex} of {pageCount}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='flex text-sm text-muted-foreground sm:space-x-6 lg:space-x-8'>
        {selectedCount} of {totalCount} row(s) selected.
      </div>
      {renderSizeOptions(mergedSizeOptions)}
      <div className='flex items-center space-x-2 px-2'>{toolbars}</div>
    </div>
  );
}
