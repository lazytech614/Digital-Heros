"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

export default function AddCharityForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name || !description) {
      toast.error("Name and description are required");
      return;
    }

    setLoading(true);

    await fetch("/api/charity", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        imageUrl,
      }),
    });

    setName("");
    setDescription("");
    setImageUrl("");
    setLoading(false);

    toast.success("Charity added!");
    onSuccess(); 
  };

  return (
    <Card className="mb-6 border shadow-sm">
      <CardContent className="space-y-4 p-4">
        <h2 className="text-lg font-semibold">➕ Add Charity</h2>

        <Input
          placeholder="Charity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        <Input
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button onClick={submit} disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Charity"}
        </Button>
      </CardContent>
    </Card>
  );
}