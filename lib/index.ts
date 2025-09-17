// Main lib exports

// Keyboard layout utilities
export {
  KEY_SIZES,
  create60PercentLayout,
  getKeyById,
  getKeysByRow,
  getLayoutDimensions,
  validateLayout,
} from './keyboard-layouts';

// Configuration management
export {
  createEmptyConfiguration,
  addLayer,
  removeLayer,
  updateKeyMapping,
  removeKeyMapping,
  getKeyMapping,
  validateConfiguration,
  cloneConfiguration,
  exportConfiguration,
} from './configuration';

// Storage utilities
export {
  saveConfiguration,
  loadConfigurations,
  loadConfiguration,
  deleteConfiguration,
  saveLayout,
  loadLayouts,
  loadLayout,
  saveSettings,
  loadSettings,
  getDefaultSettings,
  savePreferences,
  loadPreferences,
  getDefaultPreferences,
  addToRecentConfigurations,
  clearAllData,
  exportAllData,
  importAllData,
} from './storage';

// General utilities
export {
  cn,
  debounce,
  throttle,
  deepClone,
  formatFileSize,
  formatDate,
  generateRandomColor,
  isValidEmail,
  generateId,
  downloadFile,
  copyToClipboard,
  isModifierKey,
  getKeyCombo,
  hexToRgb,
  rgbToHex,
  chunk,
  unique,
  groupBy,
} from './utils';

// Keycap reference
export {
  KEYCAP_PROFILES,
  KEYCAP_SIZES,
  KEYCAP_MATERIALS,
  KEYCAP_SOURCES,
  getKeycapsByProfile,
  getKeycapDimensions,
  getCompatibleProfiles,
  calculateKeycapSetPrice,
  getKeycapRecommendations,
} from './keycap-reference';

// Switch reference
export {
  MECHANICAL_SWITCHES,
  SWITCH_SOURCES,
  getSwitchesByType,
  getSwitchesByBrand,
  getSwitchById,
  getPopularSwitches,
  getBudgetSwitches,
  getSwitchRecommendations,
  compareCharacteristics,
  calculateSwitchCost,
} from './switch-reference';

// Build difficulty
export {
  DIFFICULTY_LEVELS,
  COMMON_MISTAKES,
  assessBuildDifficulty,
  generateBuildSteps,
  calculateBuildMetrics,
  getPersonalizedDifficulty,
} from './build-difficulty';

// Community
export {
  MOCK_USERS,
  FORUM_CATEGORIES,
  MARKETPLACE_CATEGORIES,
  AVAILABLE_BADGES,
  calculateUserReputation,
  checkBadgeEligibility,
  generateBuildFeed,
  searchMarketplace,
  calculateMarketplaceScore,
  getRecommendedBuilds,
  createNotification,
  moderateContent,
  calculateShippingCost,
} from './community';