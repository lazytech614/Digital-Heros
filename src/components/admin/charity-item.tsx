"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import ConfirmationDialog from "../global/confirmation-dialog";

type Charity = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  isFeatured: boolean;
};

interface Props {
  charity: Charity;
  onRefresh: () => void;
}

export default function CharityItem({ charity, onRefresh }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(charity.name);
  const [description, setDescription] = useState(charity.description);
  const [loading, setLoading] = useState(false);

  // Toggle Featured
  const toggleFeatured = async () => {
    await fetch(`/api/charity/${charity.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isFeatured: !charity.isFeatured,
      }),
    });

    toast.success("Charity updated!");
    onRefresh();
  };

  // Delete
  const handleDelete = async () => {
    await fetch(`/api/charity/${charity.id}`, {
      method: "DELETE",
    });

    toast.success("Charity deleted!");
    onRefresh();
  };

  // Save Edit
  const handleSave = async () => {
    setLoading(true);

    await fetch(`/api/charity/${charity.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
      }),
    });

    setEditing(false);
    setLoading(false);
    toast.success("Charity updated!");
    onRefresh();
  };

  return (
    <Card className="border">
      <CardContent className="p-4 space-y-3">
        {/* Image + Info */}
        <div className="flex gap-4">
          {charity.imageUrl && (
            <img
              src={charity.imageUrl}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}

          <div className="flex-1">
            {editing ? (
              <>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2"
                />
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <h3 className="font-semibold">{charity.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {charity.description}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {/* Featured Toggle */}
          <Button
            disabled={loading}
            className="cursor-pointer"
            variant={charity.isFeatured ? "default" : "outline"}
            onClick={toggleFeatured}
          >
            {charity.isFeatured ? "⭐ Featured" : "☆ Feature"}
          </Button>

          {/* Edit */}
          {editing ? (
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          ) : (
            <Button className="cursor-pointer" variant="outline" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}

          {/* Delete */}
          <ConfirmationDialog
            title="Delete Charity"
            description="Are you sure you want to delete this charity? This action cannot be undone."
            onConfirm={handleDelete}
          >
            <Button variant="destructive" disabled={loading}>
              Delete
            </Button>
          </ConfirmationDialog>
        </div>
      </CardContent>
    </Card>
  );
}