import type { PropsWithChildren } from "react";

export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-700 uppercase p-3 font-bold text-edef-text">{children}</div>
  )
}
