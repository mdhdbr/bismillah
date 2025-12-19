
import { ArchitectureTabs } from "@/components/architecture/ArchitectureTabs"
import { PageHeader } from "@/components/page-header"

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        title="Master Architecture Diagrams"
        description="Text-based, layered architecture diagrams designed for engineering reviews, regulatory audits, safety certification, and executive clarity."
       />
      <ArchitectureTabs />
    </>
  )
}
