const tagStyles = {
  "BEST SELLER": {
    bg: "bg-orange-100",
    text: "text-orange-700",
  },

  "NEW LAUNCH": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },

  "COMBO PACK": {
    bg: "bg-violet-100",
    text: "text-violet-700",
  },

  "COMING SOON": {
    bg: "bg-red-100",
    text: "text-red-700",
  },

  POPULAR: {
    bg: "bg-sky-100",
    text: "text-sky-700",
  },

  SPICY: {
    bg: "bg-rose-100",
    text: "text-rose-700",
  },
};

const ProductTag = ({ tag }) => {
  const style = tagStyles[tag] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-[11px]
        font-semibold
        tracking-wide
        ${style.bg}
        ${style.text}
      `}
    >
      {tag}
    </span>
  );
};

export default ProductTag;