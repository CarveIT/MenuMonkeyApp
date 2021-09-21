const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    ar: () => require("./localization/ar.json"),
    en: () => require("./localization/en.json"),
    fr: () => require("./localization/fr.json")
  };
  
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );
  
  const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };
  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };