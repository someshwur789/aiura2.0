export function ScanLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scan-line opacity-30" />
      <div
        className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent scan-line opacity-20"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scan-line opacity-25"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
