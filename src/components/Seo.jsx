export function Seo({ title, icon = "/images/home-favicon.png" }) {
  return (
    <>
      <title>{title}</title>
      <link rel="icon" href={icon} />
    </>
  );
}
