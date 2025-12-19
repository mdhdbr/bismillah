
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ArchitectureDiagramProps {
  title: string
  diagram: string
  phase?: string
}

export function ArchitectureDiagram({
  title,
  diagram,
  phase,
}: ArchitectureDiagramProps) {
  return (
    <Card className="border-border bg-background">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          {phase && (
            <span className="text-xs font-mono text-muted-foreground">
              {phase}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[420px] w-full rounded-md border p-4">
          <pre className="text-sm font-mono leading-relaxed whitespace-pre">
            {diagram}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
