
"use client";

import { DataNav } from "@/data/dataNav";
import { WebSettings } from "@/features/settings/types";
import {
  ArrowRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  Youtube
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


function SocialButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group relative p-2.5 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary hover:border-primary transition-all duration-300"
    >
      <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
      <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </Link>
  );
}

function ContactItem({
  icon: Icon,
  children,
  href,
}: {
  icon: any;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-start space-x-3 group cursor-pointer">
      <div className="p-2 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-4" />
      </div>
      <div className="flex-1 text-md text-muted-foreground  group-hover:text-foreground transition-colors">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

function QuickLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200"
      >
        <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          {children}
        </span>
      </Link>
    </li>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Berhasil! Kami akan kirim promo terbaru ke email kamu");
    setEmail("");
    setIsSubmitting(false);

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-foreground">
        Dapatkan Promo Terbaru
      </h4>
      <p className="text-sm text-muted-foreground">
        Subscribe untuk mendapatkan notifikasi promo, diskon, dan event menarik
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email kamu"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send
              className={`h-4 w-4 ${isSubmitting ? "animate-pulse" : ""}`}
            />
          </button>
        </div>
        {message && (
          <p className="text-xs text-primary font-medium animate-in fade-in slide-in-from-top-1 duration-300">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}



export function Footer({ data }: { data: WebSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-card border-t border-border">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-4 group">
                <Image
                  src={data.logo_url || "/placeholder.svg"}
                  alt={data.website_name || "Logo"}
                  width={140}
                  height={48}
                  className="h-12 w-auto group-hover:scale-105 transition-transform"
                />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.website_description ||
                  "Platform top up game terpercaya dengan harga terbaik dan proses tercepat"}
              </p>
            </div>



            {/* Social Media Links */}
            {data.show_social_links && (
              <div>
                <h5 className="text-sm font-semibold text-foreground mb-3">
                  Ikuti Kami
                </h5>
                <div className="flex flex-wrap gap-2">
                  {data.url_facebook && (
                    <SocialButton
                      href={data.url_facebook}
                      icon={Facebook}
                      label="Facebook"
                    />
                  )}
                  {data.url_twitter && (
                    <SocialButton
                      href={data.url_twitter}
                      icon={Twitter}
                      label="Twitter"
                    />
                  )}
                  {data.url_instagram && (
                    <SocialButton
                      href={data.url_instagram}
                      icon={Instagram}
                      label="Instagram"
                    />
                  )}
                  {data.url_youtube && (
                    <SocialButton
                      href={data.url_youtube}
                      icon={Youtube}
                      label="YouTube"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Menu Utama
            </h4>
            <ul className="space-y-2.5">
              {DataNav.map((link) => (
                <QuickLink key={link.name} href={link.link}>
                  {link.name}
                </QuickLink>
              ))}
            </ul>
          </div>

          {/* Popular Games - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Game Populer
            </h4>
            <ul className="space-y-2.5">
              {[
                "Mobile Legends",
                "Free Fire",
                "Genshin Impact",
                "Honkai Star Rail",
              ].map((game) => (
                <QuickLink
                  key={game}
                  href={`/order/${game.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {game}
                </QuickLink>
              ))}
            </ul>
          </div>

          {/* Contact Info or Newsletter - Takes 4 columns */}
          <div className="lg:col-span-4">
            {data.show_contact_info ? (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">
                  Hubungi Kami
                </h4>
                <div className="space-y-3">
                  {data.business_address && (
                    <ContactItem icon={MapPin}>
                      {data.business_address}
                    </ContactItem>
                  )}

                  {data.business_phone && (
                    <ContactItem
                      icon={Phone}
                      href={`tel:${data.business_phone}`}
                    >
                      {data.business_phone}
                    </ContactItem>
                  )}

                  {data.business_email && (
                    <ContactItem
                      icon={Mail}
                      href={`mailto:${data.business_email}`}
                    >
                      {data.business_email}
                    </ContactItem>
                  )}

                  {data.business_hours && (
                    <ContactItem icon={Clock}>
                      {data.business_hours}
                    </ContactItem>
                  )}

                  {data.whatsapp_number && (
                    <ContactItem
                      icon={MessageCircle}
                      href={`https://wa.me/${data.whatsapp_number.replace(
                        /[^0-9]/g,
                        ""
                      )}${
                        data.whatsapp_message
                          ? `?text=${encodeURIComponent(data.whatsapp_message)}`
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>WhatsApp: {data.whatsapp_number}</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                          Online
                        </span>
                      </div>
                    </ContactItem>
                  )}
                </div>
              </div>
            ) : (
              <Newsletter />
            )}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              {data.copyright_text ||
                `© ${currentYear} ${
                  data.website_name || "MyBrand"
                }. All rights reserved.`}
            </p>

            {data.footer_text && (
              <p className="text-muted-foreground text-sm text-center sm:text-right">
                {data.footer_text}
              </p>
            )}

            {!data.footer_text && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Kebijakan Privasi
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
