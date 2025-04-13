type ButtonProps = {
  children: any;
  onClick: () => void;
};

export default function IconButton({ children, onClick }: ButtonProps) {
  return (
    <div
      className="px-2 cursor-pointer"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </div>
  );
}
