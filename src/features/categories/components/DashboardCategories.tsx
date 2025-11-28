"use client"
import { FilterDashboard } from "@/app/dashboard/_components/FilterDashboard";
import { HeaderDashboard } from "@/components/ui/HeaderDashboard";
import { PaginationComponents } from "@/components/ui/PaginationComponent";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { useFindCategoryReseller } from "../useGetAllCategory";
import { TableCategoryReseller } from "./TableCategoryReseller";

export default function DashboaordCategories(){
    const [page,setPage]  = useState<number>(1)
    const [search,setSearch]  = useState<string>("")
    const [limit,setLimit]  = useState<number>(10)


    const debounce = useDebounce(search,500)
    const {data} = useFindCategoryReseller({
        filters : {
            limit : limit.toString(),
            page : page.toString(),
            search : debounce,
        }
    })
    return (
        <main className="p-6 space-y-4">
            <HeaderDashboard>
             <FilterDashboard currentLimit={limit} searchTerm={search} setCurrentLimit={(e)  => setLimit(e)} setSearchTerm={(e)  => setSearch(e)}/>
            </HeaderDashboard>
        {
            data?.data.data && (
                <TableCategoryReseller data={data.data.data}/>
            )
        }
        {
            data?.data.meta && (
                <PaginationComponents onPageChange={(e) => setPage(e)} pagination={data.data.meta}/>
            )
        }
        </main>
    )
}