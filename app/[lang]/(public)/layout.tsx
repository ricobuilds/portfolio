import "../../globals.css"

import { Fragment, Suspense } from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback="...">
      <Fragment>
        {children}
      </Fragment>
    </Suspense>
  );
}
