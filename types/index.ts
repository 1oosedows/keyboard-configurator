// Main types export file

// Keyboard-related types
export type {
  Position,
  KeySize,
  KeyDefinition,
  KeyMapping,
  KeyAction,
  KeyModifier,
  KeyboardLayout,
  KeyboardConfiguration,
  Layer,
  KeyboardCategory,
  KeyState,
} from './keyboard';

// UI-related types
export type {
  Theme,
  ViewportSettings,
  KeyboardViewProps,
  KeyProps,
  ModalProps,
  ConfigurationPanelProps,
} from './ui';

// Configuration-related types
export type {
  AppSettings,
  ExportOptions,
  ImportOptions,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ConfigurationTemplate,
  UserPreferences,
} from './config';

// Community-related types
export type {
  User,
  UserStats,
  Badge,
  CommunityBuild,
  BuildImage,
  BuildDifficulty,
  Tool,
  Skill,
  BuildGuide,
  BuildStep,
  Material,
  CommonMistake,
  Comment,
  ForumPost,
  ForumReply,
  ForumCategory,
  MarketplaceItem,
  MarketplaceCategory,
  ShippingInfo,
  MarketplaceQuestion,
  MarketplaceReview,
  BuildChallenge,
  Prize,
  ChallengeParticipant,
  NotificationType,
  Notification,
} from './community';