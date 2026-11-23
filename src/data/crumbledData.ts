export type Language = 'ar' | 'en';
export type PageKey = 'home' | 'products' | 'gallery' | 'contact';
export type GalleryCategory = 'all' | 'cakes' | 'sweets';
export type CustomServiceKey = 'inscription' | 'custom-3d' | 'catering';

export interface RealPhoto {
  id: string;
  url: string;
  galleryCategory: 'cakes' | 'sweets';
  titleAr: string;
  titleEn: string;
  captionAr: string;
  captionEn: string;
  altAr: string;
  altEn: string;
  featured?: boolean;
}

export interface ProductItem {
  id: string;
  category: 'signature' | 'bespoke';
  nameAr: string;
  nameEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  photoUrl?: string;
  photoAltAr?: string;
  photoAltEn?: string;
}

export interface FaqItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export const VERIFIED_INFO = {
  brandAr: 'كرمبلد',
  brandEn: 'Crumbled',
  brandFull: 'Crumbled | كرمبلد',
  tagline: 'Mouthful & Delightful',
  addressEn: 'Prince Turki Road, Al Mohammadiyyah, Riyadh 12364, Saudi Arabia',
  addressAr: 'طريق الأمير تركي، حي المحمدية، الرياض 12364، المملكة العربية السعودية',
  googleRating: '4.6',
  deliveryApps: ['The Chefz', 'Jahez', 'Hungerstation'] as const,
} as const;

