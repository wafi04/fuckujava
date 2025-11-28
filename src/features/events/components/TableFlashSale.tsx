import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormatCurrency, formatDate } from "@/utils/format";
import { ChevronDown, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { useDeleteProductFlashSale } from "../api/api";
import type { FlashSale, FlashSaleData, ProductFlashSale } from "../types";
import { DialogFlashSale } from "./DialogFlashSale";
import { FormProductFlashSale } from "./FormProductFlashSale";
import { DialogDelete } from "./DialogDeleteFlashSale";

export function TableFlashSales({ data }: { data: FlashSaleData[] }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);

  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale | null>(
    null
  );
  const { mutate } = useDeleteProductFlashSale();
  const [selectedProduct, setSelectedProduct] =
    useState<ProductFlashSale | null>(null);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((flashSale) => (
            <Fragment key={flashSale.id}>
              <TableRow>
                <TableCell className="w-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpand(flashSale.id)}
                  >
                    {expandedRows.has(flashSale.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{flashSale.title}</TableCell>
                <TableCell>{flashSale.description ?? "-"}</TableCell>
                <TableCell>
                  {formatDate(flashSale.start_at)} -{" "}
                  {formatDate(flashSale.end_at)}
                </TableCell>
                <TableCell>
                  {flashSale.is_active ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedFlashSale({
                            ...flashSale,
                            description: flashSale.description as string | "",
                          });
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedFlashSale({
                            ...flashSale,
                            description: flashSale.description as string | "",
                          });
                          setOpenDelete(true);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

              {expandedRows.has(flashSale.id) && (
                <TableRow>
                  <TableCell colSpan={6} className="bg-muted p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Products</h4>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProduct({
                              flash_sale_id: flashSale.id as number,
                              created_at: "",
                              flash_sale_price: 0,
                              id: 0,
                              original_price: 0,
                              product_id: 0,
                              stock_reserved: 0,
                              stock_sold: 0,
                              thumbnail: "",
                            }); // create mode
                            setOpenProductDialog(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Product
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Original Price</TableHead>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Flash Sale Price</TableHead>
                            <TableHead>Stock Reserved</TableHead>
                            <TableHead>Stock Sold</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {flashSale.products.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell>{p.product.name}</TableCell>
                              <TableCell>
                                {FormatCurrency(p.original_price)}
                              </TableCell>
                              <TableCell>
                                <img
                                  src={p.thumbnail}
                                  alt="product flash sale thumbnail"
                                  width={100}
                                  height={100}
                                />
                              </TableCell>
                              <TableCell>
                                {FormatCurrency(p.flash_sale_price)}
                              </TableCell>
                              <TableCell>{p.stock_reserved}</TableCell>
                              <TableCell>{p.stock_sold}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedProduct(p);
                                        setOpenProductDialog(true);
                                      }}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => mutate(p.id)}
                                      className="text-red-600"
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>

      {openEdit && (
        <DialogFlashSale
          open={openEdit}
          onOpen={() => setOpenEdit(false)}
          flashSale={selectedFlashSale as FlashSale}
        />
      )}

      {/* Dialog Delete FlashSale */}
      {openDelete && (
        <DialogDelete
          onOpen={() => setOpenDelete(false)}
          open={openDelete}
          Id={selectedFlashSale?.id}
        />
      )}

      {/* Dialog Create/Update ProductFlashSale */}
      {openProductDialog && (
        <FormProductFlashSale
          open={openProductDialog}
          onClose={() => setOpenProductDialog(false)}
          defaultValues={selectedProduct as ProductFlashSale}
        />
      )}
    </>
  );
}
