'use client';

interface Props {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}

export function StatsToggle({ visible, onToggle }: Props) {
  const handleToggle = () => {
    onToggle(!visible);
  };

  return (
    <button
      onClick={handleToggle}
      className="stats-toggle"
      aria-label={visible ? 'Masquer les statistiques' : 'Afficher les statistiques'}
      title={visible ? 'Masquer les statistiques' : 'Afficher les statistiques'}
    >
      {visible ? '👁️' : '👁️‍🗨️'}
      <span className="stats-toggle__text">
        {visible ? 'Masquer' : 'Afficher'} les stats
      </span>
    </button>
  );
}
