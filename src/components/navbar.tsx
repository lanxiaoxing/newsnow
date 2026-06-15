import { fixedColumnIds, metadata } from "@shared/metadata"
import { Link } from "@tanstack/react-router"
import { currentColumnIDAtom } from "~/atoms"

export function NavBar() {
  const currentId = useAtomValue(currentColumnIDAtom)
  const { toggle } = useSearchBar()
  return (
    <span className={$([
      "flex p-3 rounded-2xl bg-primary/1 text-sm",
      "shadow shadow-primary/20 hover:shadow-primary/50 transition-shadow-500",
    ])}
    >
      <button
        type="button"
        onClick={() => toggle(true)}
        className={$(
          "px-3 py-1 rounded-md transition-all duration-200",
          "hover:bg-primary/15 active:bg-primary/25",
          "op-70 dark:op-90 hover:op-100",
        )}
      >
        更多
      </button>
      {fixedColumnIds.map(columnId => (
        <Link
          key={columnId}
          to="/c/$column"
          params={{ column: columnId }}
          className={$(
            "px-3 py-1 rounded-md transition-all duration-200",
            "hover:bg-primary/10 active:bg-primary/20",
            currentId === columnId
              ? "bg-primary/15 color-primary font-bold shadow-sm"
              : "op-70 dark:op-90 hover:op-100",
          )}
        >
          {metadata[columnId].name}
        </Link>
      ))}
    </span>
  )
}
