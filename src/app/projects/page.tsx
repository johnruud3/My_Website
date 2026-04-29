"use client";

import { useState } from "react";
import Footer from "../components/Footer";

interface Project {
  id: number;
  title: string;
  description: string;
  status: ("Planning" | "In Development" | "Beta" | "Coming Soon")[]; // Array of statuses
  technologies: string[];
  image?: string;
  imageObjectFit?: "cover" | "contain"; // Control how image fits
  expectedLaunch?: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Elite Roleplay",
      description:
        "Elite Roleplay is a roleplay server for the game Grand Theft Auto 5. It is a server that allows players to roleplay in the game. It is a server where the ingame world is made out to be Oslo in Norway. Hardcore roleplay in norwegian and everything is immersed down to the street signs and names on the street signs. Even the buildings have the real original names on them. This is an ambitious project. And we have a strong team of developers and designers working on it.",
      status: ["Coming Soon", "In Development"],
      technologies: ["Lua", "MySQL", "FiveM"],
      image: "/img/eliterollespill.png",
      imageObjectFit: "cover",
      expectedLaunch: "Q3 2026",
    },
    {
      id: 2,
      title: "MatBoksen App",
      description:
        "Matboksen is a app used for tracking food and having a healthier/easier life with the help of an AI assistant.",
      status: ["In Development"],
      technologies: ["Next.js", "TailwindCSS", "Supabase"],
      image: "/img/matboksen2.png",
      imageObjectFit: "contain",
      expectedLaunch: "2027",
    },
    {
      id: 3,
      title: "NordMind",
      description:
        "NordMind is a web application designed to simplify how users manage emails, schedules, and team communication.",
      status: ["In Development"],
      technologies: ["Next.js", "TailwindCSS", "Supabase"],
      image: "/img/nordmind2.png",
      imageObjectFit: "contain",
      expectedLaunch: "2027",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const statuses = ["All", "Planning", "In Development", "Beta", "Coming Soon"];

  const filteredProjects =
    selectedStatus === "All"
      ? projects
      : projects.filter((p) => p.status.includes(selectedStatus as any));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "In Development":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Beta":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Coming Soon":
        return "bg-teal-500/20 text-teal-300 border-teal-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full py-4 md:py-6 px-4 md:px-8 bg-gradient-to-r from-[#050b16]/95 via-[#146C82]/95 to-[#050b16]/95 backdrop-blur-sm border-b border-[#34C1E3]/20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex md:relative flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
            <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 items-center gap-3">
              <img
                src="/img/portrett1.jpg"
                alt="John"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#34C1E3] shadow-lg"
              />
              <span className="text-white text-xs md:text-sm font-medium">
                John-Kristian G. Ruud
              </span>
            </div>

            <nav className="flex justify-center gap-6 md:gap-12">
              <a
                href="/"
                className="text-[#34C1E3] text-xs md:text-sm font-medium hover:text-[#146C82] transition-colors"
              >
                Home
              </a>
              <a
                href="/projects"
                className="text-white text-xs md:text-sm font-medium hover:text-[#34C1E3] transition-colors"
              >
                New projects
              </a>
              <a
                href="/contact"
                className="text-[#34C1E3] text-xs md:text-sm font-medium hover:text-[#146C82] transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-main font-sans pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              New <span className="text-[#34C1E3]">Projects</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Exciting projects currently in development. Stay tuned for
              updates!
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-[#34C1E3] text-[#050b16]"
                    : "bg-[#146C82]/20 text-gray-300 hover:bg-[#146C82]/40"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-[#146C82]/10 to-[#050b16]/50 backdrop-blur-sm border border-[#34C1E3]/20 rounded-xl p-6 hover:border-[#34C1E3]/50 transition-all hover:transform hover:scale-105 duration-300"
              >
                {/* Project Image */}
                <div className="w-full h-48 bg-[#146C82]/20 rounded-lg mb-4 flex items-center justify-center border border-[#34C1E3]/10 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full"
                      style={{ objectFit: project.imageObjectFit || "contain" }}
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-[#34C1E3]/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>

                {/* Status Badges - Multiple */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.status.map((stat, idx) => (
                    <span
                      key={idx}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(stat)}`}
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#34C1E3]/10 text-[#34C1E3] text-xs rounded border border-[#34C1E3]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Expected Launch */}
                {project.expectedLaunch && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Expected: {project.expectedLaunch}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No projects found with status "{selectedStatus}"
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-[#146C82]/20 to-[#050b16]/50 backdrop-blur-sm border border-[#34C1E3]/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Have an idea?
              </h2>
              <p className="text-gray-400 mb-6 max-w-md">
                I'm always open to collaborating on exciting projects. Let's
                build something amazing together!
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-[#34C1E3] text-[#050b16] font-medium rounded-lg hover:bg-[#146C82] hover:text-white transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
