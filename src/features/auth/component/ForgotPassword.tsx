"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { useForgotPassword } from "../api"
import { AuthPage } from "./formAuth"

// Schema validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Email harus valid"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const { mutate, isPending } = useForgotPassword()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: ForgotPasswordFormData) {
    mutate(values, {
      onSuccess: () => {
        setIsSuccess(true)
        reset()
        // Reset success message setelah 5 detik
        setTimeout(() => setIsSuccess(false), 5000)
      },
    })
  }

  return (
    <AuthPage
      title="Lupa Password"
      description="Masukkan email Anda dan kami akan mengirimkan link untuk mereset password."
    >
      {isSuccess ? (
        <div className="rounded-lg bg-green-50 p-4 border border-green-200">
          <p className="text-green-800 font-medium text-sm">
            ✓ Email berhasil dikirim!
          </p>
          <p className="text-green-700 text-sm mt-1">
            Silakan cek email Anda untuk link reset password. Link berlaku selama 15 menit.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              {...register("email")}
              disabled={isPending}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            size="lg"
          >
            {isPending ? "Mengirim..." : "Kirim Link Reset"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Ingat password Anda?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Kembali ke login
            </Link>
          </p>
        </form>
      )}
    </AuthPage>
  )
}