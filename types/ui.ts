// UI-specific types for the keyboard configurator

export interface Theme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    keyDefault: string;
    keyPressed: string;
    keySelected: string;
    keyHighlighted: string;
  };
}

export interface ViewportSettings {
  zoom: number;
  panX: number;
  panY: number;
  gridVisible: boolean;
  snapToGrid: boolean;
}

export interface KeyboardViewProps {
  layout: import('./keyboard').KeyboardLayout;
  configuration?: import('./keyboard').KeyboardConfiguration;
  selectedKeys?: string[];
  onKeySelect?: (keyId: string) => void;
  onKeyDoubleClick?: (keyId: string) => void;
  viewportSettings?: ViewportSettings;
  theme?: Theme;
  interactive?: boolean;
}

export interface KeyProps {
  definition: import('./keyboard').KeyDefinition;
  mapping?: import('./keyboard').KeyMapping;
  state: import('./keyboard').KeyState;
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ConfigurationPanelProps {
  configuration: import('./keyboard').KeyboardConfiguration;
  onConfigurationChange: (config: import('./keyboard').KeyboardConfiguration) => void;
  selectedKeyId?: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}