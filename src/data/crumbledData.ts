export type Language = 'ar' | 'en';
export type PageKey = 'home' | 'products' | 'gallery' | 'contact';

export interface RealPhoto {
  id: string;
  url: string;
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

export const VERIFIED_LINKS = {
  instagram: 'https://www.instagram.com/crumbledsa/',
  orderHub: 'https://linktr.ee/crumbledsa',
} as const;

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

export const REAL_PHOTOS: RealPhoto[] = [
  {
    id: 'cloud-cake',
    url: 'https://images.weserv.nl/?url=www.instagram.com/p/Df-UeEXIHeb/media/?size=l&output=jpg',
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
    subtitleAr: 'يوجد لدينا كتابة على الكيك حسب طلبكم',
    subtitleEn: 'Custom inscriptions on cakes available upon your request',
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
      addressCopied: 'تم نسخ العنوان',
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
    },
    home: {
      inscriptionNote: 'يوجد لدينا كتابة على الكيك حسب طلبكم',
      photosTitle: 'لقطات من Crumbled',
      photosSubtitle: 'صور حقيقية من مطبخنا وتقديماتنا في الرياض.',
      productsTitle: 'تشكيلة المنتجات والخدمات',
      productsSubtitle: 'أصناف مختارة، كيك مخصص وثلاثي الأبعاد، وضيافة للمناسبات.',
      bespokeHeading: 'الطلبات الخاصة والضيافة',
      locationHeading: 'زيارتنا في الرياض',
      ratingText: 'تقييم 4.6 على خرائط Google',
      deliveryHeading: 'متوفر عبر تطبيقات التوصيل',
    },
    products: {
      title: 'المنتجات والخدمات',
      subtitle: 'تشكيلة Crumbled من الكيك والحلويات، الكيك المخصص وثلاثي الأبعاد، وخدمات الضيافة.',
      inscriptionHighlight: 'يوجد لدينا كتابة على الكيك حسب طلبكم',
      filterAll: 'الكل',
      filterSignature: 'الحلويات والكيك',
      filterBespoke: 'الطلبات الخاصة والضيافة',
      orderCtaTitle: 'للطلب والاستفسار',
      orderCtaText: 'اطلب مباشرة عبر مركز الطلب أو تواصل معنا عبر رسائل إنستغرام للكيك المخصص والضيافة.',
      deliveryNote: 'كما تتوفر طلباتنا عبر تطبيقات التوصيل:',
    },
    gallery: {
      title: 'المعرض',
      subtitle: 'مجموعة الصور الحقيقية لأصناف وتقديمات Crumbled في الرياض.',
      tapHint: 'اضغط على أي صورة لعرضها بالحجم الكامل',
      followPrompt: 'للمزيد من التحديثات والطلبات الخاصة عبر إنستغرام',
    },
    contact: {
      title: 'التواصل وزيارتنا',
      subtitle: 'يسعدنا استقبال طلباتكم عبر مركز الطلب ورسائل إنستغرام، وزيارتكم في الرياض.',
      addressLabel: 'الموقع في الرياض',
      addressVerifiedLabel: 'العنوان الموثق',
      ratingLabel: 'تقييم Google Maps',
      ratingValue: '4.6 من 5',
      channelsTitle: 'قنوات الطلب والتواصل',
      instagramDesc: 'للاستفسار عن الكيك المخصص، الكيك ثلاثي الأبعاد، والكتابة على الكيك حسب الطلب.',
      orderHubDesc: 'للوصول المباشر إلى خيارات الطلب المتاحة.',
      deliveryTitle: 'تطبيقات التوصيل',
      deliveryDesc: 'يمكنكم الطلب أيضاً عبر تطبيقات التوصيل التالية في الرياض:',
      inscriptionReminder: 'يوجد لدينا كتابة على الكيك حسب طلبكم',
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
      addressCopied: 'Address Copied',
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
    },
    home: {
      inscriptionNote: 'Custom cake inscriptions available upon request',
      photosTitle: 'From Crumbled Riyadh',
      photosSubtitle: 'Real photography of our signature cakes and dessert presentations.',
      productsTitle: 'Products & Services',
      productsSubtitle: 'Signature cakes and sweets, custom and 3D cakes, and event catering.',
      bespokeHeading: 'Bespoke Cakes & Catering',
      locationHeading: 'Visit Us in Riyadh',
      ratingText: '4.6 rating on Google Maps',
      deliveryHeading: 'Available on delivery apps',
    },
    products: {
      title: 'Products & Services',
      subtitle: 'Our signature cakes and sweets, custom and 3D creations, and bespoke catering.',
      inscriptionHighlight: 'Custom cake inscriptions available upon request',
      filterAll: 'All',
      filterSignature: 'Signature Items',
      filterBespoke: 'Custom & Catering',
      orderCtaTitle: 'Ordering & Custom Requests',
      orderCtaText: 'Order via our Order Hub or message us directly on Instagram for custom cakes and catering.',
      deliveryNote: 'Also available through delivery apps:',
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'Real photography featuring Crumbled Riyadh creations.',
      tapHint: 'Select any photo to inspect full screen',
      followPrompt: 'Reach us directly on Instagram for custom orders',
    },
    contact: {
      title: 'Contact & Visit',
      subtitle: 'Order via our Order Hub, message us on Instagram, or visit us in Al Mohammadiyyah, Riyadh.',
      addressLabel: 'Riyadh Location',
      addressVerifiedLabel: 'Verified Address',
      ratingLabel: 'Google Maps Rating',
      ratingValue: '4.6 out of 5',
      channelsTitle: 'Direct Channels',
      instagramDesc: 'Message us for custom cakes, 3D cakes, catering, and personalized cake inscriptions.',
      orderHubDesc: 'Direct access to our ordering hub.',
      deliveryTitle: 'Delivery Apps',
      deliveryDesc: 'Also available in Riyadh on the following delivery apps:',
      inscriptionReminder: 'Custom cake inscriptions available upon request',
    },
    footer: {
      locationShort: 'Al Mohammadiyyah, Riyadh',
      ratingShort: '4.6 on Google Maps',
      deliveryLabel: 'Delivery Apps',
      rights: 'Crumbled | كرمبلد — Riyadh',
    },
  },
} as const;
