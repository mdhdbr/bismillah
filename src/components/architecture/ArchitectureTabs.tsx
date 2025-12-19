
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArchitectureDiagram } from "./ArchitectureDiagram"

export function ArchitectureTabs() {
  return (
    <Tabs defaultValue="global" className="w-full">
      <TabsList className="grid grid-cols-3 lg:grid-cols-6">
        <TabsTrigger value="global">Global</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="ai">AI</TabsTrigger>
        <TabsTrigger value="failover">Failover</TabsTrigger>
        <TabsTrigger value="governance">Governance</TabsTrigger>
      </TabsList>

      <TabsContent value="global">
        <ArchitectureDiagram
          title="Global System Architecture"
          phase="Phases 1–15"
          diagram={`┌──────────────────────────────────────────────────────────────┐
│                        HUMAN LAYER                            │
│  Executives | Operators | Dispatchers | Regulators | Auditors │
└───────────────┬──────────────────────────────────────────────┘
                |
                v
┌──────────────────────────────────────────────────────────────┐
│                    EXPERIENCE LAYER (P1–P4)                  │
│  Admin | Dispatcher | Driver | Passenger | AV | Analytics    │
└───────────────┬──────────────────────────────────────────────┘
                |
                v
┌──────────────────────────────────────────────────────────────┐
│                ACCESS & SECURITY LAYER (P6)                   │
│  API Gateway | OAuth | JWT | mTLS | RBAC | Audit              │
└───────────────┬──────────────────────────────────────────────┘
                |
                v
┌──────────────────────────────────────────────────────────────┐
│               CORE PLATFORM SERVICES (P5–P10)                 │
│  Trip | Vehicle | Driver | Routing | Notifications | AI      │
└───────────────┬──────────────────────────────────────────────┘
                |
                v
┌──────────────────────────────────────────────────────────────┐
│        EDGE & VEHICLE INTELLIGENCE (P13–P14)                  │
│  Edge Agent | Inference | Safety | OTA | V2V                  │
└───────────────┬──────────────────────────────────────────────┘
                |
                v
┌──────────────────────────────────────────────────────────────┐
│                    PHYSICAL VEHICLE                           │
└──────────────────────────────────────────────────────────────┘`}
        />
      </TabsContent>

      <TabsContent value="data">
        <ArchitectureDiagram
          title="Data Architecture"
          phase="Streaming + Offline"
          diagram={`Sensors
   |
   v
Edge Agent ── Offline ──▶ SQLite Buffer
   |
   v
Regional Control Plane
   |
   v
Global Fleet Orchestrator
   |
   v
Data Lake ──▶ Analytics & AI`}
        />
      </TabsContent>

      <TabsContent value="security">
        <ArchitectureDiagram
          title="Zero Trust Security Architecture"
          phase="Always Verify"
          diagram={`Vehicle Certificate
        |
        v
mTLS Authentication
        |
        v
Short-Lived JWT
        |
        v
Policy Gate (RBAC / ABAC / GEO)
        |
        v
Authorized Service Call`}
        />
      </TabsContent>

      <TabsContent value="ai">
        <ArchitectureDiagram
          title="AI & Decision Separation"
          phase="Training ≠ Control"
          diagram={`Historical Data
        |
        v
Cloud Training Pipelines
        |
        v
Approved Models Registry
        |
        v
Edge Inference Only
        |
        v
Safety Controller
        |
        v
Physical Action`}
        />
      </TabsContent>

      <TabsContent value="failover">
        <ArchitectureDiagram
          title="Failover & Resilience"
          phase="No Oscillation"
          diagram={`Region A ─┐
          ├─▶ Health Monitor ─▶ Failover Manager ─▶ Region B
Region C ─┘

• Cooldown enforced
• Audit logged
• SLA preserved`}
        />
      </TabsContent>

      <TabsContent value="governance">
        <ArchitectureDiagram
          title="Phase-15 Governance & Control"
          phase="Human-in-the-Loop"
          diagram={`AI Recommendation
        |
        v
Simulation / Shadow Mode
        |
        v
Human Approval
        |
        v
Policy Enforcement
        |
        v
Auditable Rollout`}
        />
      </TabsContent>
    </Tabs>
  )
}
