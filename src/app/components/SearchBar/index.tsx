import { Search } from "lucide-react";

type SearchBarProps = {
  onChange: (searchValue: string) => void;
};

export function SearchBar({ onChange }: SearchBarProps) {
  return (
    <view className="flex row items-center p-1 border border-foreground rounded-md">
      <Search />
      <input
        className="bg-transparent text-base p-1 w-full text-foreground ml-1 outline-none"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          const searchTerm = e.currentTarget.value;
          debounce(() => {
            onChange(searchTerm);
          });
        }}
      />
    </view>
  );
}

let timeoutId: NodeJS.Timeout;
const debounce = (func: () => void) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    func();
  }, 200);
};
