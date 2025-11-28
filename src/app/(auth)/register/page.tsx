
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRegisterMutation } from "@/features/auth/api";
import { RegisterFormData } from "@/features/auth/types";


const countryCodes = [
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+62",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const { mutate, isPending, error } = useRegisterMutation();

  // Validasi Username
  const validateUsername = (value: string): string => {
    if (!value) return "Username wajib diisi";
    if (value.length < 3) return "Username minimal 3 karakter";
    if (value.length > 30) return "Username maksimal 30 karakter";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return "Username hanya boleh huruf, angka, dan underscore";
    }
    return "";
  };

  // Validasi Email
  const validateEmail = (value: string): string => {
    if (!value) return "Email wajib diisi";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Format email tidak valid";
    }
    return "";
  };

  // Validasi Password
  const validatePassword = (value: string): string => {
    if (!value) return "Password wajib diisi";
    if (value.length < 8) return "Password minimal 8 karakter";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password harus mengandung huruf besar, huruf kecil, dan angka";
    }
    return "";
  };

  // Validasi Confirm Password
  const validateConfirmPassword = (value: string): string => {
    if (!value) return "Konfirmasi password wajib diisi";
    if (value !== formData.password) return "Password tidak cocok";
    return "";
  };

  // Validasi Phone Number
  const validatePhoneNumber = (value: string): string => {
    if (!value) return "Nomor telepon wajib diisi";
    if (!/^[0-9]{9,13}$/.test(value)) {
      return "Nomor telepon tidak valid (9-13 digit)";
    }
    return "";
  };

  // Handle input change
  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validasi real-time
    let error = "";
    switch (field) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        // Re-validate confirm password jika password berubah
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: value !== formData.confirmPassword ? "Password tidak cocok" : ""
          }));
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      case "phoneNumber":
        error = validatePhoneNumber(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi semua field
    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
      phoneNumber: validatePhoneNumber(formData.phoneNumber),
    };

    setErrors(newErrors);

    // Check apakah ada error
    const hasErrors = Object.values(newErrors).some(error => error !== "");

    if (!hasErrors) {
      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

      const registerData: RegisterFormData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: fullPhoneNumber,
      };

      mutate(registerData);
    }
  };

  // Check apakah form valid
  const isFormValid =
    formData.username.length >= 3 &&
    formData.email.includes("@") &&
    formData.password.length >= 8 &&
    formData.confirmPassword === formData.password &&
    formData.phoneNumber.length >= 9 &&
    !Object.values(errors).some(error => error !== "");

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: "url('/image.png')",
      }}
    >
      <Card className="backdrop-blur-md bg-accent/10 rounded-xl shadow-xl overflow-hidden relative max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-[20px]">Daftar</CardTitle>
          <CardDescription className="text-[12.5px]">
            Buat Akun Baru Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Nomor Telepon</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, countryCode: value }))
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="8123456789"
                  className="flex-1"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Masukkan nomor tanpa kode negara
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            {/* API Error Message */}
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error.message}
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={!isFormValid || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mendaftar...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Masuk di sini
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}