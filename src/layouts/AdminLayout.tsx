import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{
        marginLeft: 340,
        padding: 20,
        width: "100%",
        background: "#f4f4f4",
        minHeight: "100vh"
      }}>
        {children}
      </div>
    </div>
  );
}