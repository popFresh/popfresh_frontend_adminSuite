import {
  ImagePlus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";

const ImageUploader = ({
  images = [],
  onChange,
}) => {

  const handleImageSelect = (e) => {

    const files = Array.from(e.target.files);

    if (!files.length) return;

    onChange([...images, ...files]);

  };

  const handleRemove = (index) => {

    const updatedImages = images.filter(
      (_, i) => i !== index
    );

    onChange(updatedImages);

  };

  const moveImageUp = (index) => {

  if (index === 0) return;

  const updated = [...images];

  [updated[index - 1], updated[index]] = [
    updated[index],
    updated[index - 1],
  ];

  onChange(updated);

};

const moveImageDown = (index) => {

  if (index === images.length - 1) return;

  const updated = [...images];

  [updated[index], updated[index + 1]] = [
    updated[index + 1],
    updated[index],
  ];

  onChange(updated);

};

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">

      {/* Image Preview */}

      {images.length > 0 && (

        <div className="mb-6 grid grid-cols-2 gap-4">

          {images.map((image, index) => {

            const imageSrc =
              image instanceof File
                ? URL.createObjectURL(image)
                : image.imageUrl || image;

            return (

              <div
  key={index}
  className="relative overflow-hidden rounded-xl border bg-white"
>

                <img
                  src={imageSrc}
                  alt={`Preview ${index + 1}`}
                  className="h-48 w-full object-cover"
                />

                {/* Cover Image Badge */}

{index === 0 && (
  <div
    className="
      absolute
      left-2
      top-2
      flex
      items-center
      gap-1
      rounded-full
      bg-orange-500
      px-2
      py-1
      text-xs
      font-semibold
      text-white
    "
  >
    <Star size={12} fill="white" />
    Cover
  </div>
)}
    <div
  className="
    absolute
    bottom-2
    left-2
    right-2
    flex
    justify-center
    gap-2
  "
>

  <button
    type="button"
    disabled={index === 0}
    onClick={() => moveImageUp(index)}
    className="
      rounded-full
      bg-white
      p-2
      shadow
      disabled:opacity-40
    "
  >
    <ChevronUp size={16} />
  </button>

  <button
    type="button"
    disabled={index === images.length - 1}
    onClick={() => moveImageDown(index)}
    className="
      rounded-full
      bg-white
      p-2
      shadow
      disabled:opacity-40
    "
  >
    <ChevronDown size={16} />
  </button>

  <button
    type="button"
    onClick={() => handleRemove(index)}
    className="
      rounded-full
      bg-white
      p-2
      shadow
      hover:bg-red-50
    "
  >
    <Trash2
      size={16}
      className="text-red-600"
    />
  </button>

</div>

              </div>

            );

          })}

        </div>

      )}

      {/* Upload Area */}

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">

          <ImagePlus
            size={34}
            className="text-orange-500"
          />

        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">

          Upload Product Images

        </h3>

        <p className="mt-2 text-sm text-slate-500">

          JPG, PNG, WEBP • Max 5 Images

        </p>

        <input
          id="product-image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />

        <label
          htmlFor="product-image-upload"
          className="
          mt-6
          inline-flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          bg-orange-500
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-orange-600
          "
        >

          <ImagePlus size={18} />

          Choose Images

        </label>

      </div>

    </div>
  );
};

export default ImageUploader;