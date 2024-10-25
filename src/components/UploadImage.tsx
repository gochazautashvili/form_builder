import { Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "./LoadingButton";
import { useRef, useState } from "react";
import Image from "next/image";
import DeleteImageButton from "./DeleteImageButton";
import { resizeFile } from "@/lib/utils";

interface UploadImageProps {
  onUpload: (e: string) => void;
  background: string;
}

const UploadImage = ({ onUpload, background }: UploadImageProps) => {
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const { isUploading, startUpload } = useUploadThing("list_background", {
    onClientUploadComplete(res) {
      toast({ description: "List background successfully uploaded" });
      onUpload(res[0].url);
    },
    onUploadError(e) {
      toast({ variant: "destructive", description: e.message });
    },
    onUploadBegin() {
      setProgress(1);
    },
    onUploadProgress(p) {
      setProgress(p);
    },
  });

  const handelUpload = () => {
    fileRef.current?.click();
  };

  const handelChange = async (file: File | undefined) => {
    if (!file) return;
    
    resizeFile(file).then((res) => {
      const files = res as File;

      startUpload([files]);
    });
  };

  if (background) {
    return (
      <div className="relative">
        <DeleteImageButton image={background} onDelete={onUpload} />
        <Image
          priority
          width={600}
          height={400}
          loading="eager"
          src={background}
          alt="uploaded image"
          className="h-[160px] w-full rounded-lg border border-gray-400 bg-gray-400 object-cover shadow-xl"
        />
      </div>
    );
  }

  return (
    <>
      <LoadingButton
        type="button"
        variant="outline"
        className="w-full"
        onClick={handelUpload}
        isLoading={isUploading}
      >
        {progress ? (
          <span>{progress}%</span>
        ) : (
          <>
            <Upload className="mr-3 size-4" /> Upload Image
          </>
        )}
      </LoadingButton>
      <input
        type="file"
        ref={fileRef}
        title="upload"
        accept="image/*"
        className="hidden"
        onChange={(e) => handelChange(e.target.files?.[0])}
      />
    </>
  );
};

export default UploadImage;
