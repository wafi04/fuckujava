"use client";
import { useState } from "react";
import { CardCategory } from "./CardCategory";
import CategoriesChoices from "./categoriesTypes";

export function SectionCategory() {
  const [type, setType] = useState("Games");
  return (
    <section className="flex flex-col  w-full">
      <CategoriesChoices type={type} setType={(e) => setType(e)} />
      <CardCategory type={type} />
    </section>
  );
}
