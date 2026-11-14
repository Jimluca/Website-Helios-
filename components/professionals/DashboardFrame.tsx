// Hero van Voor professionals: het interactieve Helios-dashboard (public/embed/helios-dashboard.html) in een iframe,
// zodat het klikbare voorbeeld met zijn eigen stijlen en script 1 op 1 blijft. Het frame schaalt de app (978 × 735)
// zelf naar de breedte; de schaduw en de ronde hoeken komen van de website.
export default function DashboardFrame() {
  return (
    <div className="pro-frame">
      <iframe
        className="pro-frame-iframe"
        src="/embed/helios-dashboard.html"
        title="Voorbeeld van het Helios-dashboard voor professionals: klik door cliënten, tests en resultaten"
        loading="eager"
      />
    </div>
  );
}
