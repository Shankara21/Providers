import { Icon as Iconify } from "@iconify/react";

const Icon = ({ icon, className }) => {
  return (
    <Iconify icon={icon} className={className} />
  );
}

export default Icon;