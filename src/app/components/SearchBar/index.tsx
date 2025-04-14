import { Search } from "lucide-react";
import { localize } from "@/lib/localization";

type SearchBarProps = {
  onChange: (searchValue: string) => void;
};

export function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div className="flex row items-center p-1 border border-foreground rounded-md">
      <Search />
      <input
        className="bg-transparent text-base p-1 w-full text-foreground ml-1 outline-none"
        type="text"
        placeholder={localize("searchPlaceHolder")}
        onChange={(e) => {
          const searchTerm = e.currentTarget.value;
          debounce(() => {
            onChange(searchTerm);
          });
        }}
      />
    </div>
  );
}

let timeoutId: NodeJS.Timeout;
const debounce = (func: () => void) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    func();
  }, 200);
};
