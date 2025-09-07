// src/types.d.ts

// Radix UI modules
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
declare module "@radix-ui/react-resizable-panels" {
  export const PanelGroup: any;
  export const Panel: any;
}
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

// Other UI libraries
declare module "geist";
declare module "framer-motion";
declare module "vaul";
declare module "sonner" {
  export const Toaster: any;
  export type ToasterProps = any;
}
declare module "input-otp" {
  export const OTPInput: any;
  export const OTPInputContext: any;
}

// Carousel
declare module "embla-carousel-react" {
  export type UseEmblaCarouselType = [() => void, any];
}

// cmdk (Command Palette)
declare module "cmdk" {
  export const Command: any;
  export const CommandItem: any;
  export const CommandGroup: any;
  export const CommandInput: any;
  export const CommandList: any;
}

// react-day-picker
declare module "react-day-picker" {
  export const DayPicker: any;
  export const DayButton: any;
  export const getDefaultClassNames: any;
}