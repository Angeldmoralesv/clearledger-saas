export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="5" width="15" height="18" rx="3" fill="none" stroke="#B8ACFF" strokeWidth="2" />
      <rect x="11" y="5" width="15" height="18" rx="3" fill="#FFFFFF" fillOpacity=".14" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M14.5 14.2l2 2 4-4.4" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
