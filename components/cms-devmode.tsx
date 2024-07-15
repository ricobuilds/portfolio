import Link from "next/link"

export const CMSDevMode = () => {

  return (
    <div className="fixed flex items-center h-10 text-white bottom-6 right-6 bg-amethyst-500">
      <Link href="/cms" className="flex items-center gap-2 px-4 py-2">
        <LogoutIcon className="w-5 h-5"/>
        Go to CMS
      </Link>
    </div>
  )
}

function LogoutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}