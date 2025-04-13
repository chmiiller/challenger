type IconLabelProps = {
  children: any;
  label: string;
};

export default function IconLabel({ children, label }: IconLabelProps) {
  return (
    <div className="flex flex-row items-center">
      {children}
      <h3 className="text-base text-center ml-3">{label}</h3>
    </div>
  );
}
