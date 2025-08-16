"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { translations, type Translation } from "../translation"
import {
  fetchParentsFeedbacks,
  fetchMonthlyImpactReport,
  fetchUpcomingEvents,
  fetchRecentAchievements,
  fetchEducationalArticles,
  fetchDownloadableResources,
  fetchFAQs,
  submitAppointment,
  type ParentFeedback,
  type MonthlyImpactReport,
  type UpcomingEvent,
  type RecentAchievement,
  type EducationalArticle,
  type DownloadableResource,
  type FAQ,
} from "../services/api"
import ArticleModal from "./ArticleModal"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Users,
  Award,
  Target,
  CheckCircle,
  Calendar,
  Download,
  Menu,
  X,
  Star,
  ArrowRight,
  Baby,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Globe,
  Eye,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Info,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import RHLogo from "../assets/RCLogo.png"

function SpeachTerapyOnePageApp() {
  const [language, setLanguage] = useState<"en" | "am">("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)

  // API data states
  const [parentFeedbacks, setParentFeedbacks] = useState<ParentFeedback[]>([])
  const [monthlyReport, setMonthlyReport] = useState<MonthlyImpactReport | null>(null)
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])
  const [recentAchievements, setRecentAchievements] = useState<RecentAchievement[]>([])
  const [educationalArticles, setEducationalArticles] = useState<EducationalArticle[]>([])
  const [downloadableResources, setDownloadableResources] = useState<DownloadableResource[]>([])
  const [faqs, setFAQs] = useState<FAQ[]>([])

  // Achievement navigation state
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<string | null>(null)

  // New state for collapsible sections in Resources dropdown
  const [expandedResourceSections, setExpandedResourceSections] = useState<{
    parentGuides: boolean
    therapyTips: boolean
  }>({
    parentGuides: false,
    therapyTips: false,
  })

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    preferredDate: "",
    preferredTime: "",
    contactNumber: "",
    email: "",
    notes: "",
  })

  const t: Translation = translations[language]

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [feedbacks, report, events, achievements, articles, resources, faqData] = await Promise.all([
          fetchParentsFeedbacks(),
          fetchMonthlyImpactReport(),
          fetchUpcomingEvents(),
          fetchRecentAchievements(),
          fetchEducationalArticles(),
          fetchDownloadableResources(),
          fetchFAQs(),
        ])

        setParentFeedbacks(feedbacks)
        setMonthlyReport(report)
        setUpcomingEvents(events)
        setRecentAchievements(achievements)
        setEducationalArticles(articles)
        setDownloadableResources(resources)
        setFAQs(faqData)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitForm = async () => {
      setIsSubmitting(true)
      try {
        const appointmentData = {
          parentName: formData.parentName,
          childsName: formData.childName,
          childsAge: formData.childAge,
          preferedDate: formData.preferredDate,
          preferedTime: formData.preferredTime,
          contactNumber: formData.contactNumber,
          email: formData.email,
          additionalNotes: formData.notes,
        }

        const success = await submitAppointment(appointmentData)

        if (success) {
          await Swal.fire({
            title: "Success!",
            text: t.thankYouMessage,
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#51a1ed",
          })
          // Reset form
          setFormData({
            parentName: "",
            childName: "",
            childAge: "",
            preferredDate: "",
            preferredTime: "",
            contactNumber: "",
            email: "",
            notes: "",
          })
        } else {
          await Swal.fire({
            title: "Error!",
            text: "Failed to submit appointment. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#51a1ed",
          })
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        await Swal.fire({
          title: "Error!",
          text: "An error occurred. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#51a1ed",
        })
      } finally {
        setIsSubmitting(false)
      }
    }

    submitForm()
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const openArticleModal = (article: EducationalArticle) => {
    setSelectedArticle(article)
    setIsArticleModalOpen(true)
  }

  const closeArticleModal = () => {
    setSelectedArticle(null)
    setIsArticleModalOpen(false)
  }

  const nextAchievement = () => {
    if (currentAchievementIndex < recentAchievements.length - 1) {
      setCurrentAchievementIndex(currentAchievementIndex + 1)
    }
  }

  const prevAchievement = () => {
    if (currentAchievementIndex > 0) {
      setCurrentAchievementIndex(currentAchievementIndex - 1)
    }
  }

  const handlePreviewResource = (resource: DownloadableResource) => {
    const baseUrl = "https://strapi.hielav.com"
    const fullUrl = `${baseUrl}${resource.resourceFile.url}`
    window.open(fullUrl, "_blank")
  }

  const handleDownloadResource = async (resource: DownloadableResource) => {
    const result = await Swal.fire({
      title: "Download Resource",
      text: `Do you want to download "${resource.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Download",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#51a1ed",
      cancelButtonColor: "#6b7280",
    })

    if (result.isConfirmed) {
      const baseUrl = "https://strapi.hielav.com"
      const fullUrl = `${baseUrl}${resource.resourceFile.url}`
      const link = document.createElement("a")
      link.href = fullUrl
      link.download = resource.resourceFile.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      await Swal.fire({
        title: "Download Started!",
        text: "Your file download has begun.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })
    }
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const toggleMobileDropdown = (dropdown: string) => {
    setIsMobileDropdownOpen(isMobileDropdownOpen === dropdown ? null : dropdown)
  }

  // New function to toggle resource sections
  const toggleResourceSection = (section: "parentGuides" | "therapyTips") => {
    setExpandedResourceSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const showInfoPopup = (title: string, content: string) => {
    Swal.fire({
      title: title,
      html: content,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#51a1ed",
      customClass: {
        popup: "text-left",
      },
    })
  }

  const parentGuides = [
    {
      title: "Getting Started with Therapy",
      content: `
        <div class="space-y-4">
          <p><strong>What to Expect:</strong> Your first visit will include a comprehensive assessment to understand your child's unique needs and strengths.</p>
          <p><strong>Preparation:</strong> Bring any previous evaluations, medical records, and a list of your concerns and goals.</p>
          <p><strong>Initial Steps:</strong> We'll create a personalized treatment plan and discuss therapy frequency and duration.</p>
          <p><strong>Family Involvement:</strong> Learn how you can support your child's progress at home with specific activities and strategies.</p>
        </div>
      `,
    },
    {
      title: "What to Expect in Sessions",
      content: `
        <div class="space-y-4">
          <p><strong>Session Structure:</strong> Each 45-60 minute session is tailored to your child's attention span and needs.</p>
          <p><strong>Activities:</strong> We use play-based learning, interactive games, and structured exercises to make therapy engaging.</p>
          <p><strong>Progress Tracking:</strong> Regular assessments and updates help monitor your child's development.</p>
          <p><strong>Home Practice:</strong> You'll receive specific activities to practice between sessions for optimal progress.</p>
        </div>
      `,
    },
    {
      title: "Supporting Your Child at Home",
      content: `
        <div class="space-y-4">
          <p><strong>Daily Practice:</strong> Incorporate speech exercises into daily routines like mealtime and play.</p>
          <p><strong>Reading Together:</strong> Read books daily and ask questions to encourage communication.</p>
          <p><strong>Patience & Encouragement:</strong> Celebrate small victories and maintain a positive, supportive environment.</p>
          <p><strong>Consistency:</strong> Regular practice and routine help reinforce therapy goals at home.</p>
        </div>
      `,
    },
  ]

  const therapyTips = [
    {
      title: "Speech Practice at Home",
      content: `
        <div class="space-y-4">
          <p><strong>Mirror Practice:</strong> Use a mirror to help your child see mouth movements and tongue positions.</p>
          <p><strong>Sound Games:</strong> Play games that focus on specific sounds your child is working on.</p>
          <p><strong>Repetition:</strong> Practice target words and sounds multiple times throughout the day.</p>
          <p><strong>Make it Fun:</strong> Use songs, rhymes, and games to keep practice sessions enjoyable.</p>
        </div>
      `,
    },
    {
      title: "Behavioral Support Tips",
      content: `
        <div class="space-y-4">
          <p><strong>Clear Expectations:</strong> Set consistent rules and expectations for behavior.</p>
          <p><strong>Positive Reinforcement:</strong> Reward good behavior immediately with praise or preferred activities.</p>
          <p><strong>Visual Supports:</strong> Use pictures, charts, and schedules to help your child understand routines.</p>
          <p><strong>Stay Calm:</strong> Model calm behavior and use consistent responses to challenging behaviors.</p>
        </div>
      `,
    },
    {
      title: "Encouraging Social Interaction",
      content: `
        <div class="space-y-4">
          <p><strong>Playdates:</strong> Arrange structured playdates with peers to practice social skills.</p>
          <p><strong>Turn-Taking:</strong> Practice taking turns in games and conversations.</p>
          <p><strong>Social Stories:</strong> Use social stories to teach appropriate social behaviors and responses.</p>
          <p><strong>Community Activities:</strong> Participate in community events to provide real-world social practice.</p>
        </div>
      `,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#51a1ed] backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={RHLogo || "/placeholder.svg"} alt="RH Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">Right Choice Kids Therapy</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {/* <button
                onClick={() => scrollToSection("home")}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {t.home}
              </button> */}

              {/* About Us Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("about")}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors"
                >
                  <span>{t.about}</span>
                  {activeDropdown === "about" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {activeDropdown === "about" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => scrollToSection("our-story")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Our Story
                    </button>
                    <button
                      onClick={() => scrollToSection("vision-mission")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Vision & Mission
                    </button>
                    
                    <button
                      onClick={() => scrollToSection("core-values")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Core Values
                    </button>
                    <button
                      onClick={() => scrollToSection("what-we-do")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      What We Do
                    </button>

                    <button
                      onClick={() => scrollToSection("leadership-team")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Leadership Team
                    </button>                    <button
                      onClick={() => scrollToSection("milestones")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Milestones
                    </button>
                    <button
                      onClick={() => scrollToSection("careers")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Careers
                    </button>
                  </div>
                )}
              </div>

              {/* Our Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors"
                >
                  <span>{t.services}</span>
                  {activeDropdown === "services" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => scrollToSection("speech-language-therapy")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Speech & Language Therapy
                    </button>
                    <button
                      onClick={() => scrollToSection("behavioral-social-skills")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Behavioral & Social Skills
                    </button>
                    <button
                      onClick={() => scrollToSection("age-specific-programs")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Age-Specific Programs
                    </button>
                    <button
                      onClick={() => scrollToSection("multilingual-support")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Multilingual Support
                    </button>
                    <button
                      onClick={() => scrollToSection("parent-family-support")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Parent & Family Support
                    </button>
                    <button
                      onClick={() => scrollToSection("teletherapy-online")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Teletherapy / Online Services
                    </button>
                    <button
                      onClick={() => scrollToSection("assessment-evaluation")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Assessment & Evaluation
                    </button>
                    <button
                      onClick={() => scrollToSection("workshops-training")}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Workshops & Training
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("news")}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {t.news}
              </button>

              {/* Resources Dropdown - Updated with collapsible sections */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors"
                >
                  <span>{t.resources}</span>
                  {activeDropdown === "resources" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {activeDropdown === "resources" && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Parent Guides - Now Collapsible */}
                    <div>
                      <button
                        onClick={() => toggleResourceSection("parentGuides")}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <span>Parent Guides</span>
                        {expandedResourceSections.parentGuides ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {expandedResourceSections.parentGuides && (
                        <div className="bg-gray-50">
                          {parentGuides.map((guide, index) => (
                            <button
                              key={index}
                              onClick={() => showInfoPopup(guide.title, guide.content)}
                              className="flex items-center w-full text-left px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Info className="h-4 w-4 mr-2" />
                              {guide.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Therapy Tips - Now Collapsible */}
                    <div>
                      <button
                        onClick={() => toggleResourceSection("therapyTips")}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 border-b border-gray-100 mt-2"
                      >
                        <span>Therapy Tips</span>
                        {expandedResourceSections.therapyTips ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      {expandedResourceSections.therapyTips && (
                        <div className="bg-gray-50">
                          {therapyTips.map((tip, index) => (
                            <button
                              key={index}
                              onClick={() => showInfoPopup(tip.title, tip.content)}
                              className="flex items-center w-full text-left px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Info className="h-4 w-4 mr-2" />
                              {tip.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* FAQs and Downloads */}
                    
                    <button
                      onClick={() => scrollToSection("faqs")}
                      className="block w-full text-left px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      FAQs
                    </button>
                    <button
                      onClick={() => scrollToSection("downloads")}
                      className="block w-full text-left px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Downloadable Resources
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection("appointment")}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {t.appointment}
              </button>

              <button
                onClick={() => scrollToSection("footer")}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {t.contactUs || "Contact Us"}
              </button>

              
              

              

              
            </nav>

            {/* Language Toggle and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-blue-300 hover:bg-blue-600 transition-colors text-white"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language === "en" ? "EN / አማ" : "EN / አማ"}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-white hover:text-blue-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t.home}
                </button>

                {/* Mobile About Us Dropdown */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown("about")}
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>{t.about}</span>
                    {isMobileDropdownOpen === "about" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {isMobileDropdownOpen === "about" && (
                    <div className="pl-6 space-y-1">
                      <button
                        onClick={() => scrollToSection("our-story")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Our Story
                      </button>
                      <button
                        onClick={() => scrollToSection("vision-mission")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Vision & Mission
                      </button>
                      <button
                        onClick={() => scrollToSection("leadership-team")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Leadership Team
                      </button>
                      <button
                        onClick={() => scrollToSection("core-values")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Core Values
                      </button>
                      <button
                        onClick={() => scrollToSection("what-we-do")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        What We Do
                      </button>
                      <button
                        onClick={() => scrollToSection("milestones")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Milestones
                      </button>
                      <button
                        onClick={() => scrollToSection("careers")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Careers
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown("services")}
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>{t.services}</span>
                    {isMobileDropdownOpen === "services" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {isMobileDropdownOpen === "services" && (
                    <div className="pl-6 space-y-1">
                      <button
                        onClick={() => scrollToSection("speech-language-therapy")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Speech & Language Therapy
                      </button>
                      <button
                        onClick={() => scrollToSection("behavioral-social-skills")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Behavioral & Social Skills
                      </button>
                      <button
                        onClick={() => scrollToSection("age-specific-programs")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Age-Specific Programs
                      </button>
                      <button
                        onClick={() => scrollToSection("multilingual-support")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Multilingual Support
                      </button>
                      <button
                        onClick={() => scrollToSection("parent-family-support")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Parent & Family Support
                      </button>
                      <button
                        onClick={() => scrollToSection("teletherapy-online")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Teletherapy / Online Services
                      </button>
                      <button
                        onClick={() => scrollToSection("assessment-evaluation")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Assessment & Evaluation
                      </button>
                      <button
                        onClick={() => scrollToSection("workshops-training")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Workshops & Training
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection("appointment")}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t.appointment}
                </button>
                <button
                  onClick={() => scrollToSection("news")}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t.news}
                </button>

                <button
                  onClick={() => scrollToSection("footer")}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t.contactUs || "Contact Us"}
                </button>

                {/* Mobile Resources Dropdown - Updated with collapsible sections */}
                <div>
                  <button
                    onClick={() => toggleMobileDropdown("resources")}
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>{t.resources}</span>
                    {isMobileDropdownOpen === "resources" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {isMobileDropdownOpen === "resources" && (
                    <div className="pl-6 space-y-1">
                      {/* Parent Guides - Mobile Collapsible */}
                      <div>
                        <button
                          onClick={() => toggleResourceSection("parentGuides")}
                          className="flex items-center justify-between w-full px-3 py-1 text-xs font-semibold text-gray-500"
                        >
                          <span>Parent Guides</span>
                          {expandedResourceSections.parentGuides ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                        {expandedResourceSections.parentGuides && (
                          <div className="pl-3">
                            {parentGuides.map((guide, index) => (
                              <button
                                key={index}
                                onClick={() => showInfoPopup(guide.title, guide.content)}
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                              >
                                <Info className="h-3 w-3 mr-2" />
                                {guide.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Therapy Tips - Mobile Collapsible */}
                      <div>
                        <button
                          onClick={() => toggleResourceSection("therapyTips")}
                          className="flex items-center justify-between w-full px-3 py-1 text-xs font-semibold text-gray-500 mt-2"
                        >
                          <span>Therapy Tips</span>
                          {expandedResourceSections.therapyTips ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                        {expandedResourceSections.therapyTips && (
                          <div className="pl-3">
                            {therapyTips.map((tip, index) => (
                              <button
                                key={index}
                                onClick={() => showInfoPopup(tip.title, tip.content)}
                                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                              >
                                <Info className="h-3 w-3 mr-2" />
                                {tip.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* FAQs and Downloads */}
                      <div className="px-3 py-1 text-xs font-semibold text-gray-500 mt-2">Resources</div>
                      <button
                        onClick={() => scrollToSection("faqs")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        FAQs
                      </button>
                      <button
                        onClick={() => scrollToSection("downloads")}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        Downloads
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Click outside to close dropdowns */}
      {(activeDropdown || isMobileDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setActiveDropdown(null)
            setIsMobileDropdownOpen(null)
          }}
        />
      )}

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t.heroHeadline}
                <span className="text-blue-600 block">{t.heroSubheadline}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t.heroDescription}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("appointment")}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>{t.bookAppointment}</span>
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{t.ourServices}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
                alt="Therapist working with child"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-600">{t.childrenHelped}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.whyChooseUs}</h2>
            <p className="text-xl text-gray-600">{t.whyChooseUsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.experiencedTherapists}</h3>
              <p className="text-gray-600">{t.experiencedTherapistsDesc}</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.familyCenteredCare}</h3>
              <p className="text-gray-600">{t.familyCenteredCareDesc}</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.culturallySensitive}</h3>
              <p className="text-gray-600">{t.culturallySensitiveDesc}</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.affordableServices}</h3>
              <p className="text-gray-600">{t.affordableServicesDesc}</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.hearFromFamilies}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parentFeedbacks.length > 0 ? (
                parentFeedbacks.map((feedback, index) => (
                  <div
                    key={feedback.id}
                    className={`p-8 rounded-xl ${
                      index % 3 === 0 ? "bg-blue-50" : index % 3 === 1 ? "bg-blue-50" : "bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(feedback.ratingValue) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({feedback.ratingValue})</span>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{feedback.message}"</p>
                    <p className="text-gray-900 font-semibold">- {feedback.name}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">Loading testimonials...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Right Choice Kids Therapy was founded in 2018 with a simple yet powerful mission: to provide exceptional
                speech and behavioral therapy services to children in Ethiopia. Our journey began when our founder, Dr.
                Sarah Johnson, recognized the significant gap in specialized pediatric therapy services in Addis Ababa.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a small clinic with just two therapists has grown into a comprehensive therapy center
                serving over 500 families. We've built our reputation on evidence-based practices, cultural sensitivity,
                and unwavering commitment to each child's unique journey.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl font-bold text-blue-600">2018</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Families Served</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
                alt="Our therapy center"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
            <p className="text-xl text-gray-600">Guiding principles that drive our commitment to excellence</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.mission}</h3>
              <p className="text-gray-600">
                To provide comprehensive, culturally-sensitive speech and behavioral therapy services that empower
                children to reach their full potential and strengthen family bonds through evidence-based practices and
                compassionate care.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.vision}</h3>
              <p className="text-gray-600">
                To be the leading pediatric therapy center in Ethiopia, recognized for excellence in treatment outcomes,
                innovative approaches, and creating lasting positive impact in the lives of children and families.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.values}</h3>
              <p className="text-gray-600 mb-4">Our core values guide everything we do:</p>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Compassion & Empathy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Child-Centered Care</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Excellence & Innovation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Cultural Sensitivity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section id="leadership-team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the dedicated professionals leading our mission</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <img
                src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
                alt="Dr. Sarah Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
              <p className="text-blue-600 font-medium mb-3">Founder & Clinical Director</p>
              <p className="text-gray-600 text-sm">
                Ph.D. in Speech-Language Pathology with 15+ years of experience in pediatric therapy and autism spectrum
                disorders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <img
                src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg"
                alt="Dr. Michael Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Michael Chen</h3>
              <p className="text-blue-600 font-medium mb-3">Lead Behavioral Therapist</p>
              <p className="text-gray-600 text-sm">
                Board-certified behavior analyst specializing in Applied Behavior Analysis (ABA) and social skills
                development.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <img
                src="https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg"
                alt="Almaz Tadesse"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Almaz Tadesse</h3>
              <p className="text-orange-600 font-medium mb-3">Senior Speech Therapist</p>
              <p className="text-gray-600 text-sm">
                M.A. in Communication Disorders with expertise in multilingual therapy and cultural adaptation of
                treatment approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="core-values" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our approach to therapy and care</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We approach every child and family with empathy, understanding, and genuine care for their unique
                journey.
              </p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in therapy practices, continuing education, and treatment outcomes.
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We work closely with families, schools, and other professionals to ensure comprehensive support.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Sensitivity</h3>
              <p className="text-gray-600">
                We honor and integrate cultural backgrounds into our therapy approaches for meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600">Comprehensive therapy services designed to help every child thrive</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Evidence-Based Practices</h4>
                    <p className="text-gray-600">
                      We use scientifically proven methods and continuously update our approaches based on the latest
                      research.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Individualized Treatment Plans</h4>
                    <p className="text-gray-600">
                      Every child receives a customized therapy plan tailored to their specific needs, goals, and
                      learning style.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Family-Centered Care</h4>
                    <p className="text-gray-600">
                      We involve families as partners in the therapy process, providing training and support for home
                      practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8613299/pexels-photo-8613299.jpeg"
                alt="Therapy session in progress"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Assessment & Diagnosis</h3>
              <p className="text-gray-600">
                Comprehensive evaluations to identify strengths, challenges, and develop targeted intervention
                strategies.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Individual & Group Therapy</h3>
              <p className="text-gray-600">
                Both one-on-one sessions and group activities to address specific goals and promote social interaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training & Education</h3>
              <p className="text-gray-600">
                Workshops and training sessions for parents, caregivers, and educational professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section id="milestones" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Milestones</h2>
            <p className="text-xl text-gray-600">Key achievements in our journey of growth and impact</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-12">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2018 - Foundation</h3>
                    <p className="text-gray-600">
                      Right Choice Kids Therapy was established with a vision to provide quality pediatric therapy
                      services in Ethiopia.
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2019 - First 100 Families</h3>
                    <p className="text-gray-600">
                      Reached our first major milestone of serving 100 families, establishing trust in the community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2020 - Teletherapy Launch</h3>
                    <p className="text-gray-600">
                      Adapted to provide remote therapy services during the pandemic, ensuring continuity of care.
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-orange-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-green-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2022 - Second Location</h3>
                    <p className="text-gray-600">
                      Opened our Bole branch to better serve families across Addis Ababa with expanded services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">2024 - 500+ Families Served</h3>
                    <p className="text-gray-600">
                      Celebrated serving over 500 families with a 95% satisfaction rate and numerous success stories.
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-purple-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-xl text-gray-600">
              Be part of our mission to transform children's lives through exceptional therapy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Work With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Professional Growth</h4>
                    <p className="text-gray-600">
                      Continuous learning opportunities, conference attendance, and skill development programs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Meaningful Impact</h4>
                    <p className="text-gray-600">
                      Make a real difference in children's lives and contribute to their developmental success.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Collaborative Environment</h4>
                    <p className="text-gray-600">
                      Work with a supportive team of dedicated professionals who share your passion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Competitive Benefits</h4>
                    <p className="text-gray-600">
                      Comprehensive benefits package including health insurance, professional development funds, and
                      flexible scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg"
                alt="Our team at work"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Current Openings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Speech-Language Pathologist</h4>
                <p className="text-gray-600 mb-4">
                  Full-time position for experienced SLP to join our growing team. Master's degree required.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">Full-time</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Behavioral Therapist</h4>
                <p className="text-gray-600 mb-4">
                  Join our ABA team to provide behavioral intervention services. BCBA certification preferred.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">Full-time</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Therapy Assistant</h4>
                <p className="text-gray-600 mb-4">
                  Support our therapy team with administrative tasks and session preparation. Entry-level position.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-medium">Part-time</span>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Administrative Coordinator</h4>
                <p className="text-gray-600 mb-4">
                  Manage scheduling, billing, and family communications. Strong organizational skills required.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">Full-time</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speech & Language Therapy Section */}
      <section id="speech-language-therapy" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Speech & Language Therapy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive speech and language services to help children communicate effectively and confidently
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Speech Therapy Services</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Articulation Therapy</h4>
                    <p className="text-gray-600">
                      Help children produce speech sounds correctly and improve overall speech clarity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Language Development</h4>
                    <p className="text-gray-600">
                      Build vocabulary, grammar skills, and comprehension abilities for effective communication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Social Communication</h4>
                    <p className="text-gray-600">
                      Develop pragmatic language skills for successful social interactions and relationships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
                alt="Speech therapy session"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Conditions We Treat</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Speech Sound Disorders</h4>
                <p className="text-gray-600 text-sm">Difficulty producing specific sounds or sound patterns</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Language Delays</h4>
                <p className="text-gray-600 text-sm">Slower development of vocabulary and grammar skills</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Stuttering</h4>
                <p className="text-gray-600 text-sm">Disruptions in the flow and rhythm of speech</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Voice Disorders</h4>
                <p className="text-gray-600 text-sm">Problems with pitch, volume, or quality of voice</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Autism Spectrum Disorders</h4>
                <p className="text-gray-600 text-sm">Communication challenges associated with ASD</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Apraxia of Speech</h4>
                <p className="text-gray-600 text-sm">Motor planning difficulties affecting speech production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behavioral & Social Skills Section */}
      <section id="behavioral-social-skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Behavioral & Social Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based behavioral interventions and social skills training to help children thrive
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/8613299/pexels-photo-8613299.jpeg"
                alt="Behavioral therapy session"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Behavioral Services</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Applied Behavior Analysis (ABA)</h4>
                    <p className="text-gray-600">
                      Systematic approach to understanding and changing behavior patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Social Skills Training</h4>
                    <p className="text-gray-600">Teaching appropriate social behaviors and interaction skills.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Emotional Regulation</h4>
                    <p className="text-gray-600">Helping children manage emotions and develop coping strategies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Programs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Early Intervention</h4>
                <p className="text-gray-600 text-sm">Ages 2-5 years</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Groups</h4>
                <p className="text-gray-600 text-sm">Peer interaction skills</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">School Readiness</h4>
                <p className="text-gray-600 text-sm">Classroom behaviors</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Self-Regulation</h4>
                <p className="text-gray-600 text-sm">Emotional control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age-Specific Programs Section */}
      <section id="age-specific-programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Age-Specific Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored therapy programs designed for different developmental stages
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-orange-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-full mr-4">
                  <Baby className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Toddlers (2-3 years)</h3>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>First words and early vocabulary</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Play-based learning activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Parent coaching and support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Basic social interaction skills</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Focus on foundational communication skills through engaging, developmentally appropriate activities.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Preschool (3-5 years)</h3>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>School readiness skills</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Complex sentence structures</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Pre-literacy and phonological awareness</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Group interaction and sharing</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Preparing children for academic success with advanced communication and social skills.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Elementary (6-12 years)</h3>
              </div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Academic language support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Reading comprehension strategies</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Written expression skills</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Advanced social communication</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Supporting academic achievement and peer relationships through targeted interventions.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Program Features</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                <p className="text-gray-600 text-sm">Sessions adapted to your child's routine</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Small Group Options</h4>
                <p className="text-gray-600 text-sm">Peer learning opportunities</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Involvement</h4>
                <p className="text-gray-600 text-sm">Parent training and support</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Goal-Oriented</h4>
                <p className="text-gray-600 text-sm">Measurable progress tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Support Section */}
      <section id="multilingual-support" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Multilingual Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Culturally responsive therapy services in multiple languages
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Languages We Support</h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">አማርኛ</div>
                  <div className="text-gray-700">Amharic</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">English</div>
                  <div className="text-gray-700">English</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">Afaan Oromoo</div>
                  <div className="text-gray-700">Oromo</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">ትግርኛ</div>
                  <div className="text-gray-700">Tigrigna</div>
                </div>
              </div>
              <p className="text-gray-600">
                Our multilingual therapists provide services in your child's native language, ensuring cultural
                relevance and better therapeutic outcomes.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
                alt="Multilingual therapy session"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Cultural Considerations</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cultural Assessment</h4>
                <p className="text-gray-600 text-sm">Understanding cultural communication patterns and family values</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Engagement</h4>
                <p className="text-gray-600 text-sm">Involving extended family members in the therapy process</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bilingual Development</h4>
                <p className="text-gray-600 text-sm">Supporting development in both native and second languages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent & Family Support Section */}
      <section id="parent-family-support" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Parent & Family Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering families with knowledge, skills, and support for their child's development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/8613299/pexels-photo-8613299.jpeg"
                alt="Family support session"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Support Services</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Parent Training Workshops</h4>
                    <p className="text-gray-600">Learn strategies to support your child's development at home.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Family Support Groups</h4>
                    <p className="text-gray-600">Connect with other families facing similar challenges.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Home Program Development</h4>
                    <p className="text-gray-600">Customized activities and exercises for daily practice.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Monthly Workshops</h4>
              <p className="text-gray-600 text-sm">Regular training sessions on various topics</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Support Line</h4>
              <p className="text-gray-600 text-sm">Emergency consultation and guidance</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Resource Library</h4>
              <p className="text-gray-600 text-sm">Downloadable guides and materials</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Emotional Support</h4>
              <p className="text-gray-600 text-sm">Counseling and mental health resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teletherapy / Online Services Section */}
      <section id="teletherapy-online" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Teletherapy / Online Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convenient, effective therapy services delivered from the comfort of your home
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Online Therapy Benefits</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                    <p className="text-gray-600">Sessions that fit your family's busy schedule.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">No Travel Required</h4>
                    <p className="text-gray-600">Eliminate commute time and transportation barriers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Comfortable Environment</h4>
                    <p className="text-gray-600">Children often perform better in familiar surroundings.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
                alt="Online therapy session"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Technology Requirements</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Stable Internet</h4>
                <p className="text-gray-600 text-sm">High-speed internet connection for smooth video calls</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Camera & Microphone</h4>
                <p className="text-gray-600 text-sm">Clear video and audio for effective communication</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quiet Space</h4>
                <p className="text-gray-600 text-sm">Distraction-free environment for focused sessions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment & Evaluation Section */}
      <section id="assessment-evaluation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Assessment & Evaluation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive evaluations to understand your child's unique strengths and needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg"
                alt="Assessment session"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Initial Consultation</h4>
                    <p className="text-gray-600">Discuss concerns, history, and goals with our team.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Standardized Testing</h4>
                    <p className="text-gray-600">Evidence-based assessments to measure current abilities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Detailed Report</h4>
                    <p className="text-gray-600">Comprehensive findings and treatment recommendations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Speech Assessment</h4>
              <p className="text-gray-600 text-sm">Articulation, fluency, and voice evaluation</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Language Testing</h4>
              <p className="text-gray-600 text-sm">Receptive and expressive language skills</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Social Skills</h4>
              <p className="text-gray-600 text-sm">Pragmatic language and interaction abilities</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Behavioral Analysis</h4>
              <p className="text-gray-600 text-sm">Functional behavior assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops & Training Section */}
      <section id="workshops-training" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Workshops & Training</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educational programs for parents, caregivers, and professionals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Training Programs</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Parent Education Series</h4>
                    <p className="text-gray-600">Monthly workshops covering various developmental topics.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Development</h4>
                    <p className="text-gray-600">Training for teachers, healthcare workers, and therapists.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community Outreach</h4>
                    <p className="text-gray-600">Educational programs for schools and community centers.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg"
                alt="Training workshop"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Upcoming Workshops</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">March 15, 2024</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Early Language Development</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Supporting your toddler's first words and early communication.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Register Now
                </button>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">March 22, 2024</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Managing Challenging Behaviors</h4>
                <p className="text-gray-600 text-sm mb-4">Positive behavior support strategies for families.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Register Now
                </button>
              </div>

              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-sm text-gray-600">March 29, 2024</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">School Readiness Skills</h4>
                <p className="text-gray-600 text-sm mb-4">Preparing your child for academic success.</p>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.bookYourAppointment}</h2>
            <p className="text-xl text-gray-600">{t.appointmentSubtitle}</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.parentName} *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.childName} *
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.childAge} *
                  </label>
                  <select
                    id="childAge"
                    name="childAge"
                    required
                    value={formData.childAge}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t.selectAge}</option>
                    <option value="2">2 {t.years}</option>
                    <option value="3">3 {t.years}</option>
                    <option value="4">4 {t.years}</option>
                    <option value="5">5 {t.years}</option>
                    <option value="6">6 {t.years}</option>
                    <option value="7">7 {t.years}</option>
                    <option value="8">8 {t.years}</option>
                    <option value="9">9 {t.years}</option>
                    <option value="10">10 {t.years}</option>
                    <option value="11">11 {t.years}</option>
                    <option value="12">12 {t.years}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.preferredDate} *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.preferredTime} *
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{t.selectTime}</option>
                    <option value="8:00 AM">{t.time8am}</option>
                    <option value="9:00 AM">{t.time9am}</option>
                    <option value="10:00 AM">{t.time10am}</option>
                    <option value="11:00 AM">{t.time11am}</option>
                    <option value="1:00 PM">{t.time1pm}</option>
                    <option value="2:00 PM">{t.time2pm}</option>
                    <option value="3:00 PM">{t.time3pm}</option>
                    <option value="4:00 PM">{t.time4pm}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contactNumber} *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailAddress} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.additionalNotes}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder={t.additionalNotesPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                <Calendar className="h-5 w-5" />
                <span>{isSubmitting ? "Submitting..." : t.scheduleAppointment}</span>

                
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.latestNews}</h2>
            <p className="text-xl text-gray-600">{t.newsSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-50 p-8 rounded-xl">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.monthlyImpactReport}</h3>
              {monthlyReport ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.childrenServed}</span>
                    <span className="text-2xl font-bold text-blue-600">{monthlyReport.childrenServed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.successRate}</span>
                    <span className="text-2xl font-bold text-green-600">{monthlyReport.successRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.newFamilies}</span>
                    <span className="text-2xl font-bold text-blue-600">{monthlyReport.newFamilies}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Loading report...</p>
              )}
            </div>

            <div className="bg-white border-2 border-gray-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.upcomingEvents}</h3>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-3 text-gray-600">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{event.eventName}</span>
                        <p className="text-sm text-gray-500">{new Date(event.eventDate).toLocaleDateString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Loading events...</p>
              )}
            </div>

            <div className="bg-white border-2 border-gray-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{t.recentAchievement}</h3>
                {recentAchievements.length > 1 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={prevAchievement}
                      disabled={currentAchievementIndex === 0}
                      className={`p-1 rounded-full ${
                        currentAchievementIndex === 0
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-purple-600 hover:bg-purple-100"
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextAchievement}
                      disabled={currentAchievementIndex === recentAchievements.length - 1}
                      className={`p-1 rounded-full ${
                        currentAchievementIndex === recentAchievements.length - 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-purple-600 hover:bg-purple-100"
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
              {recentAchievements.length > 0 ? (
                <div>
                  <p className="text-gray-600 mb-4">{recentAchievements[currentAchievementIndex].achivement}</p>
                  <span className="text-sm text-purple-600 font-medium">
                    {new Date(recentAchievements[currentAchievementIndex].date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  {recentAchievements.length > 1 && (
                    <div className="mt-2 text-xs text-gray-500">
                      {currentAchievementIndex + 1} of {recentAchievements.length}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Loading achievements...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.resourcesTitle}</h2>
            <p className="text-xl text-gray-600">{t.resourcesSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Educational Articles</h3>
              {educationalArticles.length > 0 ? (
                <div className="space-y-4">
                  {educationalArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className={`border-l-4 pl-4 ${
                        index % 3 === 0 ? "border-blue-500" : index % 3 === 1 ? "border-blue-500" : "border-green-500"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{article.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{article.description}</p>
                        </div>
                        <button
                          onClick={() => openArticleModal(article)}
                          className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Loading articles...</p>
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Downloadable Resources</h3>
              {downloadableResources.length > 0 ? (
                <div className="space-y-4">
                  {downloadableResources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className={`p-4 rounded-lg ${
                        index % 3 === 0 ? "bg-blue-50" : index % 3 === 1 ? "bg-blue-50" : "bg-green-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                          <p className="text-gray-600 text-sm mb-1">{resource.description}</p>
                          <p className="text-gray-500 text-xs">
                            {resource.resourceFile.ext.toUpperCase()} - {(resource.resourceFile.size / 1024).toFixed(1)}{" "}
                            KB
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handlePreviewResource(resource)}
                            className={`p-2 rounded-lg transition-colors ${
                              index % 3 === 0
                                ? "bg-blue-600 hover:bg-blue-700"
                                : index % 3 === 1
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                            title="Preview"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadResource(resource)}
                            className={`p-2 rounded-lg transition-colors ${
                              index % 3 === 0
                                ? "bg-blue-600 hover:bg-blue-700"
                                : index % 3 === 1
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Loading resources...</p>
              )}
            </div>
          </div>

          {/* FAQs Section */}
          <section id="faqs">
            <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
              {faqs.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-8">
                  {faqs.map((faq, index) => (
                    <div key={faq.id} className={index % 2 === 0 ? "" : "lg:mt-6"}>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Loading FAQs...</p>
              )}
            </div>
          </section>

          {/* Downloads Section */}
          <section id="downloads">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Download Center</h3>
              {downloadableResources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {downloadableResources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className={`p-6 rounded-lg border-2 ${
                        index % 3 === 0
                          ? "border-blue-200 bg-blue-50"
                          : index % 3 === 1
                            ? "border-blue-200 bg-blue-50"
                            : "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            index % 3 === 0 ? "bg-blue-100" : index % 3 === 1 ? "bg-blue-100" : "bg-green-100"
                          }`}
                        >
                          <Download
                            className={`h-8 w-8 ${
                              index % 3 === 0 ? "text-blue-600" : index % 3 === 1 ? "text-blue-600" : "text-green-600"
                            }`}
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <p className="text-gray-500 text-xs mb-4">
                          {resource.resourceFile.ext.toUpperCase()} - {(resource.resourceFile.size / 1024).toFixed(1)}{" "}
                          KB
                        </p>
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handlePreviewResource(resource)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              index % 3 === 0
                                ? "bg-blue-600 hover:bg-blue-700"
                                : index % 3 === 1
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-green-600 hover:bg-green-700"
                            } text-white text-sm`}
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => handleDownloadResource(resource)}
                            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                              index % 3 === 0
                                ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                : index % 3 === 1
                                  ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                  : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                            } text-sm`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Loading resources...</p>
              )}
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={RHLogo || "/placeholder.svg"} alt="RH Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold">Right Choice</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{t.footerDescription}</p>
              <div className="flex space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="bg-green-600 p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t.ourLocations}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-400">{t.salitemihretBranch}</h4>
                  <p className="text-gray-300 text-sm">{t.salitemihretLocation}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400">{t.boleBranch}</h4>
                  <p className="text-gray-300 text-sm">{t.boleLocation}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t.contactInfo}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+251 911 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">info@rightchoicespeech.et</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">{t.workingHours}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">{t.socialMedia}</h3>
              <div className="flex space-x-4">
                <a
                  href={t.socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href={t.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href={t.socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={t.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">&copy; {t.copyright}</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.privacyPolicy}
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.termsOfService}
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t.contact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      <ArticleModal article={selectedArticle} isOpen={isArticleModalOpen} onClose={closeArticleModal} />
    </div>
  )
}

export default SpeachTerapyOnePageApp
