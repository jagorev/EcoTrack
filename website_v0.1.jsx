import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AgoraApp() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-xl font-bold">Agorà</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 p-4">
              <Button variant="ghost">Novità</Button>
              <Button variant="ghost">Vicino a te</Button>
              <Button variant="ghost">Profilo</Button>
              <Button variant="destructive">Esci</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Eventi List */}
      <div className="mt-4 flex flex-col gap-4 overflow-y-auto">
        {[1, 2, 3].map((event) => (
          <Card key={event} className="p-4">
            <CardContent>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg" />
                <div>
                  <h2 className="text-lg font-semibold">Evento {event}</h2>
                  <p className="text-gray-600">Descrizione breve...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
