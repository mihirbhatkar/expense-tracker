const modalColor = (category) => {
  let modalColor = `bg-base-200`;
  switch (category) {
    case "Transportation":
      modalColor = `bg-gradient-to-b from-[#FF9999] to-[#FF9999]/60`;
      break;
    case "Food":
      modalColor = `bg-gradient-to-b from-[#FFB366] to-[#FFB366]/60`;
      break;
    case "Entertainment":
      modalColor = `bg-gradient-to-b from-[#FFD966] to-[#FFD966]/60`;
      break;
    case "Medical":
      modalColor = `bg-gradient-to-b from-[#A3D977] to-[#A3D977]/60`;
      break;
    case "Home Maintenance":
      modalColor = `bg-gradient-to-b from-[#66CCCC] to-[#66CCCC]/60`;
      break;
    case "Vehicle Maintenance":
      modalColor = `bg-gradient-to-b from-[#6699CC] to-[#6699CC]/60`;
      break;
    case "Insurances":
      modalColor = `bg-gradient-to-b from-[#CC99CC] to-[#CC99CC]/60`;
      break;
    case "Fitness":
      modalColor = `bg-gradient-to-b from-[#FF99CC] to-[#FF99CC]/60`;
      break;
    case "Investment":
      modalColor = `bg-gradient-to-b from-[#FFCC99] to-[#FFCC99]/60`;
      break;
    default:
      modalColor = `bg-gradient-to-b bg-base-200`;
  }

  return modalColor;
};
export default modalColor;
