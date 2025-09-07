/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // add more env vars here if neededinterface ImportMeta {
readonly env: ImportMetaEnv;
} 
// Suppress missing type errors for packages without @types
declare module "@radix-ui/react-accordion";
declare module "@radix-ui/react-alert-dialog";
declare module "@radix-ui/react-aspect-ratio";
declare module "@radix-ui/react-avatar";
declare module "@radix-ui/react-checkbox";
declare module "@radix-ui/react-collapsible";
declare module "@radix-ui/react-context-menu";
declare module "@radix-ui/react-dialog";
declare module "@radix-ui/react-dropdown-menu";
declare module "@radix-ui/react-hover-card";
declare module "@radix-ui/react-label";
declare module "@radix-ui/react-menubar";
declare module "@radix-ui/react-navigation-menu";
declare module "@radix-ui/react-popover";
declare module "@radix-ui/react-progress";
declare module "@radix-ui/react-radio-group";
declare module "@radix-ui/react-resizable-panels";
declare module "@radix-ui/react-scroll-area";
declare module "@radix-ui/react-select";
declare module "@radix-ui/react-separator";
declare module "@radix-ui/react-slider";
declare module "@radix-ui/react-switch";
declare module "@radix-ui/react-tabs";
declare module "@radix-ui/react-toast";
declare module "@radix-ui/react-toggle";
declare module "@radix-ui/react-toggle-group";
declare module "@radix-ui/react-tooltip";
declare module "framer-motion";
declare module "geist";
declare module "vaul";
declare module "sonner";
declare module "embla-carousel-react";
declare module "input-otp";