export const Footer = () => {

  const title = `
  If you think I'd be a good fit for your next project, please send me an email.
  I’m currently available for consulting/contract work.`
  return (
    <footer className="w-full px-4">
      <div className="mx-auto max-w-screen-md">
        <div className="py-16 gap-8 flex flex-col">
          <h3 className="w-[480px]">{title}</h3>
          <div className="w-fit py-2 px-4 rounded-full bg-slate-200">hola@enrictrillo.com</div>
        </div>
        <div id="copy" className="py-8 border-t">&copy; {new Date().getFullYear()} Enric Trillo. All rights reserved.</div>
      </div>
    </footer>
  )
}