export const VERIFIED_LINKS = {
  instagram: 'https://www.instagram.com/crumbledsa/',
  orderHub: 'https://linktr.ee/crumbledsa',
  googleMapsSearch: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    VERIFIED_INFO.addressEn,
  )}`,
} as const;

export const REAL_PHOTOS: RealPhoto[] = [
  {
    id: 'cloud-cake',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Df-UeEXIHeb/media/?size=l&output=jpg',
    galleryCategory: 'cakes',
    titleAr: 'Cloud Cake',
    titleEn: 'Cloud Cake',
    captionAr: 'مزيج براوني البندق والفانيليا',
    captionEn: 'Hazelnut brownie and vanilla blend',
    altAr: 'صورة Cloud Cake من كرمبلد الرياض — مزيج براوني البندق والفانيليا',
    altEn: 'Cloud Cake by Crumbled Riyadh — hazelnut brownie and vanilla blend',
    featured: true,
  },
  {
    id: 'chocolate-cake',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Df-Ucl1o4ku/media/?size=l&output=jpg',
    galleryCategory: 'cakes',
    titleAr: 'كيك الشوكولاتة',
    titleEn: 'Chocolate Cake',
    captionAr: 'كيك الشوكولاتة من Crumbled',
    captionEn: 'Signature Chocolate Cake by Crumbled',
    altAr: 'صورة كيك الشوكولاتة من كرمبلد الرياض',
    altEn: 'Chocolate Cake by Crumbled Riyadh',
  },
  {
    id: 'choux-damour',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Dfre2BsI4Yc/media/?size=l&output=jpg',
    galleryCategory: 'sweets',
    titleAr: "صينية Choux d'Amour",
    titleEn: "Choux d'Amour Tray",
    captionAr: "تقديم صينية Choux d'Amour",
    captionEn: "Choux d'Amour presentation tray",
    altAr: "صورة صينية Choux d'Amour من كرمبلد الرياض",
    altEn: "Choux d'Amour tray by Crumbled Riyadh",
  },
  {
    id: 'caramel-pour',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Dfreuvgos3G/media/?size=l&output=jpg',
    galleryCategory: 'sweets',
    titleAr: 'سكب الكراميل',
    titleEn: 'Caramel Pour',
    captionAr: 'حلويات Crumbled بلمسة الكراميل',
    captionEn: 'Crumbled Sweets with caramel pour',
    altAr: 'صورة سكب الكراميل على حلويات كرمبلد الرياض',
    altEn: 'Caramel pour on Crumbled Sweets in Riyadh',
  },
  {
    id: 'dates-warmer',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/DfrerEio1Vm/media/?size=l&output=jpg',
    galleryCategory: 'sweets',
    titleAr: 'Crumbled Dates Warmer',
    titleEn: 'Crumbled Dates Warmer',
    captionAr: 'Crumbled Dates Warmer',
    captionEn: 'Crumbled Dates Warmer',
    altAr: 'صورة Crumbled Dates Warmer من كرمبلد الرياض',
    altEn: 'Crumbled Dates Warmer by Crumbled Riyadh',
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'cloud-cake',
    category: 'signature',
    nameAr: 'Cloud Cake',
    nameEn: 'Cloud Cake',
    subtitleAr: 'مزيج براوني البندق والفانيليا',
    subtitleEn: 'Hazelnut brownie and vanilla blend',
    photoUrl: REAL_PHOTOS[0].url,
    photoAltAr: REAL_PHOTOS[0].altAr,
    photoAltEn: REAL_PHOTOS[0].altEn,
  },
  {
    id: 'chocolate-cake',
    category: 'signature',
    nameAr: 'كيك الشوكولاتة',
    nameEn: 'Chocolate Cake',
    subtitleAr: 'كيك الشوكولاتة الخاص بـ Crumbled',
    subtitleEn: 'Crumbled signature chocolate cake',
    photoUrl: REAL_PHOTOS[1].url,
    photoAltAr: REAL_PHOTOS[1].altAr,
    photoAltEn: REAL_PHOTOS[1].altEn,
  },
  {
    id: 'choux-damour',
    category: 'signature',
    nameAr: "Choux d'Amour",
    nameEn: "Choux d'Amour",
    subtitleAr: "صينية Choux d'Amour للضيافة والمناسبات",
    subtitleEn: "Choux d'Amour tray for gatherings",
    photoUrl: REAL_PHOTOS[2].url,
    photoAltAr: REAL_PHOTOS[2].altAr,
    photoAltEn: REAL_PHOTOS[2].altEn,
  },
  {
    id: 'dates-warmer',
    category: 'signature',
    nameAr: 'Crumbled Dates Warmer',
    nameEn: 'Crumbled Dates Warmer',
    subtitleAr: 'حلى التمر الدافئ من Crumbled',
    subtitleEn: 'Warm date dessert by Crumbled',
    photoUrl: REAL_PHOTOS[4].url,
    photoAltAr: REAL_PHOTOS[4].altAr,
    photoAltEn: REAL_PHOTOS[4].altEn,
  },
  {
    id: 'crumbled-sweets',
    category: 'signature',
    nameAr: 'حلويات Crumbled',
    nameEn: 'Crumbled Sweets',
    subtitleAr: 'تشكيلة حلويات Crumbled المميزة',
    subtitleEn: 'Curated Crumbled sweets selection',
    photoUrl: REAL_PHOTOS[3].url,
    photoAltAr: REAL_PHOTOS[3].altAr,
    photoAltEn: REAL_PHOTOS[3].altEn,
  },
  {
    id: 'custom-3d-cakes',
    category: 'bespoke',
    nameAr: 'كيك مخصص وكيك ثلاثي الأبعاد',
    nameEn: 'Custom & 3D Cakes',
    subtitleAr: 'تنفيذ كيك مخصص وثلاثي الأبعاد لمناسباتكم عبر التواصل المباشر',
    subtitleEn: 'Bespoke and 3D sculpted cakes prepared upon direct request',
  },
  {
    id: 'catering',
    category: 'bespoke',
    nameAr: 'ضيافة (Catering)',
    nameEn: 'Catering',
    subtitleAr: 'تجهيز وتنسيق ضيافة الحلويات للمناسبات والاجتماعات',
    subtitleEn: 'Dessert catering tailored for events and gatherings',
  },
  {
    id: 'cake-inscription',
    category: 'bespoke',
    nameAr: 'كتابة على الكيك حسب الطلب',
    nameEn: 'Custom Cake Inscription',
    subtitleAr: 'إضافة عبارة مخصصة على الكيك حسب اختياركم',
    subtitleEn: 'Personalized wording written on your cake',
  },
];

export const CUSTOM_SERVICES: {
  key: CustomServiceKey;
  labelAr: string;
  labelEn: string;
}[] = [
  {
    key: 'inscription',
    labelAr: 'كتابة على الكيك حسب الطلب',
    labelEn: 'Custom Cake Inscription',
  },
  {
    key: 'custom-3d',
    labelAr: 'كيك مخصص وكيك ثلاثي الأبعاد',
    labelEn: 'Custom & 3D Cakes',
  },
  {
    key: 'catering',
    labelAr: 'ضيافة (Catering)',
    labelEn: 'Catering',
  },
];

export const VERIFIED_FAQS: FaqItem[] = [
  {
    id: 'inscription',
    questionAr: 'هل تتوفر خدمة الكتابة على الكيك؟',
    questionEn: 'Do you offer custom cake inscriptions?',
    answerAr: 'نعم، تتوفر الكتابة على الكيك حسب الطلب عبر رسائل إنستغرام.',
    answerEn: 'Yes, custom cake inscriptions are available via Instagram DM.',
  },
  {
    id: 'cloud-cake',
    questionAr: 'ما هو Cloud Cake؟',
    questionEn: 'What is Cloud Cake?',
    answerAr: 'Cloud Cake هو مزيج براوني البندق والفانيليا.',
    answerEn: 'Cloud Cake is a hazelnut brownie and vanilla blend.',
  },
  {
    id: 'delivery-apps',
    questionAr: 'ما هي تطبيقات التوصيل المتوفرة؟',
    questionEn: 'Which delivery apps are available?',
    answerAr: 'تتوفر طلباتنا عبر التطبيقات: The Chefz وJahez وHungerstation.',
    answerEn:
      'Available through delivery apps: The Chefz, Jahez, and Hungerstation.',
  },
  {
    id: 'location',
    questionAr: 'أين يقع محل Crumbled في الرياض؟',
    questionEn: 'Where is Crumbled located in Riyadh?',
    answerAr:
      'طريق الأمير تركي، حي المحمدية، الرياض 12364، المملكة العربية السعودية (Prince Turki Road, Al Mohammadiyyah, Riyadh 12364, Saudi Arabia).',
    answerEn: 'Prince Turki Road, Al Mohammadiyyah, Riyadh 12364, Saudi Arabia.',
  },
];

export const COPY = {
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      gallery: 'المعرض',
      contact: 'التواصل وزيارتنا',
    },
    actions: {
      orderHub: 'مركز الطلب',
      instagramDm: 'رسائل إنستغرام',
      viewProducts: 'تصفح المنتجات',
      viewGallery: 'عرض المعرض الكامل',
      visitUs: 'التواصل وزيارتنا',
      copyAddress: 'نسخ العنوان',
      addressCopied: 'تم النسخ',
      openGoogleMaps: 'فتح الموقع على خرائط Google',
      directions: 'الاتجاهات',
      copyMessage: 'نسخ الرسالة',
      messageCopied: 'تم النسخ',
      clearSearch: 'مسح البحث',
      resetFilters: 'إعادة عرض الكل',
      switchToOtherLang: 'EN',
      switchLangAria: 'Switch language to English',
      toggleDarkAria: 'التبديل إلى الوضع الداكن',
      toggleLightAria: 'التبديل إلى الوضع الفاتح',
      openMenuAria: 'فتح القائمة',
      closeMenuAria: 'إغلاق القائمة',
      closeLightboxAria: 'إغلاق الصورة',
      prevPhotoAria: 'الصورة السابقة',
      nextPhotoAria: 'الصورة التالية',
      zoomPhotoAria: 'تكبير الصورة',
      selectHeroPhotoAria: 'معاينة الصورة',
    },
    home: {
      heroLine: 'Cloud Cake وكيك المناسبات والكتابة على الكيك حسب الطلب',
      heroAddressShort: 'طريق الأمير تركي، المحمدية، الرياض',
      serviceZones: {
        cloudCake: 'Cloud Cake',
        inscription: 'كتابة على الكيك',
        catering: 'ضيافة ومناسبات',
      },
      productsTitle: 'تشكيلة المنتجات والخدمات',
      productsSubtitle: 'أصناف مختارة، كيك مخصص وثلاثي الأبعاد، وضيافة للمناسبات.',
      bespokeHeading: 'الطلبات الخاصة والضيافة',
      howToOrderTitle: 'كيف تطلب من Crumbled',
      howToOrderSubtitle: 'مسارات الطلب والزيارة المعتمدة في الرياض.',
      howToOrderSteps: {
        orderHubTitle: 'مركز الطلب',
        orderHubDesc: 'الوصول المباشر إلى خيارات الطلب.',
        instagramTitle: 'رسائل إنستغرام',
        instagramDesc:
          'للطلبات المخصصة، الكيك ثلاثي الأبعاد، الكتابة على الكيك، والضيافة.',
        deliveryTitle: 'تطبيقات التوصيل',
        deliveryDesc: 'متوفر عبر التطبيقات:',
        visitTitle: 'زيارة الفرع',
        visitDesc: 'طريق الأمير تركي، حي المحمدية، الرياض 12364.',
      },
      faqTitle: 'أسئلة شائعة',
      faqSubtitle: 'إجابات موجزة من المعلومات الموثقة.',
      visitHeading: 'زورونا',
      ratingText: '4.6 على خرائط Google',
      deliveryHeading: 'متوفر عبر تطبيقات التوصيل',
    },
    products: {
      title: 'المنتجات',
      subtitle: 'تشكيلة الكيك والحلويات والطلبات الخاصة والضيافة.',
      filterAll: 'الكل',
      filterSignature: 'الحلويات والكيك',
      filterBespoke: 'الطلبات الخاصة والضيافة',
      searchPlaceholder: 'ابحث باسم الصنف أو الخدمة بالعربية أو الإنجليزية...',
      searchLabel: 'البحث في المنتجات والخدمات',
      resultsCount: (count: number) =>
        count === 1 ? 'نتيجة واحدة' : `${count} نتائج`,
      noResultsTitle: 'لا توجد نتائج مطابقة',
      noResultsDesc: 'جرّب كلمة بحث أخرى أو أعِد عرض جميع الأصناف.',
      deliveryNote: 'كما تتوفر طلباتنا عبر تطبيقات التوصيل:',
    },
    customComposer: {
      title: 'جهّز طلبك',
      subtitle:
        'اختر نوع الخدمة واكتب نص رسالتك، ثم انسخها وأرسلها عبر قناة التواصل الموثقة.',
      disclaimer:
        'نسخ التفاصيل لا يعني تأكيد الطلب؛ يُؤكَّد الطلب مع النشاط مباشرة عبر قناة التواصل الموثقة',
      serviceLabel: 'نوع الطلب',
      textLabel: 'نص رسالتك',
      textPlaceholder: 'اكتب العبارة أو التفاصيل التي تود إرسالها...',
      previewLabel: 'معاينة الرسالة',
      prefixService: 'نوع الطلب:',
      prefixText: 'التفاصيل:',
    },
    gallery: {
      title: 'المعرض',
      subtitle: 'مجموعة الصور الحقيقية لأصناف وتقديمات Crumbled في الرياض.',
      tapHint: 'اضغط على أي صورة لعرضها بالحجم الكامل',
      filterAll: 'الكل',
      filterCakes: 'الكيك',
      filterSweets: 'الحلويات والتقديمات',
      followPrompt: 'للمزيد من التحديثات والطلبات الخاصة عبر إنستغرام',
    },
    contact: {
      title: 'التواصل وزيارتنا',
      subtitle:
        'يسعدنا استقبال طلباتكم عبر مركز الطلب ورسائل إنستغرام، وزيارتكم في الرياض.',
      addressLabel: 'الموقع في الرياض',
      addressVerifiedLabel: 'العنوان الموثق',
      ratingLabel: 'تقييم Google Maps',
      ratingValue: '4.6 من 5',
      channelsTitle: 'قنوات الطلب والتواصل',
      instagramDesc:
        'للاستفسار عن الكيك المخصص، الكيك ثلاثي الأبعاد، والكتابة على الكيك حسب الطلب.',
      orderHubDesc: 'للوصول المباشر إلى خيارات الطلب المتاحة.',
      deliveryTitle: 'تطبيقات التوصيل',
      deliveryDesc: 'يمكنكم الطلب أيضاً عبر تطبيقات التوصيل التالية في الرياض:',
      bioLabel: 'من سيرة حساب إنستغرام',
      bioText: 'يوجد لدينا كتابة على الكيك حسب طلبكم',
      instagramAccountLabel: '@crumbledsa',
    },
    footer: {
      locationShort: 'المحمدية، الرياض',
      ratingShort: 'تقييم 4.6 على خرائط Google',
      deliveryLabel: 'تطبيقات التوصيل',
      rights: 'Crumbled | كرمبلد — الرياض',
    },
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      gallery: 'Gallery',
      contact: 'Contact & Visit',
    },
    actions: {
      orderHub: 'Order Hub',
      instagramDm: 'Instagram DM',
      viewProducts: 'Explore Products',
      viewGallery: 'View Full Gallery',
      visitUs: 'Contact & Visit',
      copyAddress: 'Copy Address',
      addressCopied: 'Copied',
      openGoogleMaps: 'Open on Google Maps',
      directions: 'Directions',
      copyMessage: 'Copy Message',
      messageCopied: 'Copied',
      clearSearch: 'Clear search',
      resetFilters: 'Show All',
      switchToOtherLang: 'ع',
      switchLangAria: 'التبديل إلى اللغة العربية',
      toggleDarkAria: 'Switch to dark mode',
      toggleLightAria: 'Switch to light mode',
      openMenuAria: 'Open menu',
      closeMenuAria: 'Close menu',
      closeLightboxAria: 'Close photo',
      prevPhotoAria: 'Previous photo',
      nextPhotoAria: 'Next photo',
      zoomPhotoAria: 'View full image',
      selectHeroPhotoAria: 'Preview photo',
    },
    home: {
      heroLine: 'Cloud Cake, occasion cakes, and custom cake inscriptions',
      heroAddressShort: 'Prince Turki Road, Al Mohammadiyyah, Riyadh',
      serviceZones: {
        cloudCake: 'Cloud Cake',
        inscription: 'Cake Inscription',
        catering: 'Catering & Occasions',
      },
      productsTitle: 'Products & Services',
      productsSubtitle:
        'Signature cakes and sweets, custom and 3D cakes, and event catering.',
      bespokeHeading: 'Bespoke Cakes & Catering',
      howToOrderTitle: 'How to Order from Crumbled',
      howToOrderSubtitle: 'Our verified ordering and visit channels in Riyadh.',
      howToOrderSteps: {
        orderHubTitle: 'Order Hub',
        orderHubDesc: 'Direct access to ordering options.',
        instagramTitle: 'Instagram DM',
        instagramDesc:
          'For custom cakes, 3D cakes, cake inscriptions, and catering.',
        deliveryTitle: 'Delivery Apps',
        deliveryDesc: 'Available on:',
        visitTitle: 'Visit the Branch',
        visitDesc: 'Prince Turki Road, Al Mohammadiyyah, Riyadh 12364.',
      },
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Concise answers from verified information.',
      visitHeading: 'Visit Us',
      ratingText: '4.6 on Google Maps',
      deliveryHeading: 'Available on delivery apps',
    },
    products: {
      title: 'Products',
      subtitle: 'Signature cakes, sweets, custom creations, and catering.',
      filterAll: 'All',
      filterSignature: 'Signature Items',
      filterBespoke: 'Custom & Catering',
      searchPlaceholder: 'Search products or services in Arabic or English...',
      searchLabel: 'Search products and services',
      resultsCount: (count: number) =>
        count === 1 ? '1 result' : `${count} results`,
      noResultsTitle: 'No matching items',
      noResultsDesc: 'Try a different keyword or reset the filters.',
      deliveryNote: 'Also available through delivery apps:',
    },
    customComposer: {
      title: 'Prepare Your Request',
      subtitle:
        'Select a service, write your message, then copy and send it via our verified contact channel.',
      disclaimer:
        'Copying details does not confirm your order; orders are confirmed directly with the business through its verified contact channel.',
      serviceLabel: 'Service Type',
      textLabel: 'Your Message',
      textPlaceholder: 'Write the inscription or note you would like to send...',
      previewLabel: 'Message Preview',
      prefixService: 'Service:',
      prefixText: 'Note:',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Real photography featuring Crumbled Riyadh creations.',
      tapHint: 'Select any photo to inspect full screen',
      filterAll: 'All',
      filterCakes: 'Cakes',
      filterSweets: 'Sweets & Presentations',
      followPrompt: 'Reach us directly on Instagram for custom orders',
    },
    contact: {
      title: 'Contact & Visit',
      subtitle:
        'Order via our Order Hub, message us on Instagram, or visit us in Al Mohammadiyyah, Riyadh.',
      addressLabel: 'Riyadh Location',
      addressVerifiedLabel: 'Verified Address',
      ratingLabel: 'Google Maps Rating',
      ratingValue: '4.6 out of 5',
      channelsTitle: 'Direct Channels',
      instagramDesc:
        'Message us for custom cakes, 3D cakes, catering, and personalized cake inscriptions.',
      orderHubDesc: 'Direct access to our ordering hub.',
      deliveryTitle: 'Delivery Apps',
      deliveryDesc: 'Also available in Riyadh on the following delivery apps:',
      bioLabel: 'From Instagram bio',
      bioText: 'Custom cake inscriptions available upon your request',
      instagramAccountLabel: '@crumbledsa',
    },
    footer: {
      locationShort: 'Al Mohammadiyyah, Riyadh',
      ratingShort: '4.6 on Google Maps',
      deliveryLabel: 'Delivery Apps',
      rights: 'Crumbled | كرمبلد — Riyadh',
    },
  },
} as const;
