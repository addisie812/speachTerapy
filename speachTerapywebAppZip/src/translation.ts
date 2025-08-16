export interface Translation {
    // Header
    home: string;
    about: string;
    services: string;
    appointment: string;
    news: string;
    resources: string;
    contactUs: string;
    
    // Hero Section
    heroHeadline: string;
    heroSubheadline: string;
    heroDescription: string;
    bookAppointment: string;
    ourServices: string;
    
    // Stats
    childrenHelped: string;
    
    // Why Choose Us
    whyChooseUs: string;
    whyChooseUsSubtitle: string;
    experiencedTherapists: string;
    experiencedTherapistsDesc: string;
    familyCenteredCare: string;
    familyCenteredCareDesc: string;
    culturallySensitive: string;
    culturallySensitiveDesc: string;
    affordableServices: string;
    affordableServicesDesc: string;
    
    // Testimonials
    hearFromFamilies: string;
    testimonial1: string;
    testimonial1Author: string;
    testimonial2: string;
    testimonial2Author: string;
    
    // About Section
    aboutRightChoice: string;
    aboutDescription1: string;
    aboutDescription2: string;
    mission: string;
    missionText: string;
    vision: string;
    visionText: string;
    values: string;
    compassionEmpathy: string;
    childCenteredCare: string;
    excellenceInnovation: string;
    culturalSensitivity: string;
    
    // Services
    servicesTitle: string;
    servicesSubtitle: string;
    speechLanguageTherapy: string;
    speechDelayTherapy: string;
    speechDelayTherapyDesc: string;
    stutteringVoiceDisorders: string;
    stutteringVoiceDisordersDesc: string;
    literacyReadingSupport: string;
    literacyReadingSupportDesc: string;
    aacSupport: string;
    aacSupportDesc: string;
    
    behavioralSocialSkills: string;
    abaTherapy: string;
    abaTherapyDesc: string;
    socialSkillsTraining: string;
    socialSkillsTrainingDesc: string;
    emotionalRegulation: string;
    emotionalRegulationDesc: string;
    communicationSupport: string;
    communicationSupportDesc: string;
    
    ageSpecificPrograms: string;
    toddlers: string;
    toddlersDesc: string;
    preschool: string;
    preschoolDesc: string;
    elementary: string;
    elementaryDesc: string;
    
    multilingualSupport: string;
    multilingualSupportDesc: string;
    
    // Appointment Form
    bookYourAppointment: string;
    appointmentSubtitle: string;
    parentName: string;
    childName: string;
    childAge: string;
    selectAge: string;
    preferredDate: string;
    preferredTime: string;
    selectTime: string;
    contactNumber: string;
    emailAddress: string;
    additionalNotes: string;
    additionalNotesPlaceholder: string;
    scheduleAppointment: string;
    
    // News
    latestNews: string;
    newsSubtitle: string;
    monthlyImpactReport: string;
    childrenServed: string;
    successRate: string;
    newFamilies: string;
    upcomingEvents: string;
    parentWorkshop: string;
    openHouse: string;
    communityScreening: string;
    recentAchievement: string;
    achievementDesc: string;
    
    // Resources
    resourcesTitle: string;
    resourcesSubtitle: string;
    educationalArticles: string;
    speechMilestones: string;
    speechMilestonesDesc: string;
    supportingAtHome: string;
    supportingAtHomeDesc: string;
    understandingAutism: string;
    understandingAutismDesc: string;
    downloadableResources: string;
    homeExerciseGuide: string;
    communicationTracker: string;
    parentHandbook: string;
    
    faq: string;
    faqQuestion1: string;
    faqAnswer1: string;
    faqQuestion2: string;
    faqAnswer2: string;
    faqQuestion3: string;
    faqAnswer3: string;
    faqQuestion4: string;
    faqAnswer4: string;
    
    // Footer
    footerDescription: string;
    ourLocations: string;
    salitemihretBranch: string;
    salitemihretLocation: string;
    boleBranch: string;
    boleLocation: string;
    contactInfo: string;
    workingHours: string;
    privacyPolicy: string;
    termsOfService: string;
    contact: string;
    copyright: string;
    
    // Form validation
    thankYouMessage: string;
    
    // Time options
    time8am: string;
    time9am: string;
    time10am: string;
    time11am: string;
    time1pm: string;
    time2pm: string;
    time3pm: string;
    time4pm: string;
    
    // Age options
    years: string;
    
    // Social Media
    socialMedia: string;
    socialMediaLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    }
  }
  
  export const translations: Record<'en' | 'am', Translation> = {
    en: {
      // Header
      home: 'Welcome',
      about: 'About',
      services: 'Services',
      appointment: 'Appointment',
      news: 'Blogs',
      resources: 'Resources',
      contactUs: 'Contact Us',
      
      // Hero Section
      heroHeadline: 'Empowering Communication,',
      heroSubheadline: 'One Word at a Time',
      heroDescription: 'Welcome to Right Choice Kids Therapy! We are dedicated to providing personalized, evidence-based speech and language services for children ages 2 to 12. Our team of certified therapists combines innovative techniques with compassionate, family-centered care to support your child’s unique communication journey. At Right Choice Kids Therapy, we help your child find their voice and build confidence every step of the way.',
      bookAppointment: 'Book Appointment',
      ourServices: 'Our Services',
      
      // Stats
      childrenHelped: 'Children Helped',
      
      // Why Choose Us
      whyChooseUs: 'Why Choose Us',
      whyChooseUsSubtitle: 'Empowering Every Child. Supporting Every Family.',
      experiencedTherapists: 'Experienced Therapists',
      experiencedTherapistsDesc: 'Licensed professionals passionate about every child\'s progress',
      familyCenteredCare: 'Family-Centered Care',
      familyCenteredCareDesc: 'Working hand-in-hand with parents for lasting success',
      culturallySensitive: 'Culturally Sensitive',
      culturallySensitiveDesc: 'Respecting Ethiopia\'s diverse languages and traditions',
      affordableServices: 'Affordable Services',
      affordableServicesDesc: 'Quality therapy without financial barriers',
      
      // Testimonials
      hearFromFamilies: 'Hear From Our Families',
      testimonial1: '"We saw real progress within weeks. The team at Right Choice truly cares about our child."',
      testimonial1Author: '- Sarah M.',
      testimonial2: '"Professional, kind, and effective — they helped my son say \'Mom\' for the first time."',
      testimonial2Author: '- Daniel T.',
      
      // About Section
      aboutRightChoice: 'About Right Choice',
      aboutDescription1: 'Right Choice Speech Therapy Center is a family-centered clinic committed to helping children with speech delays, autism, and other communication challenges reach their full potential. Located in Addis Ababa, Ethiopia, we proudly serve our community through two branches—one in Salitemihret and the other in Bole.',
      aboutDescription2: 'We offer in-person, evidence-based speech therapy tailored to the unique strengths, needs, and cultural background of every child and family we work with.',
      mission: 'Mission',
      missionText: 'To provide high-quality, culturally responsive, and family-centered speech therapy services that empower children and their families to overcome communication challenges and thrive in everyday life.',
      vision: 'Vision',
      visionText: 'To become the most trusted and accessible speech therapy center in Ethiopia—transforming lives by unlocking each child\'s communication potential and guiding families through every stage of their journey.',
      values: 'Values',
      compassionEmpathy: 'Compassion & Empathy',
      childCenteredCare: 'Child-Centered Care',
      excellenceInnovation: 'Excellence & Innovation',
      culturalSensitivity: 'Cultural Sensitivity',
      
      // Services
      servicesTitle: 'Our Services',
      servicesSubtitle: 'We provide comprehensive, evidence-based speech and language services tailored to each child\'s unique needs with culturally responsive and family-centered care.',
      speechLanguageTherapy: 'Speech & Language Therapy',
      speechDelayTherapy: 'Speech Delay Therapy with personalized treatment plans',
      speechDelayTherapyDesc: 'Speech Delay Therapy with personalized treatment plans',
      stutteringVoiceDisorders: 'Stuttering, voice disorders, and speech sound disorders',
      stutteringVoiceDisordersDesc: 'Stuttering, voice disorders, and speech sound disorders',
      literacyReadingSupport: 'Literacy & Reading Support through phonological awareness',
      literacyReadingSupportDesc: 'Literacy & Reading Support through phonological awareness',
      aacSupport: 'Augmentative & Alternative Communication (AAC)',
      aacSupportDesc: 'Augmentative & Alternative Communication (AAC)',
      
      behavioralSocialSkills: 'Behavioral & Social Skills',
      abaTherapy: 'ABA Therapy for Autism Spectrum Disorder',
      abaTherapyDesc: 'ABA Therapy for Autism Spectrum Disorder',
      socialSkillsTraining: 'Social Skills Training for peer interaction',
      socialSkillsTrainingDesc: 'Social Skills Training for peer interaction',
      emotionalRegulation: 'Emotional regulation and adaptive behaviors',
      emotionalRegulationDesc: 'Emotional regulation and adaptive behaviors',
      communicationSupport: 'Communication and social interaction support',
      communicationSupportDesc: 'Communication and social interaction support',
      
      ageSpecificPrograms: 'Age-Specific Programs',
      toddlers: 'Toddlers (2-3 years)',
      toddlersDesc: 'Play-based interventions to develop foundational speech and language skills',
      preschool: 'Preschool (4-5 years)',
      preschoolDesc: 'Focus on expanding vocabulary, sentence structure, and social communication',
      elementary: 'Elementary (6-12 years)',
      elementaryDesc: 'Addressing complex language, articulation, and literacy skills',
      
      multilingualSupport: 'Multilingual Support',
      multilingualSupportDesc: 'We provide culturally sensitive services in multiple languages:',
      
      // Appointment Form
      bookYourAppointment: 'Book Your Appointment',
      appointmentSubtitle: 'Take the first step towards better communication for your child',
      parentName: 'Parent Name',
      childName: 'Child\'s Name',
      childAge: 'Child\'s Age',
      selectAge: 'Select age',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      selectTime: 'Select time',
      contactNumber: 'Contact Number',
      emailAddress: 'Email Address',
      additionalNotes: 'Additional Notes',
      additionalNotesPlaceholder: 'Please share any concerns or specific needs...',
      scheduleAppointment: 'Schedule Appointment',
      
      // News
      latestNews: 'Latest Blogs & Updates',
      newsSubtitle: 'Stay updated with our success stories and community impact',
      monthlyImpactReport: 'Monthly Impact Report',
      childrenServed: 'Children Served:',
      successRate: 'Success Rate:',
      newFamilies: 'New Families:',
      upcomingEvents: 'Upcoming Events',
      parentWorkshop: 'Parent Workshop - Dec 15',
      openHouse: 'Open House - Dec 22',
      communityScreening: 'Community Screening - Jan 5',
      recentAchievement: 'Recent Achievement',
      achievementDesc: 'We\'re proud to announce our recognition as "Outstanding Community Health Provider" by the Ethiopian Ministry of Health.',
      
      // Resources
      resourcesTitle: 'Resources for Families',
      resourcesSubtitle: 'Educational materials, guides, and tools to support your child\'s development',
      educationalArticles: 'Educational Articles',
      speechMilestones: 'Speech Development Milestones',
      speechMilestonesDesc: 'Understanding what to expect at each age',
      supportingAtHome: 'Supporting Speech at Home',
      supportingAtHomeDesc: 'Daily activities to encourage communication',
      understandingAutism: 'Understanding Autism & Communication',
      understandingAutismDesc: 'A parent\'s guide to autism spectrum disorders',
      downloadableResources: 'Downloadable Resources',
      homeExerciseGuide: 'Home Exercise Guide',
      communicationTracker: 'Communication Tracker',
      parentHandbook: 'Parent Handbook',
      
      faq: 'Frequently Asked Questions',
      faqQuestion1: 'What age children do you work with?',
      faqAnswer1: 'We specialize in children aged 2-12 years, with programs tailored for different developmental stages.',
      faqQuestion2: 'How long does therapy typically take?',
      faqAnswer2: 'Duration varies by individual needs, but most children see significant progress within 3-6 months of consistent therapy.',
      faqQuestion3: 'Do you accept insurance?',
      faqAnswer3: 'We work with families to make services affordable and can discuss payment options during consultation.',
      faqQuestion4: 'Can parents participate in sessions?',
      faqAnswer4: 'Absolutely! We encourage parent involvement and provide training to help extend learning at home.',
      
      // Footer
      footerDescription: 'Empowering communication, one word at a time. We\'re dedicated to helping children reach their full potential through compassionate, culturally-sensitive speech therapy.',
      socialMedia: 'Follow Us',
      socialMediaLinks: {
        facebook: 'https://www.facebook.com/rightchoicespeechtherapy',
        twitter: 'https://twitter.com/rightchoicespeech',
        instagram: 'https://www.instagram.com/rightchoicespeechtherapy',
        linkedin: 'https://www.linkedin.com/company/rightchoicespeechtherapy',
      },
      ourLocations: 'Our Locations',
      salitemihretBranch: 'Salitemihret Branch',
      salitemihretLocation: 'Near Salitemihret School',
      boleBranch: 'Bole Branch',
      boleLocation: 'Bole Sub-City',
      contactInfo: 'Contact Info',
      workingHours: 'Mon-Sat: 8AM-5PM',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
      copyright: '2024 Right Choice Speech Therapy Center. All rights reserved.',
      
      // Form validation
      thankYouMessage: 'Thank you! We will contact you soon to confirm your appointment.',
      
      // Time options
      time8am: '8:00 AM',
      time9am: '9:00 AM',
      time10am: '10:00 AM',
      time11am: '11:00 AM',
      time1pm: '1:00 PM',
      time2pm: '2:00 PM',
      time3pm: '3:00 PM',
      time4pm: '4:00 PM',
      
      // Age options
      years: 'years',
    },
    
    am: {
      // Header
      home: 'እንኳን ደህና መጡ',
      about: 'ስለ እኛ',
      services: 'አገልግሎቶች',
      appointment: 'ቀጠሮ',
      news: 'ብሎግ',
      resources: 'ግብዓቶች',
      contactUs: 'እኛን ለማግኘት',
      
      // Hero Section
      heroHeadline: 'ግንኙነትን ማጠናከር፣',
      heroSubheadline: 'አንድ ቃል በአንድ ጊዜ',
      heroDescription: 'ወደ ራይት ቾይስ የልጆች የንግግር ሕክምና ማዕከል እንኳን በደህና መጡ። ከ2 እስከ 12 አመት ለሆኑ ህጻናት ግላዊነትን የተላበሰ፣ በማስረጃ ላይ የተመሰረተ የንግግር እና ቋንቋ አገልግሎቶችን ለመስጠት ቆርጠን ተነስተናል። የኛ የተመሰከረላቸው ቴራፒስቶች ቡድን የልጅዎን ልዩ የግንኙነት ጉዞ ለመደገፍ የፈጠራ ቴክኒኮችን ከርህራሄ እና ቤተሰብን ያማከለ እንክብካቤ ያጣምራል። በ ራይት ቾይስ የልጆች የንግግር ሕክምና ማዕከል፣ ልጅዎ ድምጹን እንዲያገኝ እና በእያንዳንዱ ደረጃ በራስ መተማመንን እንዲገነቡ እናግዛለን።',
      bookAppointment: 'ቀጠሮ ይያዙ',
      ourServices: 'አገልግሎቶቻችን',
      
      // Stats
      childrenHelped: 'የተረዱ ልጆች',
      
      // Why Choose Us
      whyChooseUs: 'ለምን እኛን ይመርጡ',
      whyChooseUsSubtitle: 'እያንዳንዱን ልጅ ማብቃት። እያንዳንዱን ቤተሰብ መደገፍ።',
      experiencedTherapists: 'ልምድ ያላቸው ሐኪሞች',
      experiencedTherapistsDesc: 'ስለ እያንዳንዱ ልጅ እድገት ፍቅር ያላቸው የተፈቀደላቸው ባለሙያዎች',
      familyCenteredCare: 'በቤተሰብ ላይ ያተኮረ እንክብካቤ',
      familyCenteredCareDesc: 'ዘላቂ ስኬት ለማምጣት ከወላጆች ጋር እጅ በእጅ መስራት',
      culturallySensitive: 'ባህላዊ ስሜት ያለው',
      culturallySensitiveDesc: 'የኢትዮጵያን የተለያዩ ቋንቋዎች እና ወጎች ማክበር',
      affordableServices: 'ተመጣጣኝ አገልግሎቶች',
      affordableServicesDesc: 'ያለ ገንዘብ እንቅፋት ጥራት ያለው ሕክምና',
      
      // Testimonials
      hearFromFamilies: 'ከቤተሰቦቻችን ይስሙ',
      testimonial1: '"በሳምንታት ውስጥ እውነተኛ እድገት አይተናል። በራይት ቾይስ ያለው ቡድን በእውነት ስለ ልጃችን ይጨነቃል።"',
      testimonial1Author: '- ሳራ ም.',
      testimonial2: '"ሙያዊ፣ ደግ እና ውጤታማ — ልጄ ለመጀመሪያ ጊዜ \'እናት\' እንዲል ረዱት።"',
      testimonial2Author: '- ዳንኤል ተ.',
      
      // About Section
      aboutRightChoice: 'ስለ ራይት ቾይስ',
      aboutDescription1: 'ራይት ቾይስ የንግግር ሕክምና ማዕከል የንግግር መዘግየት፣ አውቲዝም እና ሌሎች የግንኙነት ችግሮች ያላቸው ልጆች ሙሉ አቅማቸውን እንዲደርሱ ለመርዳት የተቆረጠ በቤተሰብ ላይ ያተኮረ ክሊኒክ ነው። በአዲስ አበባ፣ ኢትዮጵያ የሚገኝ ሲሆን በሁለት ቅርንጫፎች - አንዱ በሳሊተሚህረት እና ሌላው በቦሌ - ማህበረሰባችንን በኩራት እናገለግላለን።',
      aboutDescription2: 'ከእያንዳንዱ ልጅ እና ቤተሰብ ልዩ ጥንካሬዎች፣ ፍላጎቶች እና ባህላዊ ዳራ ጋር የተጣጣመ በማስረጃ ላይ የተመሰረተ የንግግር ሕክምና እንሰጣለን።',
      mission: 'ተልእኮ',
      missionText: 'ልጆች እና ቤተሰቦቻቸው የግንኙነት ችግሮችን እንዲያሸንፉ እና በዕለት ተዕለት ሕይወት ውስጥ እንዲበለጽጉ የሚያስችል የሚያስችል ከፍተኛ ጥራት ያለው፣ ባህላዊ ምላሽ ሰጪ እና በቤተሰብ ላይ ያተኮረ የንግግር ሕክምና አገልግሎት መስጠት።',
      vision: 'ራዕይ',
      visionText: 'በኢትዮጵያ ውስጥ በጣም የታመነ እና ተደራሽ የንግግር ሕክምና ማዕከል መሆን - የእያንዳንዱን ልጅ የግንኙነት አቅም በመክፈት እና ቤተሰቦችን በእያንዳንዱ የጉዞ ደረጃ በመምራት ሕይወትን መለወጥ።',
      values: 'እሴቶች',
      compassionEmpathy: 'ርኅራኄ እና ተሳትፎ',
      childCenteredCare: 'በልጅ ላይ ያተኮረ እንክብካቤ',
      excellenceInnovation: 'ብልጽግና እና ፈጠራ',
      culturalSensitivity: 'ባህላዊ ስሜት',
      
      // Services
      servicesTitle: 'አገልግሎቶቻችን',
      servicesSubtitle: 'ባህላዊ ምላሽ ሰጪ እና በቤተሰብ ላይ ያተኮረ እንክብካቤ ከእያንዳንዱ ልጅ ልዩ ፍላጎቶች ጋር የተጣጣመ አጠቃላይ፣ በማስረጃ ላይ የተመሰረተ የንግግር እና ቋንቋ አገልግሎቶችን እንሰጣለን።',
      speechLanguageTherapy: 'የንግግር እና ቋንቋ ሕክምና',
      speechDelayTherapy: 'ግላዊ የሕክምና እቅዶች ያለው የንግግር መዘግየት ሕክምና',
      speechDelayTherapyDesc: 'ግላዊ የሕክምና እቅዶች ያለው የንግግር መዘግየት ሕክምና',
      stutteringVoiceDisorders: 'መናገር፣ የድምጽ መታወክ እና የንግግር ድምጽ መታወክ',
      stutteringVoiceDisordersDesc: 'መናገር፣ የድምጽ መታወክ እና የንግግር ድምጽ መታወክ',
      literacyReadingSupport: 'በፎኖሎጂካል ግንዛቤ የማንበብ እና ጽሑፍ ድጋፍ',
      literacyReadingSupportDesc: 'በፎኖሎጂካል ግንዛቤ የማንበብ እና ጽሑፍ ድጋፍ',
      aacSupport: 'ተጨማሪ እና አማራጭ ግንኙነት (AAC)',
      aacSupportDesc: 'ተጨማሪ እና አማራጭ ግንኙነት (AAC)',
      
      behavioralSocialSkills: 'ባህሪያዊ እና ማህበራዊ ክህሎቶች',
      abaTherapy: 'ለአውቲዝም ስፔክትረም መታወክ ABA ሕክምና',
      abaTherapyDesc: 'ለአውቲዝም ስፔክትረም መታወክ ABA ሕክምና',
      socialSkillsTraining: 'ለእኩዮች መስተጋብር ማህበራዊ ክህሎት ስልጠና',
      socialSkillsTrainingDesc: 'ለእኩዮች መስተጋብር ማህበራዊ ክህሎት ስልጠና',
      emotionalRegulation: 'ስሜታዊ ቁጥጥር እና መላመድ ባህሪያት',
      emotionalRegulationDesc: 'ስሜታዊ ቁጥጥር እና መላመድ ባህሪያት',
      communicationSupport: 'የግንኙነት እና ማህበራዊ መስተጋብር ድጋፍ',
      communicationSupportDesc: 'የግንኙነት እና ማህበራዊ መስተጋብር ድጋፍ',
      
      ageSpecificPrograms: 'በዕድመ ላይ የተመሰረቱ ፕሮግራሞች',
      toddlers: 'ትናንሽ ልጆች (2-3 ዓመት)',
      toddlersDesc: 'መሰረታዊ የንግግር እና ቋንቋ ክህሎቶችን ለማዳበር በጨዋታ ላይ የተመሰረቱ ጣልቃ ገብነቶች',
      preschool: 'ቅድመ ትምህርት (4-5 ዓመት)',
      preschoolDesc: 'የቃላት ዝርዝር፣ የዓረፍተ ነገር አወቃቀር እና ማህበራዊ ግንኙነት ማስፋት ላይ ትኩረት',
      elementary: 'የመጀመሪያ ደረጃ (6-12 ዓመት)',
      elementaryDesc: 'ውስብስብ ቋንቋ፣ አነጋገር እና የማንበብ ክህሎቶችን መፍታት',
      
      multilingualSupport: 'ባለብዙ ቋንቋ ድጋፍ',
      multilingualSupportDesc: 'በብዙ ቋንቋዎች ባህላዊ ስሜት ያላቸው አገልግሎቶችን እንሰጣለን፡',
      
      // Appointment Form
      bookYourAppointment: 'ቀጠሮዎን ይያዙ',
      appointmentSubtitle: 'ለልጅዎ የተሻለ ግንኙነት ወደ መጀመሪያው እርምጃ ይውሰዱ',
      parentName: 'የወላጅ ስም',
      childName: 'የልጁ ስም',
      childAge: 'የልጁ ዕድሜ',
      selectAge: 'ዕድሜ ይምረጡ',
      preferredDate: 'የሚመረጥ ቀን',
      preferredTime: 'የሚመረጥ ሰዓት',
      selectTime: 'ሰዓት ይምረጡ',
      contactNumber: 'የመገናኛ ቁጥር',
      emailAddress: 'የኢሜይል አድራሻ',
      additionalNotes: 'ተጨማሪ ማስታወሻዎች',
      additionalNotesPlaceholder: 'እባክዎ ማንኛውንም ጭንቀት ወይም ልዩ ፍላጎቶች ያካፍሉ...',
      scheduleAppointment: 'ቀጠሮ ያስይዙ',
      
      // News
      latestNews: 'የቅርብ ጊዜ ብሎጎችና እና ዝማኔዎች',
      newsSubtitle: 'ከስኬት ታሪኮቻችን እና የማህበረሰብ ተፅእኖ ጋር ዝማኔ ይሁኑ',
      monthlyImpactReport: 'ወርሃዊ የተፅእኖ ሪፖርት',
      childrenServed: 'የተገለገሉ ልጆች፡',
      successRate: 'የስኬት መጠን፡',
      newFamilies: 'አዳዲስ ቤተሰቦች፡',
      upcomingEvents: 'የሚመጡ ዝግጅቶች',
      parentWorkshop: 'የወላጆች ወርክሾፕ - ታህሳስ 15',
      openHouse: 'ክፍት ቤት - ታህሳስ 22',
      communityScreening: 'የማህበረሰብ ምርመራ - ጥር 5',
      recentAchievement: 'የቅርብ ጊዜ ስኬት',
      achievementDesc: 'በኢትዮጵያ ጤና ሚኒስቴር "ድንቅ የማህበረሰብ ጤና አቅራቢ" ተብለን በመታወቃችን እንኮራለን።',
      
      // Resources
      resourcesTitle: 'ለቤተሰቦች ግብዓቶች',
      resourcesSubtitle: 'የልጅዎን እድገት ለመደገፍ የትምህርት ቁሳቁሶች፣ መመሪያዎች እና መሳሪያዎች',
      educationalArticles: 'የትምህርት ጽሑፎች',
      speechMilestones: 'የንግግር እድገት ምዕራፎች',
      speechMilestonesDesc: 'በእያንዳንዱ ዕድሜ ምን መጠበቅ እንዳለብዎ መረዳት',
      supportingAtHome: 'በቤት ንግግርን መደገፍ',
      supportingAtHomeDesc: 'ግንኙነትን ለማበረታታት የዕለት ተዕለት እንቅስቃሴዎች',
      understandingAutism: 'አውቲዝምን እና ግንኙነትን መረዳት',
      understandingAutismDesc: 'ለወላጆች የአውቲዝም ስፔክትረም መታወክ መመሪያ',
      downloadableResources: 'ሊወርዱ የሚችሉ ግብዓቶች',
      homeExerciseGuide: 'የቤት ልምምድ መመሪያ',
      communicationTracker: 'የግንኙነት መከታተያ',
      parentHandbook: 'የወላጆች መመሪያ',
      
      faq: 'በተደጋጋሚ የሚጠየቁ ጥያቄዎች',
      faqQuestion1: 'ከስንት ዓመት ልጆች ጋር ትሰራላችሁ?',
      faqAnswer1: 'እኛ ከ2-12 ዓመት ልጆች ጋር እንሰራለን፣ ለተለያዩ የእድገት ደረጃዎች የተዘጋጁ ፕሮግራሞች አሉን።',
      faqQuestion2: 'ሕክምናው በተለምዶ ምን ያህል ጊዜ ይወስዳል?',
      faqAnswer2: 'ቆይታው በግለሰብ ፍላጎቶች ይለያያል፣ ነገር ግን አብዛኛዎቹ ልጆች በ3-6 ወራት ቀጣይነት ያለው ሕክምና ውስጥ ጉልህ እድገት ያያሉ።',
      faqQuestion3: 'ኢንሹራንስ ትቀበላላችሁ?',
      faqAnswer3: 'አገልግሎቶችን ተመጣጣኝ ለማድረግ ከቤተሰቦች ጋር እንሰራለን እና በምክክር ወቅት የክፍያ አማራጮችን መወያየት እንችላለን።',
      faqQuestion4: 'ወላጆች በክፍለ ጊዜዎች ውስጥ መሳተፍ ይችላሉ?',
      faqAnswer4: 'በፍጹም! የወላጆች ተሳትፎን እናበረታታለን እና ትምህርትን በቤት ለማራዘም የሚረዳ ስልጠና እንሰጣለን።',
      
      // Footer
      footerDescription: 'ግንኙነትን በርኅራኄ፣ ባህላዊ-ስሜት ያለው የንግግር ሕክምና ሙሉ አቅማቸውን እንዲደርሱ ለመርዳት ቆርጠናል።',
      socialMedia: 'ይከተሉን',
      socialMediaLinks: {
        facebook: 'https://www.facebook.com/rightchoicespeechtherapyamharic',
        twitter: 'https://twitter.com/rightchoicespeechamharic',
        instagram: 'https://www.instagram.com/rightchoicespeechtherapyamharic',
        linkedin: 'https://www.linkedin.com/company/rightchoicespeechtherapyamharic',
      },
      ourLocations: 'የእኛ አካባቢዎች',
      salitemihretBranch: 'ሳሊተሚህረት ቅርንጫፍ',
      salitemihretLocation: 'ከሳሊተሚህረት ትምህርት ቤት አጠገብ',
      boleBranch: 'ቦሌ ቅርንጫፍ',
      boleLocation: 'ቦሌ ክፍለ ከተማ',
      contactInfo: 'የመገናኛ መረጃ',
      workingHours: 'ሰኞ-ቅዳሜ፡ ከ8፡00 ጠዋት - 5፡00 ከሰዓት',
      privacyPolicy: 'የግላዊነት ፖሊሲ',
      termsOfService: 'የአገልግሎት ውሎች',
      contact: 'ያግኙን',
      copyright: '2024 ራይት ቾይስ የንግግር ሕክምና ማዕከል። ሁሉም መብቶች የተጠበቁ ናቸው።',
      
      // Form validation
      thankYouMessage: 'አመሰግናለሁ! ቀጠሮዎን ለማረጋገጥ በቅርቡ እናገኝዎታለን።',
      
      // Time options
      time8am: '8፡00 ጠዋት',
      time9am: '9፡00 ጠዋት',
      time10am: '10፡00 ጠዋት',
      time11am: '11፡00 ጠዋት',
      time1pm: '1፡00 ከሰዓት',
      time2pm: '2፡00 ከሰዓት',
      time3pm: '3፡00 ከሰዓት',
      time4pm: '4፡00 ከሰዓት',
      
      // Age options
      years: 'ዓመት',
    }
  };