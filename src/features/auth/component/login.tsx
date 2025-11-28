"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLoginMutation } from "../api";
import { sanitizeInput } from "../types";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { mutate, isPending, error } = useLoginMutation();

  // Validasi username
  const validateUsername = (value: string): string => {
    if (!value) return "Username wajib diisi";
    if (value.length < 3) return "Username minimal 3 karakter";
    if (value.length > 30) return "Username maksimal 30 karakter";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return "Username hanya boleh huruf, angka, dan underscore";
    }
    return "";
  };

  // Validasi password
  const validatePassword = (value: string): string => {
    if (!value) return "Password wajib diisi";
    if (value.length < 8) return "Password minimal 8 karakter";
    return "";
  };

  // Handle input change dengan sanitasi
  const handleInputChange = (field: "username" | "password", value: string) => {
    const sanitized = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitized
    }));

    // Validasi real-time
    const error = field === "username" 
      ? validateUsername(sanitized)
      : validatePassword(sanitized);
    
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi semua field
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    // Jika tidak ada error, submit
    if (!usernameError && !passwordError) {
      mutate(formData);
    }
  };

  // Check apakah form valid
  const isFormValid = 
    formData.username.length >= 3 &&
    formData.password.length >= 8 &&
    !errors.username &&
    !errors.password;

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: "url('/image.png')",
      }}
    >
      <Card className="backdrop-blur-md bg-accent/10 rounded-xl shadow-xl overflow-hidden relative max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-[20px]">Login</CardTitle>
          <CardDescription className="text-[12.5px]">
            Login Menggunakan Akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="grid gap-2">
              <Label htmlFor="username" className="text-accent/90">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                className="text-white"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-accent/90">
                  Password
                </Label>
                <a
                  href="/forgot-password"
                  className="text-sm text-accent-200/90 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="text-white"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Error Message dari API */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error.message}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Sign up link */}
            <div className="text-center text-sm text-accent">
              Belum Punya Akun?{" "}
              <a href="/register" className="text-accent/70 underline">
                Daftar
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}