import ImageWithFallback from "@/components/image-with-fallback"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Enterprise Project Management System - Portfolio",
  description: "An enterprise project management system built with React, TypeScript, and Next.js.",
}

const EnterpriseProjectManagementSystemPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5 text-white">Enterprise Project Management System</h1>
      <p className="mb-5 text-gray-100">
        This project is an enterprise-level project management system designed to streamline workflows, enhance
        collaboration, and improve overall project success rates. Built with a modern technology stack, it offers a
        robust and scalable solution for managing complex projects.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-white">Key Features</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Task Management: Create, assign, and track tasks with ease.</li>
          <li>Team Collaboration: Facilitate seamless communication and collaboration among team members.</li>
          <li>Progress Tracking: Monitor project progress with real-time updates and visual dashboards.</li>
          <li>Resource Allocation: Efficiently allocate resources to optimize project timelines.</li>
          <li>
            Reporting & Analytics: Generate comprehensive reports and gain valuable insights into project performance.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-white">Technology Stack</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Frontend: React, TypeScript, Next.js, Tailwind CSS</li>
          <li>Backend: Node.js, Express.js, PostgreSQL</li>
          <li>Deployment: Vercel, Docker</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-white">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ImageWithFallback
            src="/images/epms/dashboard.png"
            fallbackSrc="/images/image-placeholder.png"
            alt="Dashboard Screenshot"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
          <ImageWithFallback
            src="/images/epms/task-management.png"
            fallbackSrc="/images/image-placeholder.png"
            alt="Task Management Screenshot"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
          <ImageWithFallback
            src="/images/epms/reporting.png"
            fallbackSrc="/images/image-placeholder.png"
            alt="Reporting Screenshot"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-white">Lessons Learned & Future Improvements</h2>
        <p className="mb-5 text-gray-100">
          Throughout the development of this project, I gained valuable experience in building scalable and maintainable
          enterprise applications. Key lessons learned include the importance of proper architecture, effective
          communication within a team, and the significance of automated testing.
        </p>
        <p className="text-gray-100">
          Future improvements for this project include implementing more robust user authentication, integrating with
          third-party services, and enhancing the reporting and analytics capabilities.
        </p>
      </section>
    </div>
  )
}

export default EnterpriseProjectManagementSystemPage
