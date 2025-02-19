export function Divider() {
  return (
    <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-theme-5 to-transparent opacity-100 dark:via-theme-4" />
  )
}

export function Title({ content }: { content: string}) {
  return (
    <div className="text-2xl text-center font-bold text-theme-2 pb-2">
      {content}
    </div>
  )
}
