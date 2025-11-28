import InvoicePage from "../client";

export default function Page({params} : {params : {slug : string}}){
  return <InvoicePage slug={params.slug} />
}