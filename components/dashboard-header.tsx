interface DashboardHeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
  }
  
  export function DashboardHeader({
    heading,
    text,
    children,
  }: DashboardHeaderProps) {
    return (
      <div className="flex  justify-between px-2 ">
        <div className="grid gap-1">
          <h1 className=" font-bold text-xl sm:text-3xl md:text-4xl">{heading}</h1>
          {text && <p className="text-sm md:text-lg text-muted-foreground">{text}</p>}
        </div>
        {children}
      </div>
    )
  }