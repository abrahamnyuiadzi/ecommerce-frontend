export default function StatCard({ title, value }: any) {
  return (
    <div style={{
      background: "white",
      padding: 20,
      borderRadius: 10,
      width: 200,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}