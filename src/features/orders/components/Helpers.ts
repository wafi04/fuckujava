export const scrollToSection = (id: string) => {
  const methodSection = document.getElementById(id);
  if (methodSection) {
    methodSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
