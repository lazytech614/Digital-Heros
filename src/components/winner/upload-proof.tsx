"use client";

import { UploadButton } from "@/lib/uploadthing-client";

export default function ProofUpload({ winnerId }: { winnerId: string }) {
  return (
    <UploadButton
        endpoint="proofUploader"
        onUploadBegin={() => console.log("Uploading...")}
        onClientUploadComplete={(res) => {
            alert("Uploaded successfully!");
        }}
        onUploadError={(error) => {
            alert("Upload failed");
        }}
    />
  );
}