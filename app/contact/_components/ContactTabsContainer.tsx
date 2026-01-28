"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Mail, Phone, Zap } from "lucide-react"
import EmailFormTab from "./EmailFormTab"
import ChatTab from "./ChatTab"
import PhoneTab from "./PhoneTab"
import DirectContactTab from "./DirectContactTab"

type TabType = "email" | "chat" | "phone" | "contact"

export default function ContactTabsContainer() {
  const [activeTab, setActiveTab] = useState<TabType>("email")

  const tabs: { id: TabType; label: string; icon: React.ReactNode; description: string }[] = [
    {
      id: "email",
      label: "Email Form",
      icon: <Mail className="w-4 h-4" />,
      description: "Detailed inquiry form for comprehensive questions",
    },
    {
      id: "chat",
      label: "Live Chat",
      icon: <MessageCircle className="w-4 h-4" />,
      description: "Get instant answers from our AI assistant",
    },
    {
      id: "phone",
      label: "Phone",
      icon: <Phone className="w-4 h-4" />,
      description: "Call us directly during business hours",
    },
    {
      id: "contact",
      label: "Quick Contact",
      icon: <Zap className="w-4 h-4" />,
      description: "Fast access to contact information",
    },
  ]

  return (
    <div>
      {/* Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left group ${
              activeTab === tab.id
                ? "border-primary-500 bg-primary-500/10 shadow-lg shadow-primary-500/20"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
            }`}
          >
            <div
              className={`flex items-center gap-2 mb-2 ${activeTab === tab.id ? "text-primary-400" : "text-gray-400 group-hover:text-gray-300"}`}
            >
              {tab.icon}
              <span className="font-semibold text-sm">{tab.label}</span>
            </div>
            <p className={`text-xs ${activeTab === tab.id ? "text-gray-100" : "text-gray-500"}`}>{tab.description}</p>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 backdrop-blur-sm">
        {activeTab === "email" && <EmailFormTab />}
        {activeTab === "chat" && <ChatTab />}
        {activeTab === "phone" && <PhoneTab />}
        {activeTab === "contact" && <DirectContactTab />}
      </div>
    </div>
  )
}
