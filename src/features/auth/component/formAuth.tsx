"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ReactNode } from "react";

interface AuthPageProps {
  children: ReactNode;
  title: string;
  description: string;
}
export function AuthPage({ children, description, title }: AuthPageProps) {
  
  return (
      <main
        className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat  p-4"
        style={{
          backgroundImage:   "url('/image.png')" ,
        }}
      >
        <Card className="backdrop-blur-md  bg-accent/10 rounded-xl shadow-xl overflow-hidden relative max-w-md w-full">
          <CardHeader>
            <CardTitle className=" text-[20px]">{title}</CardTitle>
            <CardDescription className=" text-[12,5px]">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="">{children}</CardContent>
        </Card>
      </main>
  );
}
