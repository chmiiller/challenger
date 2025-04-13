type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="w-full ml-4 mr-5 rounded-md h-14 bg-primary font-bold text-2xl text-white mt-9"
      onClick={() => {
        onClick();
      }}
    >
      {label}
    </button>
  );
}
