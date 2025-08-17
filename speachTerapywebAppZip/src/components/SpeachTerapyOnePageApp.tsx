import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Heart, 
  Star, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  Calendar, 
  Download,
  MessageSquare,
  Send,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import Swal from 'sweetalert2';
import { translations, Translation } from '../translation';
import ArticleModal from './ArticleModal';
import {
  fetchParentsFeedbacks,
  fetchMonthlyImpactReport,
  fetchUpcomingEvents,
  fetchRecentAchievements,
  fetchEducationalArticles,
  fetchDownloadableResources,
  fetchFAQs,
  submitAppointment,
  ParentFeedback,
  MonthlyImpactReport,
  UpcomingEvent,
  RecentAchievement,
  EducationalArticle,
  DownloadableResource,
  FAQ,
  AppointmentData
} from '../services/api';

const SpeachTerapyOnePageApp: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [showWorkingHours, setShowWorkingHours] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const [showPartnership, setShowPartnership] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [showSalitemihretMap, setShowSalitemihretMap] = useState(false);
  const [showBoleMap, setShowBoleMap] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(0);

  // API Data States
  const [parentsFeedbacks, setParentsFeedbacks] = useState<ParentFeedback[]>([]);
  const [monthlyReport, setMonthlyReport] = useState<MonthlyImpactReport | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<RecentAchievement[]>([]);
  const [educationalArticles, setEducationalArticles] = useState<EducationalArticle[]>([]);
  const [downloadableResources, setDownloadableResources] = useState<DownloadableResource[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const t: Translation = translations[language];

  // Mock partners data
  const partners = [
    { name: 'Ethiopian Medical Association', logo: '🏥' },
    { name: 'Addis Ababa University', logo: '🎓' },
    { name: 'Ministry of Health Ethiopia', logo: '🏛️' },
    { name: 'UNICEF Ethiopia', logo: '🌍' },
    { name: 'Save the Children Ethiopia', logo: '👶' }
  ];

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
          fetchFAQs()
        ]);

        setParentsFeedbacks(feedbacks);
        setMonthlyReport(report);
        setUpcomingEvents(events);
        setRecentAchievements(achievements);
        setEducationalArticles(articles);
        setDownloadableResources(resources);
        setFaqs(faqData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Partner carousel effect
  useEffect(() => {
    if (showPartnership) {
      const interval = setInterval(() => {
        setCurrentPartner((prev) => (prev + 1) % partners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showPartnership, partners.length]);

  const handleAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const appointmentData: AppointmentData = {
      parentName: formData.get('parentName') as string,
      childsName: formData.get('childName') as string,
      childsAge: formData.get('childAge') as string,
      preferedDate: formData.get('preferredDate') as string,
      preferedTime: formData.get('preferredTime') as string,
      contactNumber: formData.get('contactNumber') as string,
      email: formData.get('email') as string,
      additionalNotes: formData.get('additionalNotes') as string,
    };

    const success = await submitAppointment(appointmentData);
    
    if (success) {
      Swal.fire({
        title: 'Success!',
        text: t.thankYouMessage,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      (e.target as HTMLFormElement).reset();
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit appointment. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    Swal.fire({
      title: 'Success!',
      text: 'Thank you for your feedback!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
    setShowFeedbackForm(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleWorkshopSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    Swal.fire({
      title: 'Success!',
      text: 'Registration successful! We will contact you soon.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
    setShowWorkshopForm(false);
    (e.target as HTMLFormElement).reset();
  };

  const openArticle = (article: EducationalArticle) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    setIsArticleModalOpen(false);
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:rightchoicekidsterapy@gmail.com?subject=Appointment';
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/251995037411', '_blank');
  };

  const handleTelegramContact = () => {
    window.open('https://t.me/+251995037411', '_blank');
  };

  const handleLocationClick = () => {
    setShowLocationMap(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-blue-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <img src="/RCLogo.png" alt="Right Choice Kids Therapy" className="h-8 w-8" />
              <span className="font-semibold">Right Choice Kids Therapy</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="mailto:rightchoicekidsterapy@gmail.com" className="flex items-center space-x-1 hover:text-blue-200">
                <Mail className="h-4 w-4" />
                <span>rightchoicekidsterapy@gmail.com</span>
              </a>
              <button onClick={handleWhatsAppContact} className="flex items-center space-x-1 hover:text-blue-200">
                <Phone className="h-4 w-4" />
                <span>+251995037411</span>
              </button>
              <button onClick={handleTelegramContact} className="flex items-center space-x-1 hover:text-blue-200">
                <MessageSquare className="h-4 w-4" />
                <span>+251931680502</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <nav className="hidden md:flex space-x-8">
              {/* Home */}
              <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">{t.home}</a>
              
              {/* About Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  {t.about} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <button onClick={() => setShowWorkingHours(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      {t.workingHour}
                    </button>
                    <button onClick={() => setShowLocationMap(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      {t.locationMap}
                    </button>
                    <button onClick={() => setShowPartnership(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      {t.partnership}
                    </button>
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  {t.services} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1 grid grid-cols-1 gap-1">
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.assessmentEvaluation}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.assessmentEvaluationDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.earlyIntervention}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.earlyInterventionDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.speechLanguageTherapy}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.speechDelayTherapyDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.abaTherapy}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.abaTherapyDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.occupationalTherapy}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.occupationalTherapyDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.playTherapy}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.playTherapyDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.selfHelpSkills}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.selfHelpSkillsDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.academicSkills}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.academicSkillsDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.socialSkillsDevelopment}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.socialSkillsDevelopmentDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.parentalTraining}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.parentalTrainingDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.onlineTherapy}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.onlineTherapyDesc}</div>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="font-semibold">{t.multilingualSupport}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.multilingualSupportDesc}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  {t.appointment} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <a href="#appointment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t.appointmentForm}
                    </a>
                    <div className="relative group/sub">
                      <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {t.otherOptions} <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          <button onClick={handleEmailContact} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <Mail className="h-4 w-4 mr-2" />
                            {t.email}
                          </button>
                          <button onClick={handleWhatsAppContact} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <Phone className="h-4 w-4 mr-2" />
                            {t.whatsapp}
                          </button>
                          <button onClick={handleTelegramContact} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t.telegram}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  {t.resources} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t.educationalArticles}
                    </a>
                    <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t.downloadableResources}
                    </a>
                    <div className="relative group/sub">
                      <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {t.parentGuide} <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {t.developmentalMilestones}
                          </a>
                          <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {t.homeActivities}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="relative group/sub">
                      <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {t.therapyTips} <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                        <div className="py-1">
                          <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {t.communicationStrategies}
                          </a>
                          <a href="#resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {t.behaviorManagement}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="#news" className="text-gray-700 hover:text-blue-600 font-medium">{t.news}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">{t.contactUs}</a>
            </nav>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'አማ' : 'EN'}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 py-2">{t.home}</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 py-2">{t.about}</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 py-2">{t.services}</a>
                <a href="#appointment" className="text-gray-700 hover:text-blue-600 py-2">{t.appointment}</a>
                <a href="#resources" className="text-gray-700 hover:text-blue-600 py-2">{t.resources}</a>
                <a href="#news" className="text-gray-700 hover:text-blue-600 py-2">{t.news}</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 py-2">{t.contactUs}</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t.heroHeadline}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-blue-600 mb-6">
                {t.heroSubheadline}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#appointment"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  {t.bookAppointment}
                </a>
                <a
                  href="#services"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                >
                  {t.ourServices}
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <img
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
                alt="Speech Therapy Session"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">{t.childrenHelped}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2</div>
              <div className="text-blue-100">Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2022</div>
              <div className="text-blue-100">{t.foundedIn}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.whyChooseUs}</h2>
            <p className="text-xl text-gray-600">{t.whyChooseUsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.experiencedTherapists}</h3>
              <p className="text-gray-600">{t.experiencedTherapistsDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.familyCenteredCare}</h3>
              <p className="text-gray-600">{t.familyCenteredCareDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.culturallySensitive}</h3>
              <p className="text-gray-600">{t.culturallySensitiveDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.affordableServices}</h3>
              <p className="text-gray-600">{t.affordableServicesDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Features</h2>
            <p className="text-xl text-gray-600">Comprehensive therapy options tailored to your child's needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.individualTherapy}</h3>
              <p className="text-gray-600">{t.individualTherapyDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.familyCenteredCare}</h3>
              <p className="text-gray-600">{t.familyCenteredCareDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.multilingualSupport}</h3>
              <p className="text-gray-600">{t.multilingualSupportDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.hearFromFamilies}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parentsFeedbacks.length > 0 ? (
              parentsFeedbacks.slice(0, 2).map((feedback) => (
                <div key={feedback.id} className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < feedback.ratingValue ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{feedback.message}"</p>
                  <p className="font-semibold text-gray-900">- {feedback.name}</p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">{t.testimonial1}</p>
                  <p className="font-semibold text-gray-900">{t.testimonial1Author}</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">{t.testimonial2}</p>
                  <p className="font-semibold text-gray-900">{t.testimonial2Author}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.aboutRightChoice}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.aboutDescription1}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.aboutDescription2}
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <p>{t.founder}</p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg"
                alt="About Right Choice"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.mission}</h3>
              <p className="text-gray-600 leading-relaxed">{t.missionText}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.vision}</h3>
              <p className="text-gray-600 leading-relaxed">{t.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.values}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.compassionEmpathy}</h3>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.childCenteredCare}</h3>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.excellenceInnovation}</h3>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.culturalSensitivity}</h3>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.responsiveness}</h3>
              <p className="text-gray-600 text-sm">{t.responsivenessDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.integrity}</h3>
              <p className="text-gray-600 text-sm">{t.integrityDesc}</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.punctuality}</h3>
              <p className="text-gray-600 text-sm">{t.punctualityDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.whatWeDo}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">{t.assessmentEvaluation}</h3>
              <p className="text-gray-600">{t.assessmentEvaluationShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-600">{t.earlyIntervention}</h3>
              <p className="text-gray-600">{t.earlyInterventionShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-purple-600">{t.speechLanguageTherapy}</h3>
              <p className="text-gray-600">{t.speechLanguageTherapyShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-red-600">{t.abaTherapy}</h3>
              <p className="text-gray-600">{t.abaTherapyShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-yellow-600">{t.occupationalTherapy}</h3>
              <p className="text-gray-600">{t.occupationalTherapyShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-indigo-600">{t.playTherapy}</h3>
              <p className="text-gray-600">{t.playTherapyShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-pink-600">{t.selfHelpSkills}</h3>
              <p className="text-gray-600">{t.selfHelpSkillsShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-teal-600">{t.academicSkills}</h3>
              <p className="text-gray-600">{t.academicSkillsShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-600">{t.socialSkillsDevelopment}</h3>
              <p className="text-gray-600">{t.socialSkillsDevelopmentShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-cyan-600">{t.parentalTraining}</h3>
              <p className="text-gray-600">{t.parentalTrainingShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-lime-600">{t.onlineTherapy}</h3>
              <p className="text-gray-600">{t.onlineTherapyShort}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-emerald-600">{t.multilingualSupport}</h3>
              <p className="text-gray-600">{t.multilingualSupportShort}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.bookYourAppointment}</h2>
              <p className="text-xl text-gray-600">{t.appointmentSubtitle}</p>
            </div>
            <form onSubmit={handleAppointmentSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.parentName}
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.childName}
                  </label>
                  <input
                    type="text"
                    name="childName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.childAge}
                  </label>
                  <select
                    name="childAge"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t.selectAge}</option>
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={`${i + 2}`}>
                        {i + 2} {t.years}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.preferredDate}
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.preferredTime}
                  </label>
                  <select
                    name="preferredTime"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contactNumber}
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.additionalNotes}
                </label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  placeholder={t.additionalNotesPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t.scheduleAppointment}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.latestNews}</h2>
            <p className="text-xl text-gray-600">{t.newsSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Impact Report */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{t.monthlyImpactReport}</h3>
              {monthlyReport ? (
                <div className="space-y-2">
                  <p><span className="font-medium">{t.childrenServed}</span> {monthlyReport.childrenServed}</p>
                  <p><span className="font-medium">{t.successRate}</span> {monthlyReport.successRate}</p>
                  <p><span className="font-medium">{t.newFamilies}</span> {monthlyReport.newFamilies}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><span className="font-medium">{t.childrenServed}</span> 45</p>
                  <p><span className="font-medium">{t.successRate}</span> 92%</p>
                  <p><span className="font-medium">{t.newFamilies}</span> 12</p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600">{t.upcomingEvents}</h3>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between">
                      <span className="text-sm">{event.eventName}</span>
                      <button 
                        onClick={() => setShowWorkshopForm(true)}
                        className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                      >
                        {t.registerNow}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.parentWorkshop}</span>
                    <button 
                      onClick={() => setShowWorkshopForm(true)}
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                    >
                      {t.registerNow}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.openHouse}</span>
                    <button 
                      onClick={() => setShowWorkshopForm(true)}
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                    >
                      {t.registerNow}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.communityScreening}</span>
                    <button 
                      onClick={() => setShowWorkshopForm(true)}
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                    >
                      {t.registerNow}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Achievement */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600">{t.recentAchievement}</h3>
              {recentAchievements.length > 0 ? (
                <p className="text-sm text-gray-600">{recentAchievements[0].achivement}</p>
              ) : (
                <p className="text-sm text-gray-600">{t.achievementDesc}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.resourcesTitle}</h2>
            <p className="text-xl text-gray-600">{t.resourcesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Educational Articles */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">{t.educationalArticles}</h3>
              <div className="space-y-4">
                {educationalArticles.length > 0 ? (
                  educationalArticles.slice(0, 3).map((article) => (
                    <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => openArticle(article)}>
                      <h4 className="font-semibold mb-2">{article.title}</h4>
                      <p className="text-gray-600 text-sm">{article.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h4 className="font-semibold mb-2">{t.speechMilestones}</h4>
                      <p className="text-gray-600 text-sm">{t.speechMilestonesDesc}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h4 className="font-semibold mb-2">{t.supportingAtHome}</h4>
                      <p className="text-gray-600 text-sm">{t.supportingAtHomeDesc}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h4 className="font-semibold mb-2">{t.understandingAutism}</h4>
                      <p className="text-gray-600 text-sm">{t.understandingAutismDesc}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Downloadable Resources */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-600">{t.downloadableResources}</h3>
              <div className="space-y-4">
                {downloadableResources.length > 0 ? (
                  downloadableResources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{resource.title}</h4>
                        <p className="text-gray-600 text-sm">{resource.description}</p>
                      </div>
                      <a
                        href={`https://strapi.hielav.com${resource.resourceFile.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Download className="h-5 w-5" />
                      </a>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{t.homeExerciseGuide}</h4>
                        <p className="text-gray-600 text-sm">PDF Guide</p>
                      </div>
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                        <Download className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{t.communicationTracker}</h4>
                        <p className="text-gray-600 text-sm">Excel Template</p>
                      </div>
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                        <Download className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{t.parentHandbook}</h4>
                        <p className="text-gray-600 text-sm">Comprehensive Guide</p>
                      </div>
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                        <Download className="h-5 w-5" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-purple-600">{t.faq}</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.length > 0 ? (
                faqs.slice(0, 4).map((faq) => (
                  <div key={faq.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">{t.faqQuestion1}</h4>
                    <p className="text-gray-600">{t.faqAnswer1}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">{t.faqQuestion2}</h4>
                    <p className="text-gray-600">{t.faqAnswer2}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">{t.faqQuestion3}</h4>
                    <p className="text-gray-600">{t.faqAnswer3}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="font-semibold mb-2 text-gray-900">{t.faqQuestion4}</h4>
                    <p className="text-gray-600">{t.faqAnswer4}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <img src="/RCLogo.png" alt="Right Choice Kids Therapy" className="h-10 w-10 mr-3" />
                <span className="text-xl font-bold">Right Choice Kids Therapy</span>
              </div>
              <p className="text-gray-300 mb-4">{t.footerDescription}</p>
              <div className="flex space-x-4">
                <a href={t.socialMediaLinks.facebook} className="text-gray-300 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={t.socialMediaLinks.twitter} className="text-gray-300 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href={t.socialMediaLinks.instagram} className="text-gray-300 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={t.socialMediaLinks.linkedin} className="text-gray-300 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Our Locations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.ourLocations}</h3>
              <div className="space-y-3">
                <div>
                  <button 
                    onClick={handleLocationClick}
                    className="text-white hover:text-blue-300 font-medium"
                  >
                    {t.salitemihretBranch}
                  </button>
                  <p className="text-gray-300 text-sm">{t.salitemihretLocation}</p>
                </div>
                <div>
                  <button 
                    onClick={handleLocationClick}
                    className="text-white hover:text-blue-300 font-medium"
                  >
                    {t.boleBranch}
                  </button>
                  <p className="text-gray-300 text-sm">{t.boleLocation}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contactInfo}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <a href="mailto:rightchoicekidsterapy@gmail.com" className="text-gray-300 hover:text-white">
                    rightchoicekidsterapy@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="text-gray-300">+251995037411</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-gray-300">{t.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Customer Feedback */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.customerFeedback}</h3>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.submitFeedback}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-300">{t.copyright}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={closeArticle}
      />

      {/* Working Hours Modal */}
      {showWorkingHours && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.workingHour}</h2>
              <button
                onClick={() => setShowWorkingHours(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{t.monday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.tuesday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.wednesday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.thursday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.friday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.saturday}:</span>
                <span>8AM - 8PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.sunday}:</span>
                <span>8AM - 8PM</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Map Modal */}
      {showLocationMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{t.ourLocations}</h2>
              <button
                onClick={() => setShowLocationMap(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Salitemihret Branch */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.salitemihretBranch}</h3>
                <p className="text-gray-600 mb-4">{t.salitemihretLocation}</p>
                <button
                  onClick={() => setShowSalitemihretMap(!showSalitemihretMap)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
                >
                  {showSalitemihretMap ? t.hideMap : t.clickToSeeMap}
                </button>
                {showSalitemihretMap && (
                  <div className="mt-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.568492482721!2d38.8191816736729!3d9.011792489260845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853391b4f427%3A0x5cc1136a34ff4a0d!2sJacros%20-%20Salite%20Mehret%20Rd%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1755384341633!5m2!1sen!2set" 
                      width="100%" 
                      height="300" 
                      style={{border:0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>

              {/* Bole Branch */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.boleBranch}</h3>
                <p className="text-gray-600 mb-4">{t.boleLocation}</p>
                <button
                  onClick={() => setShowBoleMap(!showBoleMap)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
                >
                  {showBoleMap ? t.hideMap : t.clickToSeeMap}
                </button>
                {showBoleMap && (
                  <div className="mt-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.4979337637524!2d38.800367173673074!3d9.018258989159738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85430fefa2a1%3A0x89be21e8aa34e1e6!2zQm9sZSBTdWIgQ2l0eSBBZG1pbmlzdHJhdGlvbiB8IE1lZ2VuYWduYSB8IOGLqOGJpuGIjCDhiq3hjY3hiIgg4Yqo4Ymw4YibIOGKoOGIteGJsOGLs-GLsOGIrSB8IOGImOGMiOGKk-GKmw!5e0!3m2!1sen!2set!4v1755384427329!5m2!1sen!2set" 
                      width="100%" 
                      height="300" 
                      style={{border:0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Partnership Modal */}
      {showPartnership && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.ourPartners}</h2>
              <button
                onClick={() => setShowPartnership(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-50 rounded-lg p-8 mb-4">
                <div className="text-6xl mb-4">{partners[currentPartner].logo}</div>
                <h3 className="text-xl font-semibold">{partners[currentPartner].name}</h3>
              </div>
              
              <div className="flex justify-center space-x-2">
                {partners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPartner(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentPartner ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.customerFeedback}</h2>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email} ({t.optional})
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.comment}
                </label>
                <textarea
                  name="comment"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.submitFeedback}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Workshop Registration Modal */}
      {showWorkshopForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.workshopRegistration}</h2>
              <button
                onClick={() => setShowWorkshopForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleWorkshopSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.organization} ({t.optional})
                </label>
                <input
                  type="text"
                  name="organization"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {t.register}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeachTerapyOnePageApp;