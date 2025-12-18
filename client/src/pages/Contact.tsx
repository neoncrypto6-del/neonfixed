import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 neon-text-primary">GET IN TOUCH</h1>
            <p className="text-muted-foreground">24/7 Support for all your crypto inquiries</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <GlassCard className="h-full">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="John" className="bg-black/20 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Doe" className="bg-black/20 border-white/10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-black/20 border-white/10" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="How can we help you?" className="bg-black/20 border-white/10 min-h-[150px]" />
                  </div>

                  <Button className="w-full bg-primary text-background font-bold">SEND MESSAGE</Button>
                </form>
              </GlassCard>
            </div>

            <div className="space-y-6">
              <GlassCard className="flex items-start gap-4 p-6">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:support@neoncrypto.com" className="text-primary hover:underline">support@neoncrypto.com</a>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="text-muted-foreground text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                  <a href="#" className="text-secondary hover:underline">Start a chat</a>
                </div>
              </GlassCard>

              <GlassCard className="flex items-start gap-4 p-6">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office</h3>
                  <p className="text-muted-foreground text-sm mb-2">Come say hello at our office HQ.</p>
                  <p className="text-white">100 Crypto Valley, Digital City, Metaverse</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